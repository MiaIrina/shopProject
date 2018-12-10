

let _makeHtml = ({
                     id,
                     name,
                     image_url,
                     description,
                     price,
                     special_price
                 }) => {
    let $product = $(`<div class="card col-xs-12 col-sm-4 col-md-4  product " data-product-id="${id}">`);
    $product.append($(`<img  src="${image_url}" alt="${name}" data-image-id="${id}"  class=" product-image card-img-top">`));
    $product.append($(`<span class="product-title card-title">`).text(name));
let $block=$(`<div class="card-body body d-flex flex-column">`);
    if(special_price==null){
        $block.append($(`<span class="product-price ">`).text(price));
    }
    else{

        $block.append($(`<span class="product-price strike ">`).text(price));
        $block.append($(`<span class="product-price  special ">`).text(special_price));
    }
    $block.append($(`<button class="btn add-button d-block btn-outline-dark mt-auto"  data-button-id="${id}" type="button" >`).append($(`<img src="image/shopping-cart.png">`)));
 $product.append($block);
    return $product;
};
module.exports=_makeHtml;