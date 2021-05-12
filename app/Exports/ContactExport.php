<?php

namespace App\Exports;

use App\Models\Contact;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ContactExport implements FromView, ShouldAutoSize
{
    
    function __construct($startFilter, $endFilter, $section, $status, $type) {
        $this->startFilter = $startFilter;
        $this->endFilter = $endFilter;
        $this->section = $section;
        $this->status = $status;
        $this->type = $type;
    }
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): View
    {
        $contacts = Contact::with('contact_issue', 'order');
        if($this->status != "Todos"){
            $contacts = $contacts->where('is_reply', $this->status);
        } 
        $section = $this->section;
        $type = $this->type;
        if($section != "Todas"){
            $contacts = $contacts->whereHas('contact_issue', function($q) use($section){
                $q->where('section', $section);
            });
        }
        if($type != "Todos"){
            $contacts = $contacts->whereHas('contact_issue', function($q) use($type){
                $q->where('type', $type);
            });
        }
        if($this->startFilter){
            $contacts = $contacts->whereBetween('created_at', [$this->startFilter.' 00:00:00', $this->endFilter.' 23:59:59']);
        }     

        $contacts = $contacts->get();

        return view('intranet.exports.contacts')->with('contacts', $contacts);
    }

}
