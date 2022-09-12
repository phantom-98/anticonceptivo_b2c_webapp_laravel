$(window).on('beforeunload', function () {
    $('body').addClass('overflow-hidden');
    $('.loader').fadeIn();
});

$(window).on('pageshow', function(){
    $('.loader').fadeOut();
    $('body').removeClass('overflow-hidden');
});

$(document).ready(function () {
    $('.loader').fadeOut();
    $('body').removeClass('overflow-hidden');

    $('.select-normal').select2({
        language: {
            noResults: function (params) {
                return "No se han encontrado resultados.";
            }
        }
    });

    $('.select-multiple').select2({
        language: {
            noResults: function (params) {
                return "No se han encontrado resultados.";
            }
        }
    });

    try{
        jQuery.fn.bootstrapTable.defaults.icons = {
            paginationSwitchDown: 'demo-pli-arrow-down',
            paginationSwitchUp: 'demo-pli-arrow-up',
            refresh: 'demo-pli-repeat-2',
            toggle: 'demo-pli-layout-grid',
            columns: 'demo-pli-check',
            export: 'demo-pli-download-from-cloud',
            detailOpen: 'demo-psi-add',
            detailClose: 'demo-psi-remove'
        };
    }catch(error){

    }


});

$('#table-bs').on('page-change.bs.table', function (d)
{
    runActiveControl();
    console.log("page change");
});

$('#table-bs').on('column-switch.bs.table', function (d) {
    runActiveControl();
});

$('#table-bs').on('sort.bs.table', function (d) {
    runActiveControl();
    console.log("filter");
});

$('#table-bs').on('search.bs.table', function (d) {
    runActiveControl();
});

function runActiveControl(){
    try{
        preparedChangeStatus();
        preparedChangeStatusImmediate();
        preparedChangeStatusOutstanding();
    }catch (e) {
        console.log(e);
    }
    $('.toggle-bs').bootstrapToggle();
}


function showLoading(){
    $('.loader').fadeIn();
}
function hideLoading(){
    $('.loader').fadeOut();
}
