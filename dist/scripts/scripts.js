$(document).ready(function () {


    // adding class

    const panelMenu = $("#fixed-panel-menu");

    $("body").click(function (e) {
        if (panelMenu.hasClass('active') && !$(e.target).hasClass('arrow')) {
            panelMenu.removeClass('active');
        }
    });

    panelMenu.click(function () {
        $(this).toggleClass('active');
    });

    $(document).keyup(function (e) {
        if (e.keyCode === 27) {
            if (panelMenu.hasClass('active')) {
                panelMenu.removeClass('active');
            }
        }
    });
});


