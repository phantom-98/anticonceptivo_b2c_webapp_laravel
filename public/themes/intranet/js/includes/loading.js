$(window).on('beforeunload', function () {
    $('body').addClass('overflow-hidden');
    $('.loader').fadeIn();
});

$(document).ready(function () {
    $('.loader').fadeOut();
    $('body').removeClass('overflow-hidden');
});


function showLoading() {
    $('.loader').fadeIn();
}

function hideLoading() {
    $('.loader').fadeOut();
}
