
function include(file) {

    var script  = document.createElement('script');
    script.src  = file;
    script.type = 'text/javascript';
    script.defer = true;

    document.getElementsByTagName('head').item(0).appendChild(script);

}


include('/themes/intranet/js/includes/bootstrapTable.js');
include('/themes/intranet/js/includes/forms.js');
include('/themes/intranet/js/includes/loading.js');
include('/themes/intranet/js/includes/toastConfig.js');
include('/themes/intranet/js/includes/utils.js');


/////////////////////////////////////////////////////////////////////////////////////////////
// Other Scripts
/////////////////////////////////////////////////////////////////////////////////////////////

$('.btn-theme').click(function () {

    let theme = $(this).data('theme');
    let type = $(this).data('type');

    $('#theme').attr('href', '/themes/intranet/css/themes/type-' + type + '/' + theme + '.min.css')

});
