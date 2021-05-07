<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Carbon\Carbon;

class Customer extends Authenticatable
{
    use SoftDeletes, HasRoles, HasApiTokens, Notifiable, HasFactory;

    protected $guard_name = 'customer';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'id_number',
        'id_type',
        'first_name',
        'last_name',
        'second_last_name',
        'phone_code',
        'phone',
        'email',
        'email_verified_at',
        'password',
        'business_name',
        'business_id_number',
        'commercial_business',
        'commercial_email',
        'commercial_address',
        'commercial_additional_address',
        'commercial_phone',
        'commercial_phone_code',
        'commercial_region_id',
        'commercial_commune_id',
        'recovery_pin',
        'last_access',
        'photo'
    ];

    public function getTextAttribute()
    {
        return $this->first_name . ' ' . $this->last_name . '|'. $this->id_number;
    }


    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = ['full_name', 'nice_date'];

    public function getFullNameAttribute()
    {
        return ucfirst($this->first_name) . ' ' . ucfirst($this->last_name) . ($this->second_last_name ? ' '.ucfirst($this->second_last_name) : '');
    }

    public function getNiceDateAttribute()
    {
        return Carbon::parse($this->created_at)->format('d-m-Y') ?? 'No especificada';
    }


    public function customer_addresses(){
        return $this->hasMany(CustomerAddress::class);
    }

    public function orders(){
        return $this->hasMany(Order::class);
    }

    public function commercial_region(){
        return $this->belongsTo(Region::class);
    }

    public function commercial_commune(){
        return $this->belongsTo(Commune::class);
    }

}
