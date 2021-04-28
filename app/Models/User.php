<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use SoftDeletes, HasRoles, HasApiTokens, Notifiable, HasFactory;

    protected $guard_name = 'intranet';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'rut',
        'first_name',
        'last_name',
        'second_last_name',
        'phone',

        'email',
        'email_verified_at',
        'password',
        'recovery_pin',
        'last_access',

        'avatar',
        'theme',

        'active',
        'editable',
        'removable',
        'viewable',

        'created_at',
        'updated_at',
        'deleted_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    protected $appends = [
        'full_name',
        'avatar_public'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($query) {
            $query->user_id = 'I'. \Str::random(4) . date('Ymdhis') . \Str::random(4);
        });
    }

    public function getFullNameAttribute()
    {
        return ucfirst($this->first_name) . ' ' . ucfirst($this->last_name) . ($this->second_last_name ? ' ' . ucfirst($this->second_last_name) : '');
    }

    public function getAvatarPublicAttribute()
    {
        return $this->avatar == null ? null : Storage::url($this->avatar);
    }

}
