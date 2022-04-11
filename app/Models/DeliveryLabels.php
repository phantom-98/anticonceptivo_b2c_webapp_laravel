<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryLabels extends Model
{

    protected $fillable = [
        'id',
        'label_original',
        'label_custom',
        'sub_label',
        'color',
    ];

    use HasFactory;
}
