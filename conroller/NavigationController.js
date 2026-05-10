$(document).ready(function () {
    // Show only home view at start
    $(".view").hide();
    $("#home-view").show();

    // Navigation click handler
    $(".nav-item").click(function (e) {
        e.preventDefault();
        const target = $(this).attr("href");
        $(".view").hide();
        $(target).show();
    });
});
