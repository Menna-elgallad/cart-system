"use strict";
let productsdiv = document.querySelector(".products");
let thecart = document.querySelector(".theCart");
let cartbox = document.querySelector(".cartbox");
let cartitems = document.querySelector(".items");
let total = document.querySelector(".total");
let cartnum = document.querySelector(".cartnum");
function renderElements() {
    products.forEach((ele) => {
        productsdiv.innerHTML += `<div class="product">
        <div class="img">
            <img src=${ele.imgsrc} alt="">
            <a href="#" class="add" onclick="addtocart(${ele.id})"><i class="fa-solid fa-cart-plus"></i> </a>
        </div>
        <div class="text">
            <h6>${ele.name}</h6>
            <p style="color:#777"> Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            <h6>${ele.price} EGP</h6>
            
        </div>
    </div>
</div>`;
    });
}
renderElements();
let myCart = [];
let local = localStorage.getItem("cart");
if (typeof local === "string") {
    myCart = JSON.parse(local);
    update();
}
function addtocart(id) {
    if (myCart.some((ele) => ele.id === id)) {
        changenumber("plus", id);
    }
    else {
        let item = products.find((ele) => ele.id === id);
        myCart.push(Object.assign(Object.assign({}, item), { num: 1 }));
        console.log(myCart);
    }
    let added = document.createElement("div");
    let text = document.createTextNode("item added");
    added.className = "added";
    added.appendChild(text);
    document.body.appendChild(added);
    setTimeout(() => {
        added.style.display = "none";
    }, 1000);
    update();
}
function update() {
    rendercart();
    totalcount();
    localStorage.setItem("cart", JSON.stringify(myCart));
}
function totalcount() {
    let totalprice = 0, totalnum = 0;
    myCart.forEach((ele) => {
        totalprice += ele.price * ele.num;
        totalnum += ele.num;
    });
    total.innerHTML = `Total price : <b>${totalprice} EGP </b> `;
    cartnum.innerHTML = `${totalnum}`;
}
function rendercart() {
    cartitems.innerHTML = "";
    myCart.forEach((ele) => {
        cartitems.innerHTML += `<div class="cartitem d-flex">
    <div class="part1 d-flex " style="gap: 10px;">
        <div class="cartimg">
            <img src=${ele.imgsrc}>
            
        </div>
        <div class="data">
            <p>${ele.name}</p>
            <p>${ele.price}EGP</p>
        </div>
    </div>
  
  <div class="quantity ">
  <div class="inc d-flex"> <span class="increment" onclick="changenumber('plus' , ${ele.id})"><i class="fa-solid fa-plus"></i></span>
  <span class="number">${ele.num} </span>
  <span class="increment" onclick="changenumber('minus' , ${ele.id})"><i class="fa-solid fa-minus"></i></span> </div>

    <span class="remove" onclick="remove(${ele.id})">Remove</span>
  </div>
</div>`;
    });
}
function remove(id) {
    let myCart2 = myCart.filter((ele) => {
        return ele.id !== id;
    });
    myCart = myCart2;
    update();
}
function changenumber(act, id) {
    myCart = myCart.map((ele) => {
        let numofitems = ele.num;
        if (ele.id === id) {
            if (act === "plus" && numofitems) {
                numofitems++;
            }
            else if (act === "minus" && numofitems > 1) {
                numofitems--;
            }
        }
        return Object.assign(Object.assign({}, ele), { num: numofitems });
    });
    update();
}
thecart.onclick = () => {
    cartbox.classList.toggle("hide");
};
