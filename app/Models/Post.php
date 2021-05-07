<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Post extends Model
{
    protected $fillable = [
        'id',
        'title',
        'slug',
        'content',
        'principal_image',
        'content_image',
        'author_id',
        'active',
        'published_at',
        'position',
        'created_at',
        'updated_at',
        'type',
        'link',
        'post_type_id'
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function post_type()
    {
        return $this->belongsTo(PostType::class, 'post_type_id');
    }

    protected $appends = [
        'formated_date',
        'nice_date',
        'month'
    ];

    public function getFormatedDateAttribute(){
        return Carbon::parse($this->created_at)->format('d-m-Y');
    }

    public function getNiceDateAttribute(){
        return Carbon::parse($this->created_at) ?? null;
    }

    public function getMonthAttribute(){
        if(Carbon::parse($this->created_at)->format('n') == 1){
            return "Enero";
        }
        if(Carbon::parse($this->created_at)->format('n') == 2){
            return "Febrero";
        }
        if(Carbon::parse($this->created_at)->format('n') == 3){
            return "Marzo";
        }
        if(Carbon::parse($this->created_at)->format('n') == 4){
            return "Abril";
        }
        if(Carbon::parse($this->created_at)->format('n') == 5){
            return "Mayo";
        }
        if(Carbon::parse($this->created_at)->format('n') == 6){
            return "Junio";
        }
        if(Carbon::parse($this->created_at)->format('n') == 7){
            return "Julio";
        }
        if(Carbon::parse($this->created_at)->format('n') == 8){
            return "Agosto";
        }
        if(Carbon::parse($this->created_at)->format('n') == 9){
            return "Septiembre";
        }
        if(Carbon::parse($this->created_at)->format('n') == 10){
            return "Octubre";
        }
        if(Carbon::parse($this->created_at)->format('n') == 11){
            return "Noviembre";
        }
        if(Carbon::parse($this->created_at)->format('n') == 12){
            return "Diciembre";
        }
    }

}
