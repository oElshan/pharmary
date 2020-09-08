/*
 Template Name: Agroxa - Responsive Bootstrap 4 Admin Dashboard
 Author: Themesbrand
 Website: www.themesbrand.com
 File: Main js
 */


!function($) {
    "use strict";

    //Мой кусок
    $(document).ready(function () {

        //проверка новых ордеров
        var interval = 5000;  // 1000 = 1 second, 3000 = 3 seconds
        function doAjax() {
            $.ajax({
                dataType: "json",
                type: 'GET',
                url: '/ajax/admin/orderStatus',
                success: function (data) {
                    $('#orderCount').removeClass('hidden');
                    $('#orderCount').text(data.count);
                },
                error : function(xhr) {
                    if (xhr.status == 400) {
                        alert(xhr.responseJSON.message);
                    } else {
                        alert('Error');
                    }
                },
                complete: function (data) {
                    // Schedule the next
                    setTimeout(doAjax, interval);
                }
            });
        }
        setTimeout(doAjax, interval);



        // $(document).on('click', '#showNewOrders',function (){
        //     $('#latestOrder').load('/ajax/admin/newOrder');
        //
        // });

        //Поиск товава в админке
        $('#searchItem').on('keyup', function(){
            var $result = $('#itemsTable');
            var search = $(this).val();
            if ((search !== '') && (search.length > 2)){
                $.ajax({
                    type: "POST",
                    url: "/ajax/json/search-items",
                    data: JSON.stringify({
                        searchName: search
                    }),
                    contentType: 'application/json',

                    success: function(msg){
                        $result.html(msg);
                        if(msg !== ''){
                                $result.fadeIn();
                        }
                        else {
                            $result.fadeOut(100);
                        }
                    },
                    error : function(xhr) {
                        if (xhr.status == 400) {
                            alert(xhr.responseJSON.message);
                        } else {
                            alert('Error');
                        }
                    }

                });
            }
            else {
                // $result.html('');
                $result.fadeOut(100);
            }
        });

        //Поиск ордеров
        $('#searchOrder').on('keyup', function(){
            var $result = $('#ordersTable');
            var search = $(this).val();
            if ((search !== '') && (search.length > 2)){
                $.ajax({
                    type: "POST",
                    url: "/ajax/json/search-orders",
                    data: JSON.stringify({
                        searchName: search
                    }),
                    contentType: 'application/json',
                    success: function(msg){
                        $result.html(msg);
                        if(msg !== ''){
                            $result.fadeIn();
                        }
                        else {
                            $result.fadeOut(100);
                        }
                    },
                    error : function(xhr) {
                        if (xhr.status == 400) {
                            alert(xhr.responseJSON.message);
                        } else {
                            alert('Error');
                        }
                    }

                });
            }
            else {
                // $result.html('');
                $result.fadeOut(100);
            }
        });


    });

    var MainApp = function() {};

    MainApp.prototype.intSlimscrollmenu = function () {
        $('.slimscroll-menu').slimscroll({
            height: 'auto',
            position: 'right',
            size: "7px",
            color: '#9ea5ab',
            wheelStep: 5,
            touchScrollStep: 50
        });
    },
    MainApp.prototype.initSlimscroll = function () {
        $('.slimscroll').slimscroll({
            height: 'auto',
            position: 'right',
            size: "5px",
            color: '#9ea5ab',
            touchScrollStep: 50
        });
    },

    MainApp.prototype.initMetisMenu = function () {
        //metis menu
        $("#side-menu").metisMenu();
    },

    MainApp.prototype.initLeftMenuCollapse = function () {
        // Left menu collapse
        $('.button-menu-mobile').on('click', function (event) {
            event.preventDefault();
            $("body").toggleClass("enlarged");
        });
    },

    MainApp.prototype.initEnlarge = function () {
        if ($(window).width() < 1025) {
            $('body').addClass('enlarged');
        } else {
            if ($('body').data('keep-enlarged') != true)
                $('body').removeClass('enlarged');
        }
    },

    MainApp.prototype.initActiveMenu = function () {
        // === following js will activate the menu in left side bar based on url ====
        $("#sidebar-menu a").each(function () {
            var pageUrl = window.location.href.split(/[?#]/)[0];
            if (this.href == pageUrl) {
                $(this).addClass("active");
                $(this).parent().addClass("active"); // add active to li of the current link
                $(this).parent().parent().addClass("in");
                $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
                $(this).parent().parent().parent().addClass("active");
                $(this).parent().parent().parent().parent().addClass("in"); // add active to li of the current link
                $(this).parent().parent().parent().parent().parent().addClass("active");
            }
        });
    },

    MainApp.prototype.initComponents = function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    },

    MainApp.prototype.initHeaderCharts = function () {
        $('#header-chart-1').sparkline([8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12], {
            type: 'bar',
            height: '35',
            barWidth: '5',
            barSpacing: '3',
            barColor: '#35a989'
        });
        $('#header-chart-2').sparkline([8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12], {
            type: 'bar',
            height: '35',
            barWidth: '5',
            barSpacing: '3',
            barColor: '#ffe082'
        });
    },

    MainApp.prototype.init = function () {
        this.intSlimscrollmenu();
        this.initSlimscroll();
        this.initMetisMenu();
        this.initLeftMenuCollapse();
        this.initEnlarge();
        this.initActiveMenu();
        this.initComponents();
        this.initHeaderCharts();
        Waves.init();
    },

    //init
    $.MainApp = new MainApp, $.MainApp.Constructor = MainApp
}(window.jQuery),

//initializing
function ($) {
    "use strict";
    $.MainApp.init();
}(window.jQuery);
