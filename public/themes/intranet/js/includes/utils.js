function string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}



// parche para evitar numebro cientifico input number
function precise(elem) {
    elem.value = Number(elem.value).toFixed(5);
}


function checkRut(name) {
    var clean = $('#' + name).val().replace(/[^0-9Kk]/g, "");
    // don't move cursor to end if no change
    if (clean !== $('#' + name).val()) $('#' + name).val(clean);
}

function checkAddress(name) {
    var clean = $('#' + name).val().replace(/[^0-9a-zA-Z-#áéíóúÁÉÍÓÚñÑ ]/g, "");
    // don't move cursor to end if no change
    if (clean !== $('#' + name).val()) $('#' + name).val(clean);
}

function checkPhone(name) {

    // don't move cursor to end if no change

    var clean = $('#' + name).val().replace(/[^0-9+]/g, "");

    if (clean !== $('#' + name).val()) $('#' + name).val(clean);
}

function checkNames(name) {
    var clean = $('#' + name).val().replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, "");
    // don't move cursor to end if no change
    if (clean !== $('#' + name).val()) $('#' + name).val(clean);
}

function checkCosas(name) {
    var clean = $('#' + name).val().replace(/[^0-9a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, "");
    // don't move cursor to end if no change
    if (clean !== $('#' + name).val()) $('#' + name).val(clean);
}

function checkKey8(name) {
    var clean = $('#' + name).val().replace(/[^0-9a-zA-ZáéíóúÁÉÍÓÚñÑ. ]/g, "");
    // don't move cursor to end if no change
    if (clean !== $('#' + name).val()) $('#' + name).val(clean);
}

// parche para evitar numebro cientifico input number
function precise(elem) {
    elem.value = Number(elem.value).toFixed(5);
}

function pluck(array, key) {
    return array.map(function (obj) {
        return obj[key];
    });
}
