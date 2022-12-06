
const prod = document.querySelector(".products");
const cartItem = document.querySelector(".cart-items");
const totalEl = document.querySelector(".subtotal");
const totalInCart = document.querySelector(".total-in-cart");

// RENDER
function renderProd() {
  products.forEach((product) => {
    prod.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./icons/heart.png" alt="add to wish">
                    </div>
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        <img src="./icons/add-cart.svg" alt="add to cart">
                    </div>
                </div>
            </div>
        `;
  });
}
renderProd();

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

function addToCart(id) {

  if (cart.some((item) => item.id === id)) {
    changeUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  totalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
  totalInCart.innerHTML = totalItems;
}

// render cart
function renderCartItems() {
  cartItem.innerHTML = "";
  cart.forEach((item) => {
    cartItem.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onclick="removeFromCart(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeUnits('plus', ${item.id})">+</div>           
            </div>
        </div>
      `;
  });
}

// remove from cart
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// change number
function changeUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}
