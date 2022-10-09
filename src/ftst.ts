
let productsdiv= document.querySelector(".products") as HTMLDivElement;
let thecart = document.querySelector(".theCart")as HTMLDivElement;
let cartbox = document.querySelector(".cartbox") as HTMLDivElement;
let cartitems = document.querySelector(".items") as HTMLDivElement;
let total = document.querySelector(".total") as HTMLParagraphElement;
let cartnum = document.querySelector(".cartnum") as HTMLSpanElement;

function renderElements() {
  products.forEach((ele : {id: number ,name: string, imgsrc: string ,price: string;}) => {
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
let myCart: any[] = []
let local = localStorage.getItem("cart")
if (typeof local === "string" ){
    myCart = JSON.parse( local);
    update();
}


function addtocart(id: any) {
  if (myCart.some((ele: { id: number; }) => ele.id === id)) {
    changenumber("plus", id);
  } else {
    let item = products.find((ele) => ele.id === id);
    myCart.push({ ...item, num: 1 });
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
  let totalprice = 0,
    totalnum = 0;
  myCart.forEach((ele: { price: number; num: number; }) => {
    totalprice += ele.price * ele.num;
    totalnum += ele.num;
  });
  total.innerHTML = `Total price : <b>${totalprice} EGP </b> `;
  cartnum.innerHTML = `${totalnum}`;
}

function rendercart() {
  cartitems.innerHTML = "";
  myCart.forEach((ele: { imgsrc:string; name: string; price:number; id:number; num: number; }) => {
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

function remove(id: number) {
  let myCart2 = myCart.filter((ele: { id: number; }) => {
    return ele.id !== id;
  });
  myCart = myCart2;
  update();
}

function changenumber(act: string, id: any) {
  myCart = myCart.map((ele: { num: any; id: any; }) => {
    let numofitems = ele.num;
    if (ele.id === id) {
      if (act === "plus" && numofitems) {
        numofitems++;
      } else if (act === "minus" && numofitems > 1) {
        numofitems--;
      }
    }
    return {
      ...ele,
      num: numofitems,
    };
  });
  update();
}

thecart.onclick = () => {
  cartbox.classList.toggle("hide");
};
