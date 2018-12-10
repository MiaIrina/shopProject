
import './scss/main.scss';

// console.log('Hello Hacker!');


// require('./modules/hello')('NIT');
// var _foo = require('./modules/hello');
// _foo('user1');
// _foo('user2');
let _makeHtml=require('./modules/products');
let _makeViewOfGood=require('./modules/_detailView');
let _makeCategory=require('./modules/cardGood');
let _makeCart=require('./modules/showCart');
 import 'bootstrap';	// with JS!!
import 'bootstrap/dist/css/bootstrap.min.css';	// only minified CSS
import 'popper.js/dist/umd/popper';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
var cart=[];
$(document).on('click','.dropdown-item',function () {
let desc=$(this).attr('data-name-id');
        let id=$(this).attr('data-cat-id');
        console.log(id);
        $.ajax({
            url: `https://nit.tron.net.ua/api/product/list/category/${id}`,
            method: 'get',
            dataType: 'json',
            success: function(json){
                deleteOpen();
                let doc=$('.definite-products');
                doc.removeClass('collapse');
                doc.addClass('opened');
                doc.empty();
                doc.append($(`<h2 class="h1 m-0 col-12">`).text(desc));
                json.forEach(product => doc.append(_makeHtml(product)));

            },
            error: function(xhr){
                alert("An error occurred: " + xhr.status + " " + xhr.statusText);
            },
        });

});
$(document).on("click",".product-image",function () {
       let id=$(this).attr('data-image-id');
       jQuery.ajax({
           url: `https://nit.tron.net.ua/api/product/${id}`,
           method: 'get',
           dataType: 'json',

           success: function(json){
               deleteOpen();

               let doc=$('.product-details');
               doc.empty();
               doc.append(_makeViewOfGood(json));
               doc.removeClass('collapse');
               doc.addClass('opened');

           },
           error: function(xhr){
               alert("An error occurred: " + xhr.status + " " + xhr.statusText);
           },
       });


});

    function deleteOpen(){
        $('.opened').addClass('collapse');
      $('.opened').removeClass('opened');

    }


$(document).on("click",".all-goods",function () {
    $.ajax({
        url: 'https://nit.tron.net.ua/api/product/list',
        method: 'get',
        dataType: 'json',
        success: function(json){
            deleteOpen();
            let doc=$(".product-grid");
            doc.empty();
            doc.removeClass("collapse");
            doc.addClass("opened");


            json.forEach(product => doc.append(_makeHtml(product)));

        },
        error: function(xhr){
            alert("An error occurred: " + xhr.status + " " + xhr.statusText);
        },
    });
});

$(document).on('click','.add-button',function () {

    let toAdd={
        id:$(this).attr('data-button-id'),
        name:$(this).parent('.body').parent('.product').children('.product-title').text(),
        image_url:$(this).closest('.body').closest('.product').children('.product-image').attr('src'),
        price:$(this).closest('.body').find('.product-price').last().text(),
        number:1,

    };

    addToCart(toAdd);
});
$(document).on("click",".cart-btn",function () {
    showCard();
});
function showCard(){
    let doc=$('.cart');
   load();
   doc.empty();
   deleteOpen();
   doc.addClass('opened');
   doc.removeClass('collapse');
   if(cart.length===0){
       doc.append($(`<p class=" no-goods text-center">`).text("Ваша корзина порожня"));
   }
   else {
       cart.forEach(product => doc.append(_makeCart(product)));
       doc.append($(`<p class="m-0 total-price text-center">`).text("Всього: "+money()+" UAH"));
   doc.append($(`<button class="btn btn-outline-primary d-block order m-auto" type="submit" >`).text("Оформити замовлення"));
   }
}
$(document).on("click",".order",function () {
    let form=$('.submit_order');
    deleteOpen();
    form.addClass("opened");
    form.removeClass("collapse");

});

$(document).on("click",".sub_btn",function (event) {
    event.preventDefault();
    load();
    let name=$(".name").val();
    let mail=$(".mail").val();
    let phone=$(".phone").val();
    if(cart.length===0){
        alert("Ви нічого не замовили!");
        return;
    }
    if(name==null||name===''){
        alert("Введіть ім'я!");
        return;
    }
    if(mail==null||mail===""||mail.indexOf('@')<0){
        alert("Введіть правильний формат почти!(*@*.*)");
        return;
    }
    if(mail.indexOf('@')===mail.length-1){
        alert("Введіть правильний формат почти!(*@*.*)");
        return;
    }

    if(phone===""||phone==null){
        alert("Введіть номер телефону!");
        return;
    }

    for(let i=0;i<phone.length;i++){
        if(isNaN(phone[i])&&phone[i]!=='+'){
            alert("Неправильний формат телефону!");
            return;
        }
    }

let token="2KQbmGAm8c8iK1WlE-0G";
let products="";

for(let i=cart.length-1;i>=0;i--){
    products+=`&products[${cart[i].id}]=${cart[i].number}&`
}
let data="name="+name+"&email="+mail+"&phone="+phone+products+"token="+token;

    $.ajax({
        url: 'https://nit.tron.net.ua/api/order/add',
        method: 'post',
        data:data,
        dataType: 'json',
        success: function(json){
            console.log(json);

alert("Заказ зроблено!");
localStorage.clear();
cart=[];


        },
        error: function(xhr){
            alert("An error occurred: " + xhr.status + " " + xhr.statusText);
        },
    });
});

function money(){
    let mon=0;
    load();
    for(let product of cart){
        mon=mon+ +product.price*product.number;

    }
    return mon;
}
function addToCart(item)
{
load();
let cont=true;
for(let product of cart){
    if(product.id==item.id){
        product.number++;
        cont=false;
        break;
    }
}
if(cont)
cart.push(item);
    save();
}

function save(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
function load(){
    if(localStorage.getItem('cart')){
        cart=JSON.parse(localStorage.getItem('cart'));
    }
}



$(document).on("click",".increase",function () {
    load();
    let id=$(this).attr('data-button-id');
    for(let product of cart){
        if(id==product.id){
            product.number++;
            break;
        }
    }
    save();
    showCard();
});
$(document).on("click",".decrease",function () {
    load();
    let id=$(this).attr('data-button-id');

  for(let product of cart){
      if(product.id==id){
          product.number--;
          if(product.number==0){
              del(id);
          }
          save();
          break;
      }
  }

    showCard();
});
  function del(id){
    for(let product of cart){
        if(id==product.id){
            let index=cart.indexOf(product);
        cart.splice(index,1);
        break;
        }

    }
    save();
}
$(document).on("click",".delete",function () {
    load();
    let id=$(this).attr("data-button-id");
    del(id);
    save();
    showCard();
});
jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/product/list',
    method: 'get',
    dataType: 'json',
    success: function(json){
        addCategory();
        json.forEach(product => $('.product-grid').append(_makeHtml(product)));

    },
    error: function(xhr){
        alert("An error occurred: " + xhr.status + " " + xhr.statusText);
    },
});

function addCategory() {
    $.ajax({
        url: 'https://nit.tron.net.ua/api/category/list',
        method: 'get',
        dataType: 'json',
        success: function(json){
            json.forEach(category => $('.categories').append(_makeCategory(category)));
        },
        error: function(xhr){
            alert("An error occurred: " + xhr.status + " " + xhr.statusText);
        },
    });
}

