<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    protected $fillable = [
        'question',
        'answer',
        'position',
        'active',
        'category_faq_id'
    ];

    public function category_faq()
    {
        return $this->belongsTo(CategoryFaq::class);
    }
}

