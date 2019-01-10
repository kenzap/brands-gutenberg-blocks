jQuery(document).ready(function(){
    if (document.querySelector('.gutenberg-editor-page') || document.querySelector('.block-editor-page') || document.querySelector('.wp-admin')) {
        return false;
    }
    setTimeout(function() {
        jQuery(".owl-carousel").owlCarousel({
            autoplay: false,
            margin: 10,
            dots: false,
            responsive: {
                0:{
                    items:1
                },
                600:{
                    items:2
                },            
                768:{
                    items:3
                },
                1200:{
                    items:4
                },
                1400:{
                    items:6
                }
            }
        });
	},'1000');
});
