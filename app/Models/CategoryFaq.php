<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryFaq extends Model
{
    protected $fillable = [
        'name',
        'active',
        'position'
    ];

    public function faqs(){
        return $this->hasMany(Faq::class)->orderBy('position');
    }

}
