import { cart } from "./cart-data.js";
import { products } from "./products.js";

generateCartItems();

function generateCartItems () {
    let html = '';

    cart.forEach((cartItem) => {
        let productId = cartItem.productId;
        let matchingItem;

        products.forEach((product) => {
            if(productId === product.id){
                matchingItem = product;
            }
        });

        html += `
            <div class="product-in-cart">
                <h2>Delivery date : Saturday , September 14</h2>
                <div class="cart-product-flex">
                    <div class="cart-product-details">
                        <div class="cart-product-image">
                            <img src="${matchingItem.image}" alt="">
                        </div>
                        <div class="cart-product-info">
                            <div class="cart-product-name">
                                ${matchingItem.name}
                            </div>
                            <div class="cart-product-price">
                                &#8377;${matchingItem.price}
                            </div>
    
                            <div class="cart-product-actions">
                                <div class="cart-product-quantity">
                                    Quantity : ${cartItem.quantity}
                                </div>
                                <div class="cart-product-update cart-product-feature">
                                    Update
                                </div>
                                <div class="cart-product-delete cart-product-feature">
                                    Delete
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div class="cart-delivery-details">
                        <h3>Choose a delivery option</h3>
                        <div class="delivery-date-selection">
                            <input type="radio" name="radio1" id="radio1-option1">
                            <label for="radio1-option1">
                                <div class="delivery-date">
                                    Saturday , September 14
                                </div>
                                <div class="delivery-charge">
                                    FREE Shipping
                                </div>
                            </label>
                        </div>
    
                        <div class="delivery-date-selection">
                            <input type="radio" name="radio1" id="radio1-option2">
                            <label for="radio1-option2">
                                <div class="delivery-date">
                                    Thursday , September 12
                                </div>
                                <div class="delivery-charge">
                                    &#8377;50 - Shipping
                                </div>
                            </label>
                        </div>
    
                        <div class="delivery-date-selection">
                            <input type="radio" name="radio1" id="radio1-option3">
                            <label for="radio1-option3">
                                <div class="delivery-date">
                                    Tuesday , September 10
                                </div>
                                <div class="delivery-charge">
                                    &#8377;100 - Shipping
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `
    })

    document.querySelector('.cart-body-left').innerHTML = html;
}