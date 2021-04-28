@if(session()->has('info'))
    <div class="alert alert-info alert-dismissible">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa fa-info"></i> Información</h4>
        <p>{{ session()->get('info') }}</p>
    </div>
@endif