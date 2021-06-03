$(function() {
    try {
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
    } catch (error) {

    }
});


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
            "white-space": "nowrap",
            "vertical-align": "middle"
        }

    };
}


$('#table-bs').on('page-change.bs.table', function (d) {

    $('.toggle-bs').bootstrapToggle();
});

$('#table-bs').on('column-switch.bs.table', function (d) {
    $('.toggle-bs').bootstrapToggle();
});

// $('#table-bs').on('post-body.bs.table', function (d) {
//
//     runActiveControl()
// });

$(document).ready(()=>{
    $('.toggle-bs').bootstrapToggle();
});

function runActiveControl() {
    try {
        preparedChangeStatus();
    } catch (e) {
        console.log(e);
    }
    $('.toggle-bs').bootstrapToggle();
}

function removeCookieBS(table) {
    $('#table-bs').bootstrapTable(
        {
            deleteCookie: table
        }
    );
}