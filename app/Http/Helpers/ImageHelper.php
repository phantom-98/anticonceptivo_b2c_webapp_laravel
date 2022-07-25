<?php


namespace App\Http\Helpers;

use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;

class ImageHelper
{
    static function convert_image($class, $id, $column){
        $classname = 'App\\Models\\'.$class;
        $object = $classname::find($id);

        if (Storage::exists($object->$column)) {
            $file_name = explode(".", $object->$column);
            $file_name = str_replace('public', 'storage', $file_name[0]);

            $image = Image::make(Storage::get($object->$column))->encode('webp', 90)->save($file_name . '.webp');

            $file_name = str_replace('storage', 'public', $file_name);
            $object->$column = $file_name . '.webp';
            $object->save();
        }
    }

    static function convert_old_images($class, $column){
        $classname = 'App\\Models\\'.$class;
        $objects = $classname::get();

        foreach($objects as $object){
            if (Storage::exists($object->$column)) {
                $file_name = explode(".", $object->$column);
                $file_name = str_replace('public', 'storage', $file_name[0]);

                $image = Image::make(Storage::get($object->$column))->encode('webp', 90)->save($file_name . '.webp');

                $file_name = str_replace('storage', 'public', $file_name);
                $object->$column = $file_name . '.webp';
                $object->save();
            }
        }
    }
}
