<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ////////////////////////////////////////
        /// Dashboard
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.dashboard.index',
            'public_group' => 'Dashboard',
            'public_name' => 'Visualizar Dashboard',
            'public_description' => 'Permite Visualizar Dashboard.'
        ];


        
        ////////////////////////////////////////
        /// Categorias
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.categories.index',
            'public_group' => 'Categorias',
            'public_name' => 'Visualizar lista de Categorias',
            'public_description' => 'Permite Visualizar lista de Categorias.'
        ];

        $permissions[] = [
            'name' => 'intranet.categories.create',
            'public_group' => 'Categorias',
            'public_name' => 'Crear Categorias',
            'public_description' => 'Permite crear nuevas Categorias.'
        ];

        $permissions[] = [
            'name' => 'intranet.categories.edit',
            'public_group' => 'Categorias',
            'public_name' => 'Editar Categorias',
            'public_description' => 'Permite ver las Categorias a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.categories.update',
            'public_group' => 'Categorias',
            'public_name' => 'Actualizar Categorias',
            'public_description' => 'Permite actualizar Categorias.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.categories.show',
        //     'public_group' => 'Categorias',
        //     'public_name' => 'Ver detalles de Categorias',
        //     'public_description' => 'Permite ver los detalles de Categorias.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.categories.destroy',
        //     'public_group' => 'Categorias',
        //     'public_name' => 'Eliminar Categorias',
        //     'public_description' => 'Permite Eliminar Categorias.'
        // ];

        $permissions[] = [
            'name' => 'intranet.categories.active',
            'public_group' => 'Categorias',
            'public_name' => 'Activar Categorias',
            'public_description' => 'Permite Activar Categorias'
        ];
        
        

        ////////////////////////////////////////
        /// Subcategorias
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.subcategories.index',
            'public_group' => 'Categorias',
            'public_name' => 'Visualizar lista de Categorias',
            'public_description' => 'Permite Visualizar lista de Categorias.'
        ];

        $permissions[] = [
            'name' => 'intranet.subcategories.create',
            'public_group' => 'Categorias',
            'public_name' => 'Crear Categorias',
            'public_description' => 'Permite crear nuevas Categorias.'
        ];

        $permissions[] = [
            'name' => 'intranet.subcategories.edit',
            'public_group' => 'Categorias',
            'public_name' => 'Editar Categorias',
            'public_description' => 'Permite ver las Categorias a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.subcategories.update',
            'public_group' => 'Categorias',
            'public_name' => 'Actualizar Categorias',
            'public_description' => 'Permite actualizar Categorias.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.subcategories.show',
        //     'public_group' => 'Categorias',
        //     'public_name' => 'Ver detalles de Categorias',
        //     'public_description' => 'Permite ver los detalles de Categorias.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.subcategories.destroy',
        //     'public_group' => 'Categorias',
        //     'public_name' => 'Eliminar Categorias',
        //     'public_description' => 'Permite Eliminar Categorias.'
        // ];

        $permissions[] = [
            'name' => 'intranet.subcategories.active',
            'public_group' => 'Categorias',
            'public_name' => 'Activar Categorias',
            'public_description' => 'Permite Activar Categorias'
        ];
         
        

        ////////////////////////////////////////
        /// Marcas
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.brands.index',
            'public_group' => 'Marcas',
            'public_name' => 'Visualizar lista de Marcas',
            'public_description' => 'Permite Visualizar lista de Marcas.'
        ];

        $permissions[] = [
            'name' => 'intranet.brands.create',
            'public_group' => 'Marcas',
            'public_name' => 'Crear Marcas',
            'public_description' => 'Permite crear nuevas Marcas.'
        ];

        $permissions[] = [
            'name' => 'intranet.brands.edit',
            'public_group' => 'Marcas',
            'public_name' => 'Editar Marcas',
            'public_description' => 'Permite ver las Marcas a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.brands.update',
            'public_group' => 'Marcas',
            'public_name' => 'Actualizar Marcas',
            'public_description' => 'Permite actualizar Marcas.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.brands.show',
        //     'public_group' => 'Marcas',
        //     'public_name' => 'Ver detalles de Marcas',
        //     'public_description' => 'Permite ver los detalles de Marcas.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.brands.destroy',
        //     'public_group' => 'Marcas',
        //     'public_name' => 'Eliminar Marcas',
        //     'public_description' => 'Permite Eliminar Marcas.'
        // ];

        $permissions[] = [
            'name' => 'intranet.brands.active',
            'public_group' => 'Marcas',
            'public_name' => 'Activar Marcas',
            'public_description' => 'Permite Activar Marcas'
        ];



        ////////////////////////////////////////
        /// Banners
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.banners.index',
            'public_group' => 'Banners',
            'public_name' => 'Visualizar lista de Banners',
            'public_description' => 'Permite Visualizar lista de Banners.'
        ];

        $permissions[] = [
            'name' => 'intranet.banners.create',
            'public_group' => 'Banners',
            'public_name' => 'Crear Banners',
            'public_description' => 'Permite crear nuevas Banners.'
        ];

        $permissions[] = [
            'name' => 'intranet.banners.edit',
            'public_group' => 'Banners',
            'public_name' => 'Editar Banners',
            'public_description' => 'Permite ver las Banners a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.banners.update',
            'public_group' => 'Banners',
            'public_name' => 'Actualizar Banners',
            'public_description' => 'Permite actualizar Banners.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.banners.show',
        //     'public_group' => 'Banners',
        //     'public_name' => 'Ver detalles de Banners',
        //     'public_description' => 'Permite ver los detalles de Banners.'
        // ];

        $permissions[] = [
            'name' => 'intranet.banners.destroy',
            'public_group' => 'Banners',
            'public_name' => 'Eliminar Banners',
            'public_description' => 'Permite Eliminar Banners.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.banners.active',
        //     'public_group' => 'Banners',
        //     'public_name' => 'Activar Banners',
        //     'public_description' => 'Permite Activar Banners'
        // ];



        ////////////////////////////////////////
        /// Tipos-post-blog      
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.post-types.index',
            'public_group' => 'Tipos de publiciones',
            'public_name' => 'Visualizar lista de Tipos de publiciones',
            'public_description' => 'Permite Visualizar lista de Tipos de publiciones.'
        ];

        $permissions[] = [
            'name' => 'intranet.post-types.create',
            'public_group' => 'Tipos de publiciones',
            'public_name' => 'Crear Tipos de publiciones',
            'public_description' => 'Permite crear nuevas Tipos de publiciones.'
        ];

        $permissions[] = [
            'name' => 'intranet.post-types.edit',
            'public_group' => 'Tipos de publiciones',
            'public_name' => 'Editar Tipos de publiciones',
            'public_description' => 'Permite ver las Tipos de publiciones a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.post-types.update',
            'public_group' => 'Tipos de publiciones',
            'public_name' => 'Actualizar Tipos de publiciones',
            'public_description' => 'Permite actualizar Tipos de publiciones.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.post-types.show',
        //     'public_group' => 'Tipos de publiciones',
        //     'public_name' => 'Ver detalles de Tipos de publiciones',
        //     'public_description' => 'Permite ver los detalles de Tipos de publiciones.'
        // ];

        $permissions[] = [
            'name' => 'intranet.post-types.destroy',
            'public_group' => 'Tipos de publiciones',
            'public_name' => 'Eliminar Tipos de publiciones',
            'public_description' => 'Permite Eliminar Tipos de publiciones.'
        ];

        $permissions[] = [
            'name' => 'intranet.post-types.active',
            'public_group' => 'Tipos de publiciones',
            'public_name' => 'Activar Tipos de publiciones',
            'public_description' => 'Permite Activar Tipos de publiciones'
        ];



        ////////////////////////////////////////
        /// Post-blog      
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.posts.index',
            'public_group' => 'Publicaciones',
            'public_name' => 'Visualizar lista de Publicaciones',
            'public_description' => 'Permite Visualizar lista de Publicaciones.'
        ];

        $permissions[] = [
            'name' => 'intranet.posts.create',
            'public_group' => 'Publicaciones',
            'public_name' => 'Crear Publicaciones',
            'public_description' => 'Permite crear nuevas Publicaciones.'
        ];

        $permissions[] = [
            'name' => 'intranet.posts.edit',
            'public_group' => 'Publicaciones',
            'public_name' => 'Editar Publicaciones',
            'public_description' => 'Permite ver las Publicaciones a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.posts.update',
            'public_group' => 'Publicaciones',
            'public_name' => 'Actualizar Publicaciones',
            'public_description' => 'Permite actualizar Publicaciones.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.posts.show',
        //     'public_group' => 'Publicaciones',
        //     'public_name' => 'Ver detalles de Publicaciones',
        //     'public_description' => 'Permite ver los detalles de Publicaciones.'
        // ];

        $permissions[] = [
            'name' => 'intranet.posts.destroy',
            'public_group' => 'Publicaciones',
            'public_name' => 'Eliminar Publicaciones',
            'public_description' => 'Permite Eliminar Publicaciones.'
        ];

        $permissions[] = [
            'name' => 'intranet.posts.active',
            'public_group' => 'Publicaciones',
            'public_name' => 'Activar Publicaciones',
            'public_description' => 'Permite Activar Publicaciones'
        ];
        


        ////////////////////////////////////////
        /// Faq      
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.faqs.index',
            'public_group' => 'Faqs',
            'public_name' => 'Visualizar lista de Faqs',
            'public_description' => 'Permite Visualizar lista de Faqs.'
        ];

        $permissions[] = [
            'name' => 'intranet.faqs.create',
            'public_group' => 'Faqs',
            'public_name' => 'Crear Faqs',
            'public_description' => 'Permite crear nuevas Faqs.'
        ];

        $permissions[] = [
            'name' => 'intranet.faqs.edit',
            'public_group' => 'Faqs',
            'public_name' => 'Editar Faqs',
            'public_description' => 'Permite ver las Faqs a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.faqs.update',
            'public_group' => 'Faqs',
            'public_name' => 'Actualizar Faqs',
            'public_description' => 'Permite actualizar Faqs.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.faqs.show',
        //     'public_group' => 'Faqs',
        //     'public_name' => 'Ver detalles de Faqs',
        //     'public_description' => 'Permite ver los detalles de Faqs.'
        // ];

        $permissions[] = [
            'name' => 'intranet.faqs.destroy',
            'public_group' => 'Faqs',
            'public_name' => 'Eliminar Faqs',
            'public_description' => 'Permite Eliminar Faqs.'
        ];

        $permissions[] = [
            'name' => 'intranet.faqs.active',
            'public_group' => 'Faqs',
            'public_name' => 'Activar Faqs',
            'public_description' => 'Permite Activar Faqs'
        ];



        ////////////////////////////////////////
        /// Categorias-faq      
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.category_faqs.index',
            'public_group' => 'Categoria de Faqs',
            'public_name' => 'Visualizar lista de Categoria de Faqs',
            'public_description' => 'Permite Visualizar lista de Categoria de Faqs.'
        ];

        $permissions[] = [
            'name' => 'intranet.category_faqs.create',
            'public_group' => 'Categoria de Faqs',
            'public_name' => 'Crear Categoria de Faqs',
            'public_description' => 'Permite crear nuevas Categoria de Faqs.'
        ];

        $permissions[] = [
            'name' => 'intranet.category_faqs.edit',
            'public_group' => 'Categoria de Faqs',
            'public_name' => 'Editar Categoria de Faqs',
            'public_description' => 'Permite ver las Categoria de Faqs a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.category_faqs.update',
            'public_group' => 'Categoria de Faqs',
            'public_name' => 'Actualizar Categoria de Faqs',
            'public_description' => 'Permite actualizar Categoria de Faqs.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.category_faqs.show',
        //     'public_group' => 'Categoria de Faqs',
        //     'public_name' => 'Ver detalles de Categoria de Faqs',
        //     'public_description' => 'Permite ver los detalles de Categoria de Faqs.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.category_faqs.destroy',
        //     'public_group' => 'Categoria de Faqs',
        //     'public_name' => 'Eliminar Categoria de Faqs',
        //     'public_description' => 'Permite Eliminar Categoria de Faqs.'
        // ];

        $permissions[] = [
            'name' => 'intranet.category_faqs.active',
            'public_group' => 'Categoria de Faqs',
            'public_name' => 'Activar Categoria de Faqs',
            'public_description' => 'Permite Activar Categoria de Faqs'
        ];


        
        ////////////////////////////////////////
        /// Consumo-responsables     
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.responsible_consumptions.index',
            'public_group' => 'Consumo responsable',
            'public_name' => 'Visualizar lista de Consumo responsable',
            'public_description' => 'Permite Visualizar lista de Consumo responsable.'
        ];

        $permissions[] = [
            'name' => 'intranet.responsible_consumptions.create',
            'public_group' => 'Consumo responsable',
            'public_name' => 'Crear Consumo responsable',
            'public_description' => 'Permite crear nuevos Consumo responsable.'
        ];

        $permissions[] = [
            'name' => 'intranet.responsible_consumptions.edit',
            'public_group' => 'Consumo responsable',
            'public_name' => 'Editar Consumo responsable',
            'public_description' => 'Permite ver los Consumo responsable a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.responsible_consumptions.update',
            'public_group' => 'Consumo responsable',
            'public_name' => 'Actualizar Consumo responsable',
            'public_description' => 'Permite actualizar Consumo responsable.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.responsible_consumptions.show',
        //     'public_group' => 'Consumo responsable',
        //     'public_name' => 'Ver detalles de Consumo responsable',
        //     'public_description' => 'Permite ver los detalles de Consumo responsable.'
        // ];

        $permissions[] = [
            'name' => 'intranet.responsible_consumptions.destroy',
            'public_group' => 'Consumo responsable',
            'public_name' => 'Eliminar Consumo responsable',
            'public_description' => 'Permite Eliminar Consumo responsable.'
        ];

        $permissions[] = [
            'name' => 'intranet.responsible_consumptions.active',
            'public_group' => 'Consumo responsable',
            'public_name' => 'Activar Consumo responsable',
            'public_description' => 'Permite Activar Consumo responsable'
        ];

        
        
        ////////////////////////////////////////
        /// Clientes     
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.customers.index',
            'public_group' => 'Clientes',
            'public_name' => 'Visualizar lista de Clientes',
            'public_description' => 'Permite Visualizar lista de Clientes.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.customers.create',
        //     'public_group' => 'Clientes',
        //     'public_name' => 'Crear Clientes',
        //     'public_description' => 'Permite crear nuevos Clientes.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.customers.edit',
        //     'public_group' => 'Clientes',
        //     'public_name' => 'Editar Clientes',
        //     'public_description' => 'Permite ver los Clientes a editar.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.customers.update',
        //     'public_group' => 'Clientes',
        //     'public_name' => 'Actualizar Clientes',
        //     'public_description' => 'Permite actualizar Clientes.'
        // ];

        $permissions[] = [
            'name' => 'intranet.customers.show',
            'public_group' => 'Clientes',
            'public_name' => 'Ver detalles de Clientes',
            'public_description' => 'Permite ver los detalles de Clientes.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.customers.destroy',
        //     'public_group' => 'Clientes',
        //     'public_name' => 'Eliminar Clientes',
        //     'public_description' => 'Permite Eliminar Clientes.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.customers.active',
        //     'public_group' => 'Clientes',
        //     'public_name' => 'Activar Clientes',
        //     'public_description' => 'Permite Activar Clientes'
        // ];


        
        ////////////////////////////////////////
        /// Dia Pago    
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.day_payment.index',
            'public_group' => 'Dia de pago',
            'public_name' => 'Visualizar lista de Dia de pago',
            'public_description' => 'Permite Visualizar lista de Dia de pago.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.day_payment.create',
        //     'public_group' => 'Dia de pago',
        //     'public_name' => 'Crear Dia de pago',
        //     'public_description' => 'Permite crear nuevos Dia de pago.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.day_payment.edit',
        //     'public_group' => 'Dia de pago',
        //     'public_name' => 'Editar Dia de pago',
        //     'public_description' => 'Permite ver los Dia de pago a editar.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.day_payment.update',
        //     'public_group' => 'Dia de pago',
        //     'public_name' => 'Actualizar Dia de pago',
        //     'public_description' => 'Permite actualizar Dia de pago.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.day_payment.show',
        //     'public_group' => 'Dia de pago',
        //     'public_name' => 'Ver detalles de Dia de pago',
        //     'public_description' => 'Permite ver los detalles de Dia de pago.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.day_payment.destroy',
        //     'public_group' => 'Dia de pago',
        //     'public_name' => 'Eliminar Dia de pago',
        //     'public_description' => 'Permite Eliminar Dia de pago.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.day_payment.active',
        //     'public_group' => 'Dia de pago',
        //     'public_name' => 'Activar Dia de pago',
        //     'public_description' => 'Permite Activar Dia de pago'
        // ];

        

















        // PARTE DE POPO

        ////////////////////////////////////////
        /// Pedidos
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.orders.index',
            'public_group' => 'Pedidos',
            'public_name' => 'Visualizar lista de Pedidos',
            'public_description' => 'Permite Visualizar lista de Pedidos.'
        ];

        $permissions[] = [
            'name' => 'intranet.orders.create',
            'public_group' => 'Pedidos',
            'public_name' => 'Crear Pedidos',
            'public_description' => 'Permite crear nuevas Pedidos.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.orders.edit',
        //     'public_group' => 'Pedidos',
        //     'public_name' => 'Editar Pedidos',
        //     'public_description' => 'Permite ver las Pedidos a editar.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.orders.update',
        //     'public_group' => 'Pedidos',
        //     'public_name' => 'Actualizar Pedidos',
        //     'public_description' => 'Permite actualizar Pedidos.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.orders.show',
        //     'public_group' => 'Pedidos',
        //     'public_name' => 'Ver detalles de Pedidos',
        //     'public_description' => 'Permite ver los detalles de Pedidos.'
        // ];

        $permissions[] = [
            'name' => 'intranet.orders.destroy',
            'public_group' => 'Pedidos',
            'public_name' => 'Eliminar Pedidos',
            'public_description' => 'Permite Eliminar Pedidos.'
        ];

        $permissions[] = [
            'name' => 'intranet.orders.search_client',
            'public_group' => 'Pedidos',
            'public_name' => 'Buscar Pedidos',
            'public_description' => 'Permite Buscar Pedidos'
        ];

        $permissions[] = [
            'name' => 'intranet.orders.detail',
            'public_group' => 'Pedidos',
            'public_name' => 'Detalles de Pedidos',
            'public_description' => 'Permite ver los Detalles de los Pedidos'
        ];

        $permissions[] = [
            'name' => 'intranet.orders.export',
            'public_group' => 'Pedidos',
            'public_name' => 'Exportar Pedidos',
            'public_description' => 'Permite Exportar los Pedidos'
        ];

        $permissions[] = [
            'name' => 'intranet.orders.changeOrderStatus',
            'public_group' => 'Pedidos',
            'public_name' => 'Cambiar Estado de Pedidos',
            'public_description' => 'Permite Cambiar estado de los Pedidos'
        ];
        

        
        ////////////////////////////////////////
        /// Quienes Somos
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.abouts.index',
            'public_group' => 'Usuarios',
            'public_name' => 'Visualizar lista de Usuarios',
            'public_description' => 'Permite Visualizar lista de Usuarios.'
        ];

        $permissions[] = [
            'name' => 'intranet.abouts.create',
            'public_group' => 'Usuarios',
            'public_name' => 'Crear Usuarios',
            'public_description' => 'Permite crear nuevas Usuarios.'
        ];

        $permissions[] = [
            'name' => 'intranet.abouts.edit',
            'public_group' => 'Usuarios',
            'public_name' => 'Editar Usuarios',
            'public_description' => 'Permite ver los Usuarios a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.abouts.update',
            'public_group' => 'Usuarios',
            'public_name' => 'Actualizar Usuarios',
            'public_description' => 'Permite actualizar Usuarios.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.abouts.show',
        //     'public_group' => 'Usuarios',
        //     'public_name' => 'Ver detalles de Usuarios',
        //     'public_description' => 'Permite ver los detalles de Usuarios.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.abouts.destroy',
        //     'public_group' => 'Usuarios',
        //     'public_name' => 'Eliminar Usuarios',
        //     'public_description' => 'Permite Eliminar Usuarios.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.abouts.active',
        //     'public_group' => 'Usuarios',
        //     'public_name' => 'Activar Usuarios',
        //     'public_description' => 'Permite Activar Usuarios'
        // ];
        


          
        ////////////////////////////////////////
        /// Aviso Legal Productos
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.legal_warnings.index',
            'public_group' => 'Avisos legales',
            'public_name' => 'Visualizar lista de Avisos legales',
            'public_description' => 'Permite Visualizar lista de Avisos legales.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.legal_warnings.create',
        //     'public_group' => 'Avisos legales',
        //     'public_name' => 'Crear Avisos legales',
        //     'public_description' => 'Permite crear nuevas Avisos legales.'
        // ];

        $permissions[] = [
            'name' => 'intranet.legal_warnings.edit',
            'public_group' => 'Avisos legales',
            'public_name' => 'Editar Avisos legales',
            'public_description' => 'Permite ver los Avisos legales a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.legal_warnings.update',
            'public_group' => 'Avisos legales',
            'public_name' => 'Actualizar Avisos legales',
            'public_description' => 'Permite actualizar Avisos legales.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.legal_warnings.show',
        //     'public_group' => 'Avisos legales',
        //     'public_name' => 'Ver detalles de Avisos legales',
        //     'public_description' => 'Permite ver los detalles de Avisos legales.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.legal_warnings.destroy',
        //     'public_group' => 'Avisos legales',
        //     'public_name' => 'Eliminar Avisos legales',
        //     'public_description' => 'Permite Eliminar Avisos legales.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.legal_warnings.active',
        //     'public_group' => 'Avisos legales',
        //     'public_name' => 'Activar Avisos legales',
        //     'public_description' => 'Permite Activar Avisos legales'
        // ];
        


          
        ////////////////////////////////////////
        /// Valores
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.values.index',
            'public_group' => 'Valores de empresa',
            'public_name' => 'Visualizar lista de Valores de empresa',
            'public_description' => 'Permite Visualizar lista de Valores de empresa.'
        ];

        $permissions[] = [
            'name' => 'intranet.values.create',
            'public_group' => 'Valores de empresa',
            'public_name' => 'Crear Valores de empresa',
            'public_description' => 'Permite crear nuevas Valores de empresa.'
        ];

        $permissions[] = [
            'name' => 'intranet.values.edit',
            'public_group' => 'Valores de empresa',
            'public_name' => 'Editar Valores de empresa',
            'public_description' => 'Permite ver los Valores de empresa a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.values.update',
            'public_group' => 'Valores de empresa',
            'public_name' => 'Actualizar Valores de empresa',
            'public_description' => 'Permite actualizar Valores de empresa.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.values.show',
        //     'public_group' => 'Valores de empresa',
        //     'public_name' => 'Ver detalles de Valores de empresa',
        //     'public_description' => 'Permite ver los detalles de Valores de empresa.'
        // ];

        $permissions[] = [
            'name' => 'intranet.values.destroy',
            'public_group' => 'Valores de empresa',
            'public_name' => 'Eliminar Valores de empresa',
            'public_description' => 'Permite Eliminar Valores de empresa.'
        ];

        $permissions[] = [
            'name' => 'intranet.values.active',
            'public_group' => 'Valores de empresa',
            'public_name' => 'Activar Valores de empresa',
            'public_description' => 'Permite Activar Valores de empresa'
        ];
        


          
        ////////////////////////////////////////
        /// Campañas
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.campaigns.index',
            'public_group' => 'Campañas',
            'public_name' => 'Visualizar lista de Campañas',
            'public_description' => 'Permite Visualizar lista de Campañas.'
        ];

        $permissions[] = [
            'name' => 'intranet.campaigns.create',
            'public_group' => 'Campañas',
            'public_name' => 'Crear Campañas',
            'public_description' => 'Permite crear nuevas Campañas.'
        ];

        $permissions[] = [
            'name' => 'intranet.campaigns.edit',
            'public_group' => 'Campañas',
            'public_name' => 'Editar Campañas',
            'public_description' => 'Permite ver los Campañas a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.campaigns.update',
            'public_group' => 'Campañas',
            'public_name' => 'Actualizar Campañas',
            'public_description' => 'Permite actualizar Campañas.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.campaigns.show',
        //     'public_group' => 'Campañas',
        //     'public_name' => 'Ver detalles de Campañas',
        //     'public_description' => 'Permite ver los detalles de Campañas.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.campaigns.destroy',
        //     'public_group' => 'Campañas',
        //     'public_name' => 'Eliminar Campañas',
        //     'public_description' => 'Permite Eliminar Campañas.'
        // ];

        $permissions[] = [
            'name' => 'intranet.campaigns.active',
            'public_group' => 'Campañas',
            'public_name' => 'Activar Campañas',
            'public_description' => 'Permite Activar Campañas'
        ];
        


          
        ////////////////////////////////////////
        /// Linea de Tiempo
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.timelines.index',
            'public_group' => 'Lineas de Tiempo',
            'public_name' => 'Visualizar lista de Lineas de Tiempo',
            'public_description' => 'Permite Visualizar lista de Lineas de Tiempo.'
        ];

        $permissions[] = [
            'name' => 'intranet.timelines.create',
            'public_group' => 'Lineas de Tiempo',
            'public_name' => 'Crear Lineas de Tiempo',
            'public_description' => 'Permite crear nuevas Lineas de Tiempo.'
        ];

        $permissions[] = [
            'name' => 'intranet.timelines.edit',
            'public_group' => 'Lineas de Tiempo',
            'public_name' => 'Editar Lineas de Tiempo',
            'public_description' => 'Permite ver los Lineas de Tiempo a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.timelines.update',
            'public_group' => 'Lineas de Tiempo',
            'public_name' => 'Actualizar Lineas de Tiempo',
            'public_description' => 'Permite actualizar Lineas de Tiempo.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.timelines.show',
        //     'public_group' => 'Lineas de Tiempo',
        //     'public_name' => 'Ver detalles de Lineas de Tiempo',
        //     'public_description' => 'Permite ver los detalles de Lineas de Tiempo.'
        // ];

        $permissions[] = [
            'name' => 'intranet.timelines.destroy',
            'public_group' => 'Lineas de Tiempo',
            'public_name' => 'Eliminar Lineas de Tiempo',
            'public_description' => 'Permite Eliminar Lineas de Tiempo.'
        ];

        $permissions[] = [
            'name' => 'intranet.timelines.active',
            'public_group' => 'Lineas de Tiempo',
            'public_name' => 'Activar Lineas de Tiempo',
            'public_description' => 'Permite Activar Lineas de Tiempo'
        ];

        $permissions[] = [
            'name' => 'intranet.timelines.position',
            'public_group' => 'Lineas de Tiempo',
            'public_name' => 'Ordenar Lineas de Tiempo',
            'public_description' => 'Permite dar orden a las Lineas de Tiempo'
        ];
        


          
        ////////////////////////////////////////
        /// Alianzas
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.alliances.index',
            'public_group' => 'Alianzas',
            'public_name' => 'Visualizar lista de Alianzas',
            'public_description' => 'Permite Visualizar lista de Alianzas.'
        ];

        $permissions[] = [
            'name' => 'intranet.alliances.create',
            'public_group' => 'Alianzas',
            'public_name' => 'Crear Alianzas',
            'public_description' => 'Permite crear nuevas Alianzas.'
        ];

        $permissions[] = [
            'name' => 'intranet.alliances.edit',
            'public_group' => 'Alianzas',
            'public_name' => 'Editar Alianzas',
            'public_description' => 'Permite ver los Alianzas a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.alliances.update',
            'public_group' => 'Alianzas',
            'public_name' => 'Actualizar Alianzas',
            'public_description' => 'Permite actualizar Alianzas.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.alliances.show',
        //     'public_group' => 'Alianzas',
        //     'public_name' => 'Ver detalles de Alianzas',
        //     'public_description' => 'Permite ver los detalles de Alianzas.'
        // ];

        $permissions[] = [
            'name' => 'intranet.alliances.destroy',
            'public_group' => 'Alianzas',
            'public_name' => 'Eliminar Alianzas',
            'public_description' => 'Permite Eliminar Alianzas.'
        ];

        $permissions[] = [
            'name' => 'intranet.alliances.active',
            'public_group' => 'Alianzas',
            'public_name' => 'Activar Alianzas',
            'public_description' => 'Permite Activar Alianzas'
        ];
        


          
        ////////////////////////////////////////
        /// Planes suscripcion producto
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.subscription_plans.index',
            'public_group' => 'Planes de Suscripcion',
            'public_name' => 'Visualizar lista de Planes de Suscripcion',
            'public_description' => 'Permite Visualizar lista de Planes de Suscripcion.'
        ];

        $permissions[] = [
            'name' => 'intranet.subscription_plans.create',
            'public_group' => 'Planes de Suscripcion',
            'public_name' => 'Crear Planes de Suscripcion',
            'public_description' => 'Permite crear nuevas Planes de Suscripcion.'
        ];

        $permissions[] = [
            'name' => 'intranet.subscription_plans.edit',
            'public_group' => 'Planes de Suscripcion',
            'public_name' => 'Editar Planes de Suscripcion',
            'public_description' => 'Permite ver los Planes de Suscripcion a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.subscription_plans.update',
            'public_group' => 'Planes de Suscripcion',
            'public_name' => 'Actualizar Planes de Suscripcion',
            'public_description' => 'Permite actualizar Planes de Suscripcion.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.subscription_plans.show',
        //     'public_group' => 'Planes de Suscripcion',
        //     'public_name' => 'Ver detalles de Planes de Suscripcion',
        //     'public_description' => 'Permite ver los detalles de Planes de Suscripcion.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.subscription_plans.destroy',
        //     'public_group' => 'Planes de Suscripcion',
        //     'public_name' => 'Eliminar Planes de Suscripcion',
        //     'public_description' => 'Permite Eliminar Planes de Suscripcion.'
        // ];

        $permissions[] = [
            'name' => 'intranet.subscription_plans.active',
            'public_group' => 'Planes de Suscripcion',
            'public_name' => 'Activar Planes de Suscripcion',
            'public_description' => 'Permite Activar Planes de Suscripcion'
        ];
        


          
        ////////////////////////////////////////
        /// Valor Suscripcion
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.subscription_values.index',
            'public_group' => 'Valores Suscripciónes',
            'public_name' => 'Visualizar lista de Valores Suscripciónes',
            'public_description' => 'Permite Visualizar lista de Valores Suscripciónes.'
        ];

        $permissions[] = [
            'name' => 'intranet.subscription_values.create',
            'public_group' => 'Valores Suscripciónes',
            'public_name' => 'Crear Valores Suscripciónes',
            'public_description' => 'Permite crear nuevas Valores Suscripciónes.'
        ];

        $permissions[] = [
            'name' => 'intranet.subscription_values.edit',
            'public_group' => 'Valores Suscripciónes',
            'public_name' => 'Editar Valores Suscripciónes',
            'public_description' => 'Permite ver los Valores Suscripciónes a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.subscription_values.update',
            'public_group' => 'Valores Suscripciónes',
            'public_name' => 'Actualizar Valores Suscripciónes',
            'public_description' => 'Permite actualizar Valores Suscripciónes.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.subscription_values.show',
        //     'public_group' => 'Valores Suscripciónes',
        //     'public_name' => 'Ver detalles de Valores Suscripciónes',
        //     'public_description' => 'Permite ver los detalles de Valores Suscripciónes.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.subscription_values.destroy',
        //     'public_group' => 'Valores Suscripciónes',
        //     'public_name' => 'Eliminar Valores Suscripciónes',
        //     'public_description' => 'Permite Eliminar Valores Suscripciónes.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.subscription_values.active',
        //     'public_group' => 'Valores Suscripciónes',
        //     'public_name' => 'Activar Valores Suscripciónes',
        //     'public_description' => 'Permite Activar Valores Suscripciónes'
        // ];
        


          
        ////////////////////////////////////////
        /// Tipos de Contactos / Reclamos
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.contact_issues.index',
            'public_group' => 'Contacto / Reclamos',
            'public_name' => 'Visualizar lista de Contacto / Reclamos',
            'public_description' => 'Permite Visualizar lista de Contacto / Reclamos.'
        ];

        $permissions[] = [
            'name' => 'intranet.contact_issues.create',
            'public_group' => 'Contacto / Reclamos',
            'public_name' => 'Crear Contacto / Reclamos',
            'public_description' => 'Permite crear nuevas Contacto / Reclamos.'
        ];

        $permissions[] = [
            'name' => 'intranet.contact_issues.edit',
            'public_group' => 'Contacto / Reclamos',
            'public_name' => 'Editar Contacto / Reclamos',
            'public_description' => 'Permite ver los Contacto / Reclamos a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.contact_issues.update',
            'public_group' => 'Contacto / Reclamos',
            'public_name' => 'Actualizar Contacto / Reclamos',
            'public_description' => 'Permite actualizar Contacto / Reclamos.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.contact_issues.show',
        //     'public_group' => 'Contacto / Reclamos',
        //     'public_name' => 'Ver detalles de Contacto / Reclamos',
        //     'public_description' => 'Permite ver los detalles de Contacto / Reclamos.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.contact_issues.destroy',
        //     'public_group' => 'Contacto / Reclamos',
        //     'public_name' => 'Eliminar Contacto / Reclamos',
        //     'public_description' => 'Permite Eliminar Contacto / Reclamos.'
        // ];

        $permissions[] = [
            'name' => 'intranet.contact_issues.active',
            'public_group' => 'Contacto / Reclamos',
            'public_name' => 'Activar Contacto / Reclamos',
            'public_description' => 'Permite Activar Contacto / Reclamos'
        ];
        
        


          
        ////////////////////////////////////////
        /// Contactos
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.contacts.index',
            'public_group' => 'Registro de Contacto',
            'public_name' => 'Visualizar lista de Registro de Contacto',
            'public_description' => 'Permite Visualizar lista de Registro de Contacto.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.contacts.create',
        //     'public_group' => 'Registro de Contacto',
        //     'public_name' => 'Crear Registro de Contacto',
        //     'public_description' => 'Permite crear nuevas Registro de Contacto.'
        // ];

        $permissions[] = [
            'name' => 'intranet.contacts.edit',
            'public_group' => 'Registro de Contacto',
            'public_name' => 'Editar Registro de Contacto',
            'public_description' => 'Permite ver los Registro de Contacto a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.contacts.update',
            'public_group' => 'Registro de Contacto',
            'public_name' => 'Actualizar Registro de Contacto',
            'public_description' => 'Permite actualizar Registro de Contacto.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.contacts.show',
        //     'public_group' => 'Registro de Contacto',
        //     'public_name' => 'Ver detalles de Registro de Contacto',
        //     'public_description' => 'Permite ver los detalles de Registro de Contacto.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.contacts.destroy',
        //     'public_group' => 'Registro de Contacto',
        //     'public_name' => 'Eliminar Registro de Contacto',
        //     'public_description' => 'Permite Eliminar Registro de Contacto.'
        // ];

        $permissions[] = [
            'name' => 'intranet.contacts.active',
            'public_group' => 'Registro de Contacto',
            'public_name' => 'Activar Registro de Contacto',
            'public_description' => 'Permite Activar Registro de Contacto'
        ];
        

        $permissions[] = [
            'name' => 'intranet.contacts.export',
            'public_group' => 'Registro de Contacto',
            'public_name' => 'Exportar Registro de Contacto',
            'public_description' => 'Permite Exportar Registro de Contacto'
        ];
        
        $permissions[] = [
            'name' => 'intranet.contacts.reply',
            'public_group' => 'Registro de Contacto',
            'public_name' => 'Responder un Registro de Contacto',
            'public_description' => 'Permite Responder un Registro de Contacto'
        ];
        
        


          
        ////////////////////////////////////////
        /// Reclamos
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.claims.index',
            'public_group' => 'Reclamos',
            'public_name' => 'Visualizar lista de Reclamos',
            'public_description' => 'Permite Visualizar lista de Reclamos.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.claims.create',
        //     'public_group' => 'Reclamos',
        //     'public_name' => 'Crear Reclamos',
        //     'public_description' => 'Permite crear nuevas Reclamos.'
        // ];

        $permissions[] = [
            'name' => 'intranet.claims.edit',
            'public_group' => 'Reclamos',
            'public_name' => 'Editar Reclamos',
            'public_description' => 'Permite ver los Reclamos a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.claims.update',
            'public_group' => 'Reclamos',
            'public_name' => 'Actualizar Reclamos',
            'public_description' => 'Permite actualizar Reclamos.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.claims.show',
        //     'public_group' => 'Reclamos',
        //     'public_name' => 'Ver detalles de Reclamos',
        //     'public_description' => 'Permite ver los detalles de Reclamos.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.claims.destroy',
        //     'public_group' => 'Reclamos',
        //     'public_name' => 'Eliminar Reclamos',
        //     'public_description' => 'Permite Eliminar Reclamos.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.claims.active',
        //     'public_group' => 'Reclamos',
        //     'public_name' => 'Activar Reclamos',
        //     'public_description' => 'Permite Activar Reclamos'
        // ];
        

        $permissions[] = [
            'name' => 'intranet.claims.export',
            'public_group' => 'Reclamos',
            'public_name' => 'Exportar Reclamos',
            'public_description' => 'Permite Exportar Reclamos'
        ];
        
        $permissions[] = [
            'name' => 'intranet.claims.reply',
            'public_group' => 'Reclamos',
            'public_name' => 'Responder un Reclamos',
            'public_description' => 'Permite Responder un Reclamos'
        ];
        
        
        


          
        ////////////////////////////////////////
        /// Precios Productos
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.prices.index',
            'public_group' => 'Precios de Productos',
            'public_name' => 'Visualizar lista de Precios de Productos',
            'public_description' => 'Permite Visualizar lista de Precios de Productos.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.prices.create',
        //     'public_group' => 'Precios de Productos',
        //     'public_name' => 'Crear Precios de Productos',
        //     'public_description' => 'Permite crear nuevas Precios de Productos.'
        // ];

        $permissions[] = [
            'name' => 'intranet.prices.edit',
            'public_group' => 'Precios de Productos',
            'public_name' => 'Editar Precios de Productos',
            'public_description' => 'Permite ver los Precios de Productos a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.prices.update',
            'public_group' => 'Precios de Productos',
            'public_name' => 'Actualizar Precios de Productos',
            'public_description' => 'Permite actualizar Precios de Productos.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.prices.show',
        //     'public_group' => 'Precios de Productos',
        //     'public_name' => 'Ver detalles de Precios de Productos',
        //     'public_description' => 'Permite ver los detalles de Precios de Productos.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.prices.destroy',
        //     'public_group' => 'Precios de Productos',
        //     'public_name' => 'Eliminar Precios de Productos',
        //     'public_description' => 'Permite Eliminar Precios de Productos.'
        // ];

        $permissions[] = [
            'name' => 'intranet.prices.active',
            'public_group' => 'Precios de Productos',
            'public_name' => 'Activar Precios de Productos',
            'public_description' => 'Permite Activar Precios de Productos'
        ];
        

        $permissions[] = [
            'name' => 'intranet.prices.export',
            'public_group' => 'Precios de Productos',
            'public_name' => 'Exportar Precios de Productos',
            'public_description' => 'Permite Exportar Precios de Productos'
        ];
        
        
        
        


          
        ////////////////////////////////////////
        /// Precios Productos
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.prices.index',
            'public_group' => 'Precios de Productos',
            'public_name' => 'Visualizar lista de Precios de Productos',
            'public_description' => 'Permite Visualizar lista de Precios de Productos.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.prices.create',
        //     'public_group' => 'Precios de Productos',
        //     'public_name' => 'Crear Precios de Productos',
        //     'public_description' => 'Permite crear nuevas Precios de Productos.'
        // ];

        $permissions[] = [
            'name' => 'intranet.prices.edit',
            'public_group' => 'Precios de Productos',
            'public_name' => 'Editar Precios de Productos',
            'public_description' => 'Permite ver los Precios de Productos a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.prices.update',
            'public_group' => 'Precios de Productos',
            'public_name' => 'Actualizar Precios de Productos',
            'public_description' => 'Permite actualizar Precios de Productos.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.prices.show',
        //     'public_group' => 'Precios de Productos',
        //     'public_name' => 'Ver detalles de Precios de Productos',
        //     'public_description' => 'Permite ver los detalles de Precios de Productos.'
        // ];

        // $permissions[] = [
        //     'name' => 'intranet.prices.destroy',
        //     'public_group' => 'Precios de Productos',
        //     'public_name' => 'Eliminar Precios de Productos',
        //     'public_description' => 'Permite Eliminar Precios de Productos.'
        // ];

        $permissions[] = [
            'name' => 'intranet.prices.active',
            'public_group' => 'Precios de Productos',
            'public_name' => 'Activar Precios de Productos',
            'public_description' => 'Permite Activar Precios de Productos'
        ];
        

        $permissions[] = [
            'name' => 'intranet.prices.export',
            'public_group' => 'Precios de Productos',
            'public_name' => 'Exportar Precios de Productos',
            'public_description' => 'Permite Exportar Precios de Productos'
        ];
        
        
        
        
        


          
        ////////////////////////////////////////
        /// Productos
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.products.index',
            'public_group' => 'Productos',
            'public_name' => 'Visualizar lista de Productos',
            'public_description' => 'Permite Visualizar lista de Productos.'
        ];

        $permissions[] = [
            'name' => 'intranet.products.create',
            'public_group' => 'Productos',
            'public_name' => 'Crear Productos',
            'public_description' => 'Permite crear nuevas Productos.'
        ];

        $permissions[] = [
            'name' => 'intranet.products.edit',
            'public_group' => 'Productos',
            'public_name' => 'Editar Productos',
            'public_description' => 'Permite ver los Productos a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.products.update',
            'public_group' => 'Productos',
            'public_name' => 'Actualizar Productos',
            'public_description' => 'Permite actualizar Productos.'
        ];

        $permissions[] = [
            'name' => 'intranet.products.show',
            'public_group' => 'Productos',
            'public_name' => 'Ver detalles de Productos',
            'public_description' => 'Permite ver los detalles de Productos.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.products.destroy',
        //     'public_group' => 'Productos',
        //     'public_name' => 'Eliminar Productos',
        //     'public_description' => 'Permite Eliminar Productos.'
        // ];

        $permissions[] = [
            'name' => 'intranet.products.active',
            'public_group' => 'Productos',
            'public_name' => 'Activar Productos',
            'public_description' => 'Permite Activar Productos'
        ];
        

        $permissions[] = [
            'name' => 'intranet.products.export',
            'public_group' => 'Productos',
            'public_name' => 'Exportar Productos',
            'public_description' => 'Permite Exportar Productos'
        ];
        

        $permissions[] = [
            'name' => 'intranet.products.import',
            'public_group' => 'Productos',
            'public_name' => 'Importar Productos',
            'public_description' => 'Permite Importar Productos'
        ];

        $permissions[] = [
            'name' => 'intranet.products.position',
            'public_group' => 'Productos',
            'public_name' => 'Cambiar Posicion Productos',
            'public_description' => 'Permite Cambiar Posicion del orden de los Productos'
        ];

        $permissions[] = [
            'name' => 'intranet.products.show_images',
            'public_group' => 'Productos',
            'public_name' => 'Ver imagenes de Productos',
            'public_description' => 'Permite Ver imagenes de del orden de los Productos'
        ];
        


        
          
        ////////////////////////////////////////
        /// Paginas
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.pages.index',
            'public_group' => 'Paginas',
            'public_name' => 'Visualizar lista de Paginas',
            'public_description' => 'Permite Visualizar lista de Paginas.'
        ];

        $permissions[] = [
            'name' => 'intranet.pages.create',
            'public_group' => 'Paginas',
            'public_name' => 'Crear Paginas',
            'public_description' => 'Permite crear nuevas Paginas.'
        ];

        $permissions[] = [
            'name' => 'intranet.pages.edit',
            'public_group' => 'Paginas',
            'public_name' => 'Editar Paginas',
            'public_description' => 'Permite ver los Paginas a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.pages.update',
            'public_group' => 'Paginas',
            'public_name' => 'Actualizar Paginas',
            'public_description' => 'Permite actualizar Paginas.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.pages.show',
        //     'public_group' => 'Paginas',
        //     'public_name' => 'Ver detalles de Paginas',
        //     'public_description' => 'Permite ver los detalles de Paginas.'
        // ];

        $permissions[] = [
            'name' => 'intranet.pages.destroy',
            'public_group' => 'Paginas',
            'public_name' => 'Eliminar Paginas',
            'public_description' => 'Permite Eliminar Paginas.'
        ];

        $permissions[] = [
            'name' => 'intranet.pages.active',
            'public_group' => 'Paginas',
            'public_name' => 'Activar Paginas',
            'public_description' => 'Permite Activar Paginas'
        ];
        

        // $permissions[] = [
        //     'name' => 'intranet.pages.export',
        //     'public_group' => 'Paginas',
        //     'public_name' => 'Exportar Paginas',
        //     'public_description' => 'Permite Exportar Paginas'
        // ];
        

        $permissions[] = [
            'name' => 'intranet.pages.position',
            'public_group' => 'Paginas',
            'public_name' => 'Cambiar Posicion Paginas',
            'public_description' => 'Permite Cambiar Posicion del orden de las Paginas'
        ];
        


        
          
        ////////////////////////////////////////
        /// Laboratorios
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.laboratories.index',
            'public_group' => 'Laboratorios',
            'public_name' => 'Visualizar lista de Laboratorios',
            'public_description' => 'Permite Visualizar lista de Laboratorios.'
        ];

        $permissions[] = [
            'name' => 'intranet.laboratories.create',
            'public_group' => 'Laboratorios',
            'public_name' => 'Crear Laboratorios',
            'public_description' => 'Permite crear nuevas Laboratorios.'
        ];

        $permissions[] = [
            'name' => 'intranet.laboratories.edit',
            'public_group' => 'Laboratorios',
            'public_name' => 'Editar Laboratorios',
            'public_description' => 'Permite ver los Laboratorios a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.laboratories.update',
            'public_group' => 'Laboratorios',
            'public_name' => 'Actualizar Laboratorios',
            'public_description' => 'Permite actualizar Laboratorios.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.laboratories.show',
        //     'public_group' => 'Laboratorios',
        //     'public_name' => 'Ver detalles de Laboratorios',
        //     'public_description' => 'Permite ver los detalles de Laboratorios.'
        // ];

        $permissions[] = [
            'name' => 'intranet.laboratories.destroy',
            'public_group' => 'Laboratorios',
            'public_name' => 'Eliminar Laboratorios',
            'public_description' => 'Permite Eliminar Laboratorios.'
        ];

        $permissions[] = [
            'name' => 'intranet.laboratories.active',
            'public_group' => 'Laboratorios',
            'public_name' => 'Activar Laboratorios',
            'public_description' => 'Permite Activar Laboratorios'
        ];
        

        // $permissions[] = [
        //     'name' => 'intranet.laboratories.export',
        //     'public_group' => 'Laboratorios',
        //     'public_name' => 'Exportar Laboratorios',
        //     'public_description' => 'Permite Exportar Laboratorios'
        // ];
        

        // $permissions[] = [
        //     'name' => 'intranet.laboratories.position',
        //     'public_group' => 'Laboratorios',
        //     'public_name' => 'Cambiar Posicion Laboratorios',
        //     'public_description' => 'Permite Cambiar Posicion del orden de las Laboratorios'
        // ];
        
        


        
          
        ////////////////////////////////////////
        /// Bases Legales
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.legal_bases.index',
            'public_group' => 'Bases Legales',
            'public_name' => 'Visualizar lista de Bases Legales',
            'public_description' => 'Permite Visualizar lista de Bases Legales.'
        ];

        $permissions[] = [
            'name' => 'intranet.legal_bases.create',
            'public_group' => 'Bases Legales',
            'public_name' => 'Crear Bases Legales',
            'public_description' => 'Permite crear nuevas Bases Legales.'
        ];

        $permissions[] = [
            'name' => 'intranet.legal_bases.edit',
            'public_group' => 'Bases Legales',
            'public_name' => 'Editar Bases Legales',
            'public_description' => 'Permite ver los Bases Legales a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.legal_bases.update',
            'public_group' => 'Bases Legales',
            'public_name' => 'Actualizar Bases Legales',
            'public_description' => 'Permite actualizar Bases Legales.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.legal_bases.show',
        //     'public_group' => 'Bases Legales',
        //     'public_name' => 'Ver detalles de Bases Legales',
        //     'public_description' => 'Permite ver los detalles de Bases Legales.'
        // ];

        $permissions[] = [
            'name' => 'intranet.legal_bases.destroy',
            'public_group' => 'Bases Legales',
            'public_name' => 'Eliminar Bases Legales',
            'public_description' => 'Permite Eliminar Bases Legales.'
        ];

        $permissions[] = [
            'name' => 'intranet.legal_bases.active',
            'public_group' => 'Bases Legales',
            'public_name' => 'Activar Bases Legales',
            'public_description' => 'Permite Activar Bases Legales'
        ];
        

        // $permissions[] = [
        //     'name' => 'intranet.legal_bases.export',
        //     'public_group' => 'Bases Legales',
        //     'public_name' => 'Exportar Bases Legales',
        //     'public_description' => 'Permite Exportar Bases Legales'
        // ];
        

        // $permissions[] = [
        //     'name' => 'intranet.legal_bases.position',
        //     'public_group' => 'Bases Legales',
        //     'public_name' => 'Cambiar Posicion Bases Legales',
        //     'public_description' => 'Permite Cambiar Posicion del orden de las Bases Legales'
        // ];
        
        


        
          
        ////////////////////////////////////////
        /// Costos Despachos
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.delivery_costs.index',
            'public_group' => 'Costos de Delivery',
            'public_name' => 'Visualizar lista de Costos de Delivery',
            'public_description' => 'Permite Visualizar lista de Costos de Delivery.'
        ];

        $permissions[] = [
            'name' => 'intranet.delivery_costs.create',
            'public_group' => 'Costos de Delivery',
            'public_name' => 'Crear Costos de Delivery',
            'public_description' => 'Permite crear nuevas Costos de Delivery.'
        ];

        $permissions[] = [
            'name' => 'intranet.delivery_costs.edit',
            'public_group' => 'Costos de Delivery',
            'public_name' => 'Editar Costos de Delivery',
            'public_description' => 'Permite ver los Costos de Delivery a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.delivery_costs.update',
            'public_group' => 'Costos de Delivery',
            'public_name' => 'Actualizar Costos de Delivery',
            'public_description' => 'Permite actualizar Costos de Delivery.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.delivery_costs.show',
        //     'public_group' => 'Costos de Delivery',
        //     'public_name' => 'Ver detalles de Costos de Delivery',
        //     'public_description' => 'Permite ver los detalles de Costos de Delivery.'
        // ];

        $permissions[] = [
            'name' => 'intranet.delivery_costs.destroy',
            'public_group' => 'Costos de Delivery',
            'public_name' => 'Eliminar Costos de Delivery',
            'public_description' => 'Permite Eliminar Costos de Delivery.'
        ];

        $permissions[] = [
            'name' => 'intranet.delivery_costs.active',
            'public_group' => 'Costos de Delivery',
            'public_name' => 'Activar Costos de Delivery',
            'public_description' => 'Permite Activar Costos de Delivery'
        ];
        

        // $permissions[] = [
        //     'name' => 'intranet.delivery_costs.export',
        //     'public_group' => 'Costos de Delivery',
        //     'public_name' => 'Exportar Costos de Delivery',
        //     'public_description' => 'Permite Exportar Costos de Delivery'
        // ];
        

        // $permissions[] = [
        //     'name' => 'intranet.delivery_costs.position',
        //     'public_group' => 'Costos de Delivery',
        //     'public_name' => 'Cambiar Posicion Costos de Delivery',
        //     'public_description' => 'Permite Cambiar Posicion del orden de las Costos de Delivery'
        // ];



        ////////////////////////////////////////
        /// Codigo de Descuentos
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.discount_code.index',
            'public_group' => 'Codigo de Descuento',
            'public_name' => 'Visualizar lista de Codigo de Descuento',
            'public_description' => 'Permite Visualizar lista de Codigo de Descuento.'
        ];

        $permissions[] = [
            'name' => 'intranet.discount_code.create',
            'public_group' => 'Codigo de Descuento',
            'public_name' => 'Crear Codigo de Descuento',
            'public_description' => 'Permite crear nuevas Codigo de Descuento.'
        ];

        $permissions[] = [
            'name' => 'intranet.discount_code.edit',
            'public_group' => 'Codigo de Descuento',
            'public_name' => 'Editar Codigo de Descuento',
            'public_description' => 'Permite ver los Codigo de Descuento a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.discount_code.update',
            'public_group' => 'Codigo de Descuento',
            'public_name' => 'Actualizar Codigo de Descuento',
            'public_description' => 'Permite actualizar Codigo de Descuento.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.discount_code.show',
        //     'public_group' => 'Codigo de Descuento',
        //     'public_name' => 'Ver detalles de Codigo de Descuento',
        //     'public_description' => 'Permite ver los detalles de Codigo de Descuento.'
        // ];

        $permissions[] = [
            'name' => 'intranet.discount_code.destroy',
            'public_group' => 'Codigo de Descuento',
            'public_name' => 'Eliminar Codigo de Descuento',
            'public_description' => 'Permite Eliminar Codigo de Descuento.'
        ];

        $permissions[] = [
            'name' => 'intranet.discount_code.active',
            'public_group' => 'Codigo de Descuento',
            'public_name' => 'Activar Codigo de Descuento',
            'public_description' => 'Permite Activar Codigo de Descuento'
        ];
        

        $permissions[] = [
            'name' => 'intranet.discount_code.search_customer',
            'public_group' => 'Codigo de Descuento',
            'public_name' => 'Buscar Cliente segun Codigo de Descuento',
            'public_description' => 'Permite Buscar Cliente segun Codigo de Descuento'
        ];
        

        // $permissions[] = [
        //     'name' => 'intranet.discount_code.export',
        //     'public_group' => 'Codigo de Descuento',
        //     'public_name' => 'Exportar Codigo de Descuento',
        //     'public_description' => 'Permite Exportar Codigo de Descuento'
        // ];
        

        // $permissions[] = [
        //     'name' => 'intranet.discount_code.position',
        //     'public_group' => 'Codigo de Descuento',
        //     'public_name' => 'Cambiar Posicion Codigo de Descuento',
        //     'public_description' => 'Permite Cambiar Posicion del orden de las Codigo de Descuento'
        // ];
        



        ////////////////////////////////////////
        /// Comision de Pagos
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.payment_commissions.index',
            'public_group' => 'Comision Pagos',
            'public_name' => 'Visualizar lista de Comision Pagos',
            'public_description' => 'Permite Visualizar lista de Comision Pagos.'
        ];

        $permissions[] = [
            'name' => 'intranet.payment_commissions.create',
            'public_group' => 'Comision Pagos',
            'public_name' => 'Crear Comision Pagos',
            'public_description' => 'Permite crear nuevas Comision Pagos.'
        ];

        $permissions[] = [
            'name' => 'intranet.payment_commissions.edit',
            'public_group' => 'Comision Pagos',
            'public_name' => 'Editar Comision Pagos',
            'public_description' => 'Permite ver los Comision Pagos a editar.'
        ];

        $permissions[] = [
            'name' => 'intranet.payment_commissions.update',
            'public_group' => 'Comision Pagos',
            'public_name' => 'Actualizar Comision Pagos',
            'public_description' => 'Permite actualizar Comision Pagos.'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.payment_commissions.show',
        //     'public_group' => 'Comision Pagos',
        //     'public_name' => 'Ver detalles de Comision Pagos',
        //     'public_description' => 'Permite ver los detalles de Comision Pagos.'
        // ];

        $permissions[] = [
            'name' => 'intranet.payment_commissions.destroy',
            'public_group' => 'Comision Pagos',
            'public_name' => 'Eliminar Comision Pagos',
            'public_description' => 'Permite Eliminar Comision Pagos.'
        ];

        $permissions[] = [
            'name' => 'intranet.payment_commissions.active',
            'public_group' => 'Comision Pagos',
            'public_name' => 'Activar Comision Pagos',
            'public_description' => 'Permite Activar Comision Pagos'
        ];

        // $permissions[] = [
        //     'name' => 'intranet.payment_commissions.export',
        //     'public_group' => 'Codigo de Descuento',
        //     'public_name' => 'Exportar Codigo de Descuento',
        //     'public_description' => 'Permite Exportar Codigo de Descuento'
        // ];
        

        // $permissions[] = [
        //     'name' => 'intranet.payment_commissions.position',
        //     'public_group' => 'Codigo de Descuento',
        //     'public_name' => 'Cambiar Posicion Codigo de Descuento',
        //     'public_description' => 'Permite Cambiar Posicion del orden de las Codigo de Descuento'
        // ];
        
        









        


        foreach ($permissions as $p) {
            try {
                \Spatie\Permission\Models\Permission::create($p);
            } catch (\Exception $e) {

            }
        }

        $role = \Spatie\Permission\Models\Role::where('name', 'God Admin')->first();
        $role->syncPermissions(\Spatie\Permission\Models\Permission::all());

    }
}
