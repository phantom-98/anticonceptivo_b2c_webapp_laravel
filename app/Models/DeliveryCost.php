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
        return $this->image ? \Storage::url($this->image) : $this->image;
    }
}
