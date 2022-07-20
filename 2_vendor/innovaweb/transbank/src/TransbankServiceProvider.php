<?php

namespace Innovaweb\Transbank;

use Illuminate\Support\ServiceProvider;

class TransbankServiceProvider extends ServiceProvider
{
    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot(): void
    {
        // $this->loadTranslationsFrom(__DIR__.'/../resources/lang', 'innovaweb');
        // $this->loadViewsFrom(__DIR__.'/../resources/views', 'innovaweb');
        // $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
        // $this->loadRoutesFrom(__DIR__.'/routes.php');

        // Publishing is only necessary when using the CLI.
        if ($this->app->runningInConsole()) {
            $this->bootForConsole();
        }
    }

    /**
     * Register any package services.
     *
     * @return void
     */
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/transbank.php', 'transbank');

        // Register the service the package provides.
        $this->app->singleton('transbank', function ($app) {
            return new Transbank;
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['transbank'];
    }

    /**
     * Console-specific booting.
     *
     * @return void
     */
    protected function bootForConsole(): void
    {
        // Publishing the configuration file.
        $this->publishes([
            __DIR__ . '/../config/transbank.php' => config_path('transbank.php'),
        ], 'transbank.config');

        // Publishing the views.
        /*$this->publishes([
            __DIR__.'/../resources/views' => base_path('resources/views/vendor/innovaweb'),
        ], 'transbank.views');*/

        // Publishing assets.
        /*$this->publishes([
            __DIR__.'/../resources/assets' => public_path('vendor/innovaweb'),
        ], 'transbank.views');*/

        // Publishing the translation files.
        /*$this->publishes([
            __DIR__.'/../resources/lang' => resource_path('lang/vendor/innovaweb'),
        ], 'transbank.views');*/

        // Registering package commands.
        // $this->commands([]);
    }
}
