<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LegalBase extends Model
{
    protected $fillable = [
        'name',
        'file',
        'icon',
        'active',
    ];

    protected $appends = [
        'public_file',
        'public_icon'
    ];

    public function getPublicFileAttribute(){
        return $this->file == null ? null : \Storage::url($this->file);
    }

    public function getPublicIconAttribute(){
        return $this->icon;
    }
}
