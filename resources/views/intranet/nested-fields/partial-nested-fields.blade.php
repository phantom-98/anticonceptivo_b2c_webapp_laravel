<li class="dd-item" data-id="{{$nested_field['id']}}">

    <div class="dd-handle" style="width: calc(100% - 45px);">
        <div>{{ $nested_field['name'] }}
            @if($nested_field['nested_field_questions_count'] > 0)
                ({{$nested_field['nested_field_questions_count']}})
            @endif
        </div>
    </div>

    <div style="width: 34px; position:  absolute; top : 0; right: 0; padding-top: 2px;">
        <a href="{{ route($config['route'] . 'edit', [$nested_field['id']]) }}" class="btn btn-sm btn-default btn-hover-warning">
            <i class="fa fa-edit"></i>
        </a>
    </div>

    @if (count($nested_field['children']) > 0)
        <ol class="dd-list">
            @foreach($nested_field['children'] as $nested_field)
                @include('intranet.nested-fields.partial-nested-fields', $nested_field)
            @endforeach
        </ol>
    @endif
</li>

