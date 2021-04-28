function scrollToTop() {
    $('html, body').animate(
        {
            scrollTop: $('body').offset().top,
        },
        500
    )
}

