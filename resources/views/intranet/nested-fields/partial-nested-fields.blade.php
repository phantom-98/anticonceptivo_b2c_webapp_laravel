<li class="dd-item" data-id="{{$nested_field['id']}}">

    <div class="dd-handle" style="width: calc(100% - 75px);">
        <div>{{ $nested_field['name'] }}
            @if($nested_field['nested_field_questions_count'] > 0)
                ({{$nested_field['nested_field_questions_count']}})
            @endif
        </div>
    </div>

    <div style="width: 70px; position:  absolute; top : 0; right: 0; padding-top: 2px;">
        <a href="{{ route($config['route'] . 'edit', [$nested_field['id']]) }}" class="btn btn-sm btn-default btn-hover-warning">
            <i class="fa fa-edit"></i>
        </a>

        <button type="button" onclick="confirmDelete('{{$nested_field['id']}}')"
                class="btn btn-sm btn-default btn-hover-danger add-tooltip"
                title="Eliminar"
                style="float: left;">
            <i class="fa fa-remove"></i>
        </button>
        <form id="form_delete_{{$nested_field['id']}}"
              class="delete-form"
              action="{{ route($config['route'] . 'destroy',[$nested_field['id']] ) }}"
              method="post">
            <input type="hidden" name="_method" value="delete"/>
            {!! csrf_field() !!}
        </form>

    </div>



    @if (count($nested_field['children']) > 0)
        <ol class="dd-list">
            @foreach($nested_field['children'] as $nested_field)
                @include('intranet.nested-fields.partial-nested-fields', $nested_field)
            @endforeach
        </ol>
    @endif
</li>

