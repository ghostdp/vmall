define(['jquery' , '../server/main','./banner','./goods'],function($ , {
    getBannerData , getPhoneData , getBookData , getPadData
} , { bannerInit } , { goodsInit }){
    
    getBannerData().then((res)=>{
        let banner_list = res.banner_list;
        bannerInit(banner_list);
    });

    getPhoneData().then((data)=>{
        goodsInit('#goods_phone' , data);
    });

    getBookData().then((data)=>{
        goodsInit('#goods_book' , data);
    });

    getPadData().then((data)=>{
        goodsInit('#goods_pad' , data);
    });

});