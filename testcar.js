$(document).ready(function() {
    //variable 
    $surface = $('.surface');
    $ship = $('.ship');

    // keypress envent
    $(document).on('keypress', function (e) {
        if(e.which == 13) {
            $($surface).toggleClass('mouveRight');
        };
    })
})