<td>
    <input type="checkbox" class="toggle-bs" id="chk_footer_{{ $object->id }}"
           {{ $object->active_footer ? 'checked' :  '' }} data-toggle="toggle"
           data-size="small" data-on="Activado" data-off="Desactivado"
           data-onstyle="success" data-offstyle="danger"/>
</td>
