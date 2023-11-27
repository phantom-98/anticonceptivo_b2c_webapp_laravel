<?php


namespace App\Http\Controllers\Intranet;


use App\Http\Controllers\Controller;

class GlobalController extends Controller
{

    private $controller;
    protected $route;
    protected $folder;
    protected $permissions_base;
    protected $guard;

    protected $singularName;
    protected $pluralName;
    protected $tableCookie;
    protected $breadcrumb;

    protected $actions = [];
    protected $blade = [];

    private $permissions = [];
    private $methods = [];
    private $allows = [];
    private $user;
    private $showAction;
    private $showBreadcrumb;
    public $config = [];


    public function __construct($options)
    {
        $this->controller = get_class($this);

        $this->route = $options['route'] ?? $options['route'];
        $this->folder = $options['folder'] ?? $options['folder'];
        $this->permissions_base = $options['permissions_base'] ?? $options['route'];
        $this->singularName = $options['singularName'] ?? 'Singular Name';
        $this->pluralName = $options['pluralName'] ?? 'Plural Name';
        $this->guard = $options['guard'] ?? 'intranet';
        $this->showAction = $options['showAction'] ?? true;
        $this->showBreadcrumb = $options['showBreadcrumb'] ?? true;

        $this->middleware(function ($request, $next) use ($options) {

            $this->user = auth($this->guard)->user();
            $this->permissions = $this->user->getAllPermissions();
            $this->generateBaseConfig();
            // this override global config

            if (isset($options['disableActions'])) {
                $this->disableActions($options['disableActions']);
            }
            if (isset($options['enableActions'])) {
                $this->enableActions($options['enableActions']);
            }
            if (isset($options['addToBlade'])) {
                $this->addToBlade($options['addToBlade']);
            }
            if (isset($options['removeToBlade'])) {
                $this->removeToBlade($options['removeToBlade']);
            }
            if (isset($options['forgetSession'])) {
                $this->forgetSession($options['forgetSession']);
            }

            $this->loadConfig();

            // dd($this->config);

            if (!in_array($request->route()->getAction()['as'], $this->allows)) {
                //Illuminate\Support\Facades\Route::currentRouteName()
                return redirect()->route('intranet.dashboard');
            }

            //dd($request->route()->parameters());
            view()->share('config', $this->config);
            return $next($request);
        });

    }

    private function disableActions($actions): void
    {
        foreach ($actions as $action) {
            $this->actions[$action] = false;
            $this->removePermission($action);
        }
    }

    private function enableActions($actions): void
    {
        foreach ($actions as $action) {
            $this->actions[$action] = true;
            $this->injectPermission($action);
        }
    }

    private function addToBlade($blades): void
    {
        foreach ($blades as $key => $value) {
            $this->blade[$key] = $value;
        }
    }

    private function removeToBlade($blades): void
    {
        foreach ($blades as $key => $value) {
            unset($this->allows[$key]);
        }
    }


    private function forgetSession($fortgets): void
    {
        foreach ($fortgets as $value) {
            session()->forget($value);
        }
    }

    private function generateBaseConfig()
    {

        $this->tableCookie = 'table' . str_replace('.', '', str_replace(' ', '', trim($this->route, ' ')));

        $this->blade = [
            'btnBack' => 'Atrás',
            'btnNew' => 'Nuevo ' . $this->singularName,
            'btnEdit' => 'Editar ' . $this->singularName,
            'btnShow' => 'Ver detalle ' . $this->singularName,
            'btnDestroy' => 'Eliminar ' . $this->singularName,
            'btnSave' => 'Guardar',
            'btnUpdate' => 'Actualizar',
            'viewTitle' => 'Gestión de ' . $this->pluralName,
            'viewIndex' => $this->pluralName,
            'viewCreate' => 'Nuevo ' . $this->singularName,
            'viewEdit' => 'Modificar ' . $this->singularName,
            'viewShow' => 'Detalle de ' . $this->singularName,
            'showActions' => $this->showAction,
            'showBreadcrumb' => $this->showBreadcrumb,
        ];

        $this->actions = [
            'index' => false,
            'create' => false,
            'store' => false,
            'edit' => false,
            'update' => false,
            'show' => false,
            'destroy' => false,
            'active' => false,
            'banned' => false,
            'changeStatus' => false,
        ];

        $this->breadcrumb = [
            [
                'link' => $this->route ? route($this->route . 'index') : $this->route,
                'name' => $this->pluralName
            ],
        ];

        $this->processMethods($this->controller);
        $this->processPermissions();

    }

    private function processMethods($controller)
    {
        $methods = array_diff(get_class_methods($controller), get_class_methods(get_parent_class($controller)));
        $index = array_search('__construct', $methods);
        if ($index !== false) {
            unset($methods[$index]);
        }
        $this->methods = array_values($methods);
    }

    private function processPermissions()
    {
        $base = $this->permissions_base;

        foreach ($this->methods as $method) {

            if ($this->user->hasRole(1)) {
                $this->actions[$method] = true;
                $this->injectPermission($method);
            } else {
                if (count($this->permissions->where('name', $base . $method))) {
                    $this->actions[$method] = true;
                    $this->injectPermission($method, true);
                } else {
                    $this->actions[$method] = false;
                    $this->removePermission($method);
                }
            }

        }

        // para permitir actualizar y editar en post
        $this->actions['store'] = $this->actions['create'] ?? false;
        $this->actions['update'] = $this->actions['edit'] ?? false;

        if($this->actions['create'] == true){
            $this->injectPermission('store', true);
        }

        if($this->actions['edit'] == true){
            $this->injectPermission('update', true);
        }

    }

    public function injectPermission($name, $with_base = true)
    {
        $base = '';
        if ($with_base) {
            $base = $this->permissions_base;
        }
        array_push($this->allows, $base . $name);
    }

    public function removePermission($name, $with_base = true)
    {
        $base = '';
        if ($with_base) {
            $base = $this->permissions_base;
        }
        $index = array_search($base . $name, $this->allows);
        if ($index !== FALSE) {
            unset($this->allows[$index]);
            $this->allows = array_values($this->allows);
        }
    }

    private function loadConfig()
    {
        $any_action = false;
        foreach ($this->actions as $key => $action) {
            if ($key !== 'index' and $key !== 'create' and $key !== 'stande' and $key !== 'active' and $key !== 'banned' and $key !== 'changeStatus') {
                if ($action == true) {
                    $any_action = true;
                }
            }
        }

        $this->config = [

            'controller' => $this->controller,
            'route' => $this->route,
            'permissions_base' => $this->permissions_base,
            'folder' => $this->folder,
            'guard' => $this->guard,
//            'user' => $this->user,
//            'permissions' => $this->permissions,
            'breadcrumb' => $this->breadcrumb,
            'tableCookie' => $this->tableCookie,
            'singularName' => $this->singularName,
            'pluralName' => $this->pluralName,
            'methods' => $this->methods,
            'allow' => $this->allows,
            'action' => $this->actions,
            'blade' => $this->blade,
            'any_action' => $any_action,
//            'routeParams' => $this->routeParams,

        ];

    }

    /**
     * @return string
     */
    public function getController(): string
    {
        return $this->controller;
    }

    /**
     * @param string $controller
     */
    public function setController(string $controller): void
    {
        $this->controller = $controller;
    }


    /**
     * @return mixed
     */
    public function getRoute()
    {
        return $this->route;
    }

    /**
     * @param mixed $route
     */
    public function setRoute($route): void
    {
        $this->route = $route;
    }

    /**
     * @return mixed
     */
    public function getFolder()
    {
        return $this->folder;
    }

    /**
     * @param mixed $folder
     */
    public function setFolder($folder): void
    {
        $this->folder = $folder;
    }

    /**
     * @return mixed
     */
    public function getGuard()
    {
        return $this->guard;
    }

    /**
     * @param mixed $guard
     */
    public function setGuard($guard): void
    {
        $this->guard = $guard;
    }

    /**
     * @return mixed
     */
    public function getBlade()
    {
        return $this->blade;
    }

    /**
     * @param mixed $blade
     */
    public function setBlade($blades): void
    {
        foreach ($blades as $key => $blade) {
            $this->blade[$key] = $blade;
        }
        //return $this->blade;
    }

    /**
     * @return mixed
     */
    public function getSingularName()
    {
        return $this->singularName;
    }

    /**
     * @param mixed $singularName
     */
    public function setSingularName($singularName): void
    {
        $this->singularName = $singularName;
    }

    /**
     * @return mixed
     */
    public function getPluralName()
    {
        return $this->pluralName;
    }

    /**
     * @param mixed $pluralName
     */
    public function setPluralName($pluralName): void
    {
        $this->pluralName = $pluralName;
    }

    /**
     * @return array
     */
    public function getConfig(): array
    {
        return $this->config;
    }


}
