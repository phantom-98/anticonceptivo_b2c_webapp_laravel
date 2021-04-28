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
    toastr.success(message, title ? title : 'Operación Éxitosa');
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
