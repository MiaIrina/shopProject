
let _makeViewOfGood = ({
                           id,
                           name,
                           image_url,
                           description,
                           price,
                           special_price
                       }) => {
    let $product = $(`<div class=" col-md-6 col-sm-12 col-lg-4 detail_div product " data-product-id="${id}">`);
    $product.append($(`<img  src="${image_url}" alt="${name}" data-image-id="${id}"  class=" product-image-detail product-image image">`));
    $product.append($(`<span class="product-title">`).text(name));
    let $block=$(`<div class="text-center body">`);
    if(special_price==null){
        $block.append($(`<h2 class="product-price ">`).text(price));
    }
    else{
        $block.append($(`<span class="product-price strike">`).text(price));
        $block.append($(`<span class="product-price  special">`).text(special_price));
    }
    $block.append($(`<p class="product-description ">`).text(description));
    $block.append($(`<button class="btn add-button d-block btn-outline-dark"  data-button-id="${id}" type="button" >`).append($(`<img src="image/shopping-cart.png">`)));
    $product.append($block);
    return $product;
};
module.exports=_makeViewOfGood;