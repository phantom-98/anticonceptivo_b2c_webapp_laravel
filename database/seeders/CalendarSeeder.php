<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;

class CalendarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $setting = new \App\Models\Setting();
        $setting->key = 'MIN_HOUR';
        $setting->value = '30';
        $setting->save();

        
        $setting = new \App\Models\Setting();
        $setting->key = 'MAX_HOUR';
        $setting->value = '180';
        $setting->save();
    }
}
