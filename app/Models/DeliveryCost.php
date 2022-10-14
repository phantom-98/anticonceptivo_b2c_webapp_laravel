<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryCost extends Model
{
    protected $fillable = [
        'id',
        'name',
        'image',
        'deadline_delivery',
        'deadline_delivery_llego',
        'costs',
        'active',
    ];

    protected $appends = [
        'formated_costs',
        'public_image'
    ];

    public function getFormatedCostsAttribute(){
        return json_decode($this->costs);
    }

    public function getPublicImageAttribute()
    {
        return $this->image;
    }
}
