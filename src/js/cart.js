define(['jquery' , './cartStorage'],function($ , { getCartStorage , setCartStorage }){

    let cartData = getCartStorage();
    let $cart = $('#cart');
    let $cart_list = $cart.find('.cart_list');
    cartInit(cartData);
    cartBind();

    function cartInit(data){
        let selectAllFlag = true;
        let countAll = 0;
        let priceAll = 0;
        let tmp = `
            ${data.map(function(v,i){
                return `
                    <li>
                        <div><input class="cart_list_cb" type="checkbox"></div>
                        <div><a href="./detail.html?type=${v.goodsType}&id=${v.goodsId}" target="_blank">${v.goodsName}（${v.goodsColor}）</a></div>
                        <div>¥ ${v.goodsPrice}.00</div>
                        <div>
                            <span class="cart_list_reduce">-</span>
                            <input class="cart_list_text" type="text" value="${v.goodsNumber}">
                            <span class="cart_list_sum">+</span>
                        </div>
                        <div>¥ ${v.goodsPrice*v.goodsNumber}.00</div>
                        <div class="cart_list_remove">删除</div>
                    </li>
                `;
            }).join('')} 
        `;
        $cart_list.html(tmp);
        $cart.find('.cart_list_cb').each(function(i,v){
            this.checked = data[i].goodsChecked;
            if( !this.checked ){
                selectAllFlag = false;
            }
            else{
                countAll += data[i].goodsNumber;
                priceAll += data[i].goodsPrice*data[i].goodsNumber;
            }
        });
        selectAll(selectAllFlag);
        computedAll(countAll , priceAll);
    }

    function cartBind(){
        $cart_list.on('click','.cart_list_sum',function(){
            let $cart_list_text = $(this).prev();
            let index = $(this).closest('li').index();
            let val = Number($cart_list_text.val());
            let goodsNumber = val + 1;
            let cartData = getCartStorage();
            cartData[index].goodsNumber = goodsNumber;
            setCartStorage(cartData);
            cartInit(cartData);
        });
        $cart_list.on('click','.cart_list_reduce',function(){
            let $cart_list_text = $(this).next();
            let index = $(this).closest('li').index();
            let val = Number($cart_list_text.val());
            if(val > 1){
                let goodsNumber = val - 1;
                let cartData = getCartStorage();
                cartData[index].goodsNumber = goodsNumber;
                setCartStorage(cartData);
                cartInit(cartData);
            }
        });
        $cart_list.on('click','.cart_list_remove',function(){
            let index = $(this).closest('li').index();
            let cartData = getCartStorage();
            cartData.splice(index,1);
            setCartStorage(cartData);
            cartInit(cartData);
        });
        $cart_list.on('click','.cart_list_cb',function(){
            let index = $(this).closest('li').index();
            let cartData = getCartStorage();
            cartData[index].goodsChecked = $(this).prop('checked');
            setCartStorage(cartData);
            cartInit(cartData);
        });
        $cart.on('click','.cart_title_selectAll',function(){
            let checked = $(this).prop('checked');
            let cartData = getCartStorage();
            if(checked){
                for(let i=0;i<cartData.length;i++){
                    cartData[i].goodsChecked = true;
                }
            }
            else{
                for(let i=0;i<cartData.length;i++){
                    cartData[i].goodsChecked = false;
                }
            }
            setCartStorage(cartData);
            cartInit(cartData);
        });
    }

    function selectAll(selectAllFlag){
        let $cart_title_selectAll = $cart.find('.cart_title_selectAll');
        $cart_title_selectAll.prop('checked',selectAllFlag);
    }
    
    function computedAll(countAll , priceAll){
        let $cart_computed_price_price = $cart.find('.cart_computed_price p:first-of-type');
        let $cart_computed_price_count = $cart.find('.cart_computed_price p:last-of-type');
        $cart_computed_price_price.html(`总计：¥ ${priceAll}.00`);
        $cart_computed_price_count.html(`已选择 ${countAll}件商品`);
    }

});