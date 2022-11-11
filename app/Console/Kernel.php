<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //Commands\PaySubscriptions::class,
        Commands\UpdateStateDispatch::class,
        Commands\UpdateStock::class,
        //Commands\VoucherPaymentDays::class,
        Commands\Sitemap::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        //$schedule->command('command:voucherPaymentDays')->dailyAt('00:01');
        $schedule->command('command:updateStock')->everyThreeMinutes();
        //$schedule->command('command:paySubscriptions')->dailyAt('00:30');
        $schedule->command('command:updateStateDispatch')->everyFiveMinutes();
        $schedule->command('command:sitemap')->dailyAt('01:00');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
