function doSubmit(form) {
    $('#' + form).submit();
}

function slugInInput(elem, inputWrite) {
    $('#' + inputWrite).val(string_to_slug($(elem).val()));
}
