<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;

class PhoneHomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $setting = new \App\Models\Setting();
        $setting->key = 'PHONE_CONTACT';
        $setting->value = '(2) 3245 1883';
        $setting->save();
    }
}
