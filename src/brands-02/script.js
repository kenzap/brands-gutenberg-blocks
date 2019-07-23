jQuery(document).ready(function(){
    if (document.querySelector('.gutenberg-editor-page') || document.querySelector('.block-editor-page') || document.querySelector('.wp-admin')) {
        return false;
    }

    if(jQuery(".kenzap .kenzap-clients-2 .owl-carousel").length){
        kpInitCarousel();
    }else{
        setTimeout(function() { kpInitCarousel(); },'1000');
    }

    function kpInitCarousel(){

        if(jQuery(".kenzap .kenzap-clients-2 .owl-carousel").length){

            var images = jQuery(".kenzap .kenzap-clients-2 .owl-carousel").data("images");
            var size = jQuery(".kenzap .kenzap-clients-2 .brandimg").width();
            var carousel = jQuery(".kenzap .kenzap-clients-2 .owl-carousel").data("carousel");

            var obj = {};
            var i = 1200, img = parseInt(images);
            size = 200;
            while(i>0){obj[i] = {items:img>0?img:1};img-=1;i-=size;}

            console.log(obj);
            
            if(carousel){
                jQuery(".kenzap .kenzap-clients-2 .owl-carousel").owlCarousel({
                    autoplay: false,
                    margin: 10,
                    dots: false,
                    responsive: obj
                });
                jQuery(".kenzap .kenzap-clients-2 .owl-load").removeClass("owl-load");
            }
            jQuery(".kenzap .kenzap-clients-2 .cload").removeClass("cload");
        }
    }
});