
$(document).ready(function () {

    var pictureCount = $('#container img').length;
    var scrollResolution = 50;

    animateHorse();
    
    function animateHorse() {
        var currentScrollPosition = window.pageYOffset;
        var imageIndex = Math.round(currentScrollPosition / scrollResolution);
        
        if (imageIndex >= pictureCount) {
            imageIndex = pictureCount - 1; // Select last image
        }
        
        $("#container img").hide();
        $("#container img").eq(imageIndex).show();
    }
    
    $(window).bind('scroll', function() {
        animateHorse();
    });
});