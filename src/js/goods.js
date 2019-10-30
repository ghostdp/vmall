define(['jquery'],function($){

    
    function goodsInit(parent , data){

        let $parent = $(parent);
        let tmp = `
                <h2 class="goods_title">${data.title}</h2>
                <ul class="goods_list clearfix">
                ${data.goods_list.map(function(v,i){
                    return `<li>
                                <a href="./detail.html?type=${data.type}&id=${v.goodsId}" target="_blank">
                                    <div><img src="${v.goodsImg}" alt=""></div>
                                    <h3>${v.goodsName}</h3>
                                    <p>¥${v.goodsPrice}</p>
                                </a>
                            </li>`;
                }).join('').repeat(3)}
                </ul>
                `;
        $parent.html(tmp);
    }

    return {
        goodsInit
    }

});