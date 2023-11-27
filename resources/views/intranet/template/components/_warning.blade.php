@if(session()->has('warning'))
    <div class="alert alert-warning alert-dismissible">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa fa-warning"></i> Atención</h4>
        <p>{{ session()->get('warning') }}</p>
    </div>
@endif