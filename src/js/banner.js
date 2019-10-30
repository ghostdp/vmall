define(['jquery'],function($){

    let $banner_imgs = $('.banner_imgs');
    let $banner_dots = $('.banner_dots');

    function bannerInit(data){
        let tmp = '';
        let tmp2 = '';
        for(let i=0;i<data.length;i++){
            tmp += `<li><a href="${data[i].imgLink}" target="_blank"><img src="${data[i].imgUrl}" alt=""></a></li>`;
            if(i==0){
                tmp2 += `<li class="active"></li>`;
            }
            else{
                tmp2 += `<li></li>`;
            }
        }
        $banner_imgs.html(tmp);
        $banner_dots.html(tmp2);
        bannerBind();
    }

    function bannerBind(){
        let $imgItems = $banner_imgs.find('li');
        let $dotItems = $banner_dots.find('li');
        $dotItems.on('mouseover',function(){
            $(this).attr('class','active').siblings().attr('class','');
            $imgItems.eq($(this).index()).fadeIn().siblings().fadeOut();
        });
    }

    return {
        bannerInit
    }


});