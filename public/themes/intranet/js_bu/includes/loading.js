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
});


function showLoading() {
    $('.loader').fadeIn();
}

function hideLoading() {
    $('.loader').fadeOut();
}
