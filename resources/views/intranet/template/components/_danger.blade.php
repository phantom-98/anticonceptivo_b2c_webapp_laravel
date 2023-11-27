@if(session()->has('danger'))
    <div class="alert alert-danger alert-dismissible">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa fa-remove"></i> Oops</h4>
        <p>{{ session()->get('danger') }}</p>
    </div>
@endif