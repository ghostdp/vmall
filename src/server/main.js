define(['jquery'],function($){

    function getBannerData(){
        return $.ajax('../mock/banner.json');
    }

    function getPhoneData(){
        return $.ajax('../mock/phone.json');
    }
    
    function getBookData(){
        return $.ajax('../mock/book.json');
    }

    function getPadData(){
        return $.ajax('../mock/pad.json');
    }

    function getDetailData(type , goodsId){
        let promise = new Promise(function(resolve,reject){
            $.ajax(`../mock/${type}.json`).then((res)=>{
                //console.log(res);
                let result = res.goods_list.filter((v,i)=>{
                    return v.goodsId == goodsId;
                });
                resolve(result[0]);
            });
        });
        return promise;
    }

    return {
        getBannerData,
        getPhoneData,
        getBookData,
        getPadData,
        getDetailData
    }

});