define(['jquery' , '../server/main' , './cartStorage'],function($ , {
    getDetailData
} , { addCartStorage }){
    
    //console.log(location);
    let type = location.search.match(/type=([^&]+)/)[1];
    let goodsId = location.search.match(/id=([^&]+)/)[1];
    let $detail = $('#detail');
    let $detailGoods = $('#detailGoods');
    
    getDetailData(type , goodsId).then((data)=>{
        detailInit(data);
    });

    function detailInit(data){
        let tmp = `
        <div class="detail_gallery l">
            <div class="detail_gallery_normal">
                <img src="${data.photoNormal}" alt="">
                <span></span>
            </div>
            <div class="detail_gallery_large">
                <img src="${data.photoLarge}" alt="">
            </div>
        </div>
        <div class="detail_message l">
            <h2>${data.goodsName}</h2>
            <p>价 格 <span class="detail_message_price">¥${data.goodsPrice}.00</span></p>
            <p>
                选择颜色
                ${data.chooseColor.map(function(v,i){
                    if(i==0){
                        return `<span class="detail_message_box active">${v}</span>`;
                    }
                    else{
                        return `<span class="detail_message_box">${v}</span>`;
                    }
                }).join('')} 
            </p>
            <div class="detail_message_btn clearfix">
                <div class="detail_message_num l">
                    <input type="text" value="1">
                    <span>+</span>
                    <span>-</span>
                </div>
                <div class="detail_message_cart l"><a href="#">加入购物车</a></div>
                <div class="detail_message_computed l"><a href="./cart.html">立即下单</a></div>
            </div>
        </div>
        `;
        var tmp2 = `
            <h3>-- 商品详情 --</h3>
            ${data.goodsInfo.map(function(v,i){
                return `<img src="${v}" alt="">`;
            }).join('')}
        `;
        $detail.html(tmp);
        $detailGoods.html(tmp2);
        magnifier();
        chooseColor();
        chooseNumber();
        addCart(data);
    }

    function magnifier(){
        let $detail_gallery_normal = $('.detail_gallery_normal');
        let $detail_gallery_large = $('.detail_gallery_large');
        $detail_gallery_normal.hover(function(){
            let $mask = $(this).find('span');
            $mask.show();
            $detail_gallery_large.show();
        },function(){
            let $mask = $(this).find('span');
            $mask.hide();
            $detail_gallery_large.hide();
        });
        $detail_gallery_normal.on('mousemove',function(ev){
            let $mask = $(this).find('span');
            let x = ev.pageX - $(this).offset().left;
            let y = ev.pageY - $(this).offset().top;
            let L = x - $mask.width()/2;
            let T = y - $mask.height()/2;
            if(L < 0){
                L = 0;
            }
            else if(L > $(this).width() - $mask.width()){
                L = $(this).width() - $mask.width();
            }
            if(T < 0){
                T = 0;
            }
            else if(T > $(this).height() - $mask.height()){
                T = $(this).height() - $mask.height();
            }
            $mask.css({ left : L , top : T });
            let scaleX = L / ($(this).width() - $mask.width());
            let scaleY = T / ($(this).height() - $mask.height());
            let largeImg = $detail_gallery_large.find('img');
            largeImg.css({ 
                left : - scaleX * (largeImg.width() - $detail_gallery_large.width()), 
                top : - scaleY * (largeImg.height() - $detail_gallery_large.height()) 
            });
        });
    }

    function chooseColor(){
        let $detail_message_box = $detail.find('.detail_message_box');
        $detail_message_box.on('click',function(){
            $(this).addClass('active').siblings().removeClass('active');
        });
    }
    function chooseNumber(){
        let $detail_message_btns = $detail.find('.detail_message_num span');
        let $detail_message_input = $detail.find('.detail_message_num input');
        $detail_message_btns.eq(0).on('click',function(){
            let val = Number($detail_message_input.val());
            $detail_message_input.val( val + 1 );
        });
        $detail_message_btns.eq(1).on('click',function(){
            let val = Number($detail_message_input.val());
            if(val > 1){
                $detail_message_input.val( val - 1 );
            }
        });
    }

    function addCart(data){
        let $detail_message_cart = $detail.find('.detail_message_cart');
        $detail_message_cart.on('click',function(){
            let result = {
                goodsId : data.goodsId,
                goodsName : data.goodsName,
                goodsPrice : data.goodsPrice,
                goodsColor : $detail.find('.detail_message_box').filter('.active').html(),
                goodsNumber :  Number($detail.find('.detail_message_num input').val()),
                goodsType : type,
                goodsChecked : true
            };
            addCartStorage(result,function(){
                alert('添加成功！');
            });
        });
    }

    
});