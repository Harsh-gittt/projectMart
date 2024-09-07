import {cart , insertIntoCart} from './cart-data.js';
import { products } from './products.js';

generateProducts();

function generateProducts () {
    let procuctHtml = '';

    products.forEach((product , index) => {
        procuctHtml += `
            <div class="product">
                <div class="product-image">
                    <img src="${product.image}" alt="">
                </div>
                <div class="product-name">${product.name}</div>
                <div class="product-rating">${(product.rating).toFixed(1)}⭐</div>
                <div class="product-price">&#8377;${product.price}</div>
                <div class="product-quantity">
                    <select name="product-quantity" id="pq${index + 1}" class="select-items-${product.id}">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div class="added-for-${product.id} added-popup">✅ Added!</div>
                <button class="add-to-cart" data-product-Id="${product.id}">Add to Cart</button>
            </div>
        `;
    });
    document.querySelector('.products-container').innerHTML = procuctHtml;

    document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click' , () => {
            addToCart(button);
        });
    });
}

function updateCartQuantity () {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    let cartIcon = document.querySelector('.cart-number');
    cartIcon.innerHTML = cartQuantity;
}

function addPopup (productId) {
    let addedPopup = document.querySelector(`.added-for-${productId}`);
    addedPopup.classList.add('visible');

    setTimeout(() => {
        addedPopup.classList.remove('visible');
    } , 1000);
}

function addToCart (button) {
    let productId = button.dataset.productId;
    insertIntoCart(productId);
    addPopup(productId);
    updateCartQuantity();
}



