toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

// mostrar mensaje de exito
function showToastSuccess(message, title) {
    toastr.success(message, title ? title : 'Operación Exitosa');
}

// mostrar mensaje de error
function showToastError(message, title) {
    toastr.error(message, title ? title : 'Error!');
}

// mostrar info de error
function showToastInfo(message, title) {
    toastr.info(message, title ? title : 'Información!');
}

// mostrar warning de error
function showToastWarning(message, title) {
    toastr.warning(message, title ? title : 'Advertencia!');
}


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

function doSubmit(form) {
    $('#' + form).find('[type=\'submit\']').trigger('click');
}

function sluginInput(elem, inputWrite) {
    $('#' + inputWrite).val(string_to_slug($(elem).val()))
}

function cellStyle(value, row, index, field) {
    return {
        css: {
            "white-space": "nowrap",
            "width": "1%",
            "vertical-align": "middle"
        }

    };
}

function midAling(value, row, index, field) {
    return {
        css: {
            "vertical-align": "middle"
        }

    };
}
