<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //LARAVEL PERMISIONES

        Gate::before(function ($user, $ability) {
            return $user->hasRole('God Admin') ? true : null;
        });

        Gate::after(function ($user, $ability) {
            return $user->hasRole('God Admin'); // note this returns boolean
        });

        //END LARAVEL PERMISIONES

        //LARAVEL PASSPORT

        Passport::routes();
        Passport::tokensCan([
            'intranet' => 'Access Intranet Backend',
            'doctor' => 'Access Doctor App',
            'patient' => 'Access Patient App',
        ]);
//
//        Passport::setDefaultScope([
//            'intranet',
//        ]);

        //END LARAVEL PASSPORT
    }
}
