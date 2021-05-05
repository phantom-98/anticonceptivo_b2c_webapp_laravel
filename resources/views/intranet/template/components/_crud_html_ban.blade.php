<td>
    <input type="checkbox" class="toggle-bs" id="chk_banned_{{ $object->id }}"
           {{ $object->ban ? 'checked' :  '' }} data-toggle="toggle"
           data-size="small" data-on="Activado" data-off="Desactivado"
           data-onstyle="success" data-offstyle="danger"/>
</td>