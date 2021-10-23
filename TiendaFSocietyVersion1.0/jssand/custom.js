


/*=============================================================
    Authour URI: www.binarycart.com
    License: Commons Attribution 3.0

    http://creativecommons.org/licenses/by/3.0/

    100% To use For Personal And Commercial Use.
    IN EXCHANGE JUST GIVE US CREDITS AND TELL YOUR FRIENDS ABOUT US
   
    ========================================================  */


(function ($) {
    "use strict";
    var mainApp = {

        main_fun: function () {
            /*====================================
            METIS MENU 
            ======================================*/
            $('#main-menu').metisMenu();

            /*====================================
              LOAD APPROPRIATE MENU BAR
           ======================================*/
            $(window).bind("load resize", function () {
                if ($(this).width() < 768) {
                    $('div.sidebar-collapse').addClass('collapse')
                } else {
                    $('div.sidebar-collapse').removeClass('collapse')
                }
            });

            /*====================================
            MORRIS BAR CHART
         ======================================*/
            Morris.Bar({
                element: 'morris-bar-chart',
                data: [{
                    y: '2014',
                    a: 100
                }, {
                    y: '2015',
                    a: 75
                }, {
                    y: '2016',
                    a: 50
                }, {
                    y: '2017',
                    a: 75
                }, {
                    y: '2018',
                    a: 50
                }, {
                    y: '2019',
                    a: 75
                }, {
                    y: '2020',
                    a: 100

                }],
                xkey: 'y',
                ykeys: ['a'],
                labels: ['PORCENTAJE'],
                hideHover: 'auto',
                resize: true
                
            });

            /*====================================
          MORRIS DONUT CHART
       ======================================*/
            Morris.Donut({
                element: 'morris-donut-chart',
                data: [{
                    label: "Compras en la tienda",
                    value: 26
                }, {
                    label: "Compras por correo",
                    value: 74
                }],
                resize: true
            });

           
     
        },

        initialization: function () {
            mainApp.main_fun();

        }

    }
    // Initializing ///

    $(document).ready(function () {
        mainApp.main_fun();
    });

}(jQuery));
