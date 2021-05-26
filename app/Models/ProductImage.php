<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    protected $fillable = [
        'file',
        'position',
        'product_id'
    ];

    protected $appends = [
        'public_file'
    ];

    public function product(){
        return $this->belongsTo(Product::class);
    }

    public function getPublicFileAttribute(){
        return $this->file == null ? null : \Storage::url($this->file);
    }

}
