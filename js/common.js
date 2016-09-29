jQuery(document).ready(function ($) {

    var slideCount = $('#slider ul li').length;
    var slideWidth = $('#slider ul li').width();
    var slideHeight = $('#slider ul li').height();
    var sliderUlWidth = slideCount * slideWidth;
    var count = 1;
    var time_delay = 0;

    $('#checkbox').change(function(){
        var chk = $(this).is(":checked");
        if(chk) {
            time_delay = setInterval(function () {
            moveRight();
            }, 1000);
        } else {
            clearInterval(time_delay);
        }
    });

    $('#buttonplay').click(function(){
        sliderInit = setInterval(moveRight, 1000);
    });

    $('#buttonstop').click(function(){
        clearInterval(sliderInit);
    });

	$('#slider').css({ width: slideWidth, height: slideHeight });
	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });

        var current=$("li.active");
        var prev=current.prev('li');
        current.removeClass('active');
        if(prev.length==0)
            $('li:last').addClass('active');
        else
            prev.addClass('active');
        var cur=$('li.active').attr('data-des');
        $('.imageDes').text(cur);
        pager(cur);
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
        var current=$("li.active");
        var next=current.next('li');
        current.removeClass('active');
        if(next.length==0)
            $('li:first').addClass('active');
        else
            next.addClass('active');
        var cur=$('li.active').attr('data-des');
        $('.imageDes').text(cur);
        pager(cur);
    };

    function pager(cur){
        $('.pager span:nth-child('+ cur +')').addClass('active').siblings().removeClass('active');
    }

    $('a.prev').click(function (e) {
        e.preventDefault();
        moveLeft();
    });

    $('a.next').click(function (e) {
        e.preventDefault();
        moveRight();
    });

    $('.pager span').click(function(){
        var eq = $(this).index() + 1;
        console.log(eq);
        // $('.slider ul').animate({
        //     marginLeft:'-' + slider_w*eq
        // }, 300);
        // count=eq + 1;
        // $(this).addClass('active').siblings().removeClass('active');
    });

});
