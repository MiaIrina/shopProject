

let _makeCart = ({
                     id,
                     name,
                     image_url,
                     price,
                     number

                 }) => {
    let $buy=$(`<div class="col-sm-12 col-lg-6 col-md-3 cart-box card">`);
    let $row=$(`<div class="card-body text-center">`);
    $row.append($(`<span  class="text-center card-title d-block">`).text(name));
    $row.append($(`<img src="${image_url}" class=" product-image   cart-image" data-image-id="${id}">`));
    $row.append($(`<span  class="text-center product-price d-block ">`).text(price));
    let $pricediv=$(`<div class="price_div ">`);
    $pricediv.append($(`<button class="btn btn-sm decrease" data-button-id="${id}">`).append($(`<img src="image/minus.png">`)));
    $pricediv.append($(`<span class="number ">`).text(number));
    $pricediv.append($(`<button class="btn btn-sm increase" data-button-id="${id}">`).append($(`<img src="image/plus.png">`)));
    $row.append($pricediv);
    $row.append($(`<button  class="btn delete btn-outline-dark " data-button-id="${id}">`).append($(`<img src="image/rubbish-bin.png">`)));
    $buy.append($row);
    return $buy;
};
module.exports=_makeCart;