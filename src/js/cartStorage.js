define(['jquery'],function($){

    function addCartStorage(data,cb){
        let result = getCartStorage() || [];
        let flag = true;
        let index = -1;
        for(let i=0;i<result.length;i++){
            if( result[i].goodsId == data.goodsId && result[i].goodsColor == data.goodsColor ){
                flag = false;
                index = i;
            }
        }

        if(flag){
            result.push(data);
        }
        else{
            result[index].goodsNumber += data.goodsNumber;
        }

        setCartStorage(result);
        cb();
    }
    function getCartStorage(){
        return JSON.parse(localStorage.getItem('cart'));
    }
    function setCartStorage(result){
        localStorage.setItem('cart',JSON.stringify(result));
    }

    return {
        addCartStorage,
        getCartStorage,
        setCartStorage
    }

});