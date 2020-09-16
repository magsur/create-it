$(document).ready(function () {


    // adding class

    const panelMenu = $("#fixed-panel-menu");


    $("body").click(function (e) {
        if (panelMenu.hasClass('active') && !$(e.target).hasClass('icon')) {
            panelMenu.removeClass('active');
        }
    });

    panelMenu.click(function () {
        $(this).toggleClass('active');
    });

});

