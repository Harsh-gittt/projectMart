import { cart , removeFromCart , updateCartQuantity , updateToNewQuantity} from "./cart-data.js";
import { products } from "./products.js";

generateCartItems();
displayCartQuantity();

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
            <div class="product-in-cart product-num-${cartItem.productId}">
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
                                <div class="cart-product-quantity quantity-for-${cartItem.productId}">
                                    Quantity : ${cartItem.quantity}
                                </div>
                                <div class="cart-product-update cart-product-feature" data-update-Id="${cartItem.productId}">
                                    Update
                                </div>
                                <input type="text" class="quantity-input value-for-${cartItem.productId}">
                                <span class="save-quantity cart-product-feature" data-save-Id="${cartItem.productId}">Save</span>
                                <div class="cart-product-delete cart-product-feature" data-delete-Id="${cartItem.productId}">
                                    Delete
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div class="cart-delivery-details">
                        <h3>Choose a delivery option</h3>
                        <div class="delivery-date-selection">
                            <input type="radio" name="radio-${cartItem.productId}" id="radio-${cartItem.productId}-option1">
                            <label for="radio-${cartItem.productId}-option1">
                                <div class="delivery-date">
                                    Saturday , September 14
                                </div>
                                <div class="delivery-charge">
                                    FREE Shipping
                                </div>
                            </label>
                        </div>
    
                        <div class="delivery-date-selection">
                            <input type="radio" name="radio-${cartItem.productId}" id="radio-${cartItem.productId}-option2">
                            <label for="radio-${cartItem.productId}-option2">
                                <div class="delivery-date">
                                    Thursday , September 12
                                </div>
                                <div class="delivery-charge">
                                    &#8377;50 - Shipping
                                </div>
                            </label>
                        </div>
    
                        <div class="delivery-date-selection">
                            <input type="radio" name="radio-${cartItem.productId}" id="radio-${cartItem.productId}-option3">
                            <label for="radio-${cartItem.productId}-option3">
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

function displayCartQuantity () {
    let cartIcon = document.querySelector('.cart-number');
    cartIcon.innerHTML = updateCartQuantity();

    let checkOutItems = document.querySelector('.number-of-items');
    checkOutItems.innerHTML = `${updateCartQuantity()} items`;
}

document.querySelectorAll('.cart-product-delete').forEach((button) => {
    button.addEventListener('click', () => {
        let productId = button.dataset.deleteId;
        removeFromCart(productId);
        let toDelete = document.querySelector(`.product-num-${productId}`);
        toDelete.remove();
        displayCartQuantity();
    });
});

document.querySelectorAll('.cart-product-update').forEach((button) => {
    button.addEventListener('click', () => {
        let productId = button.dataset.updateId;
        let toUpdate = document.querySelector(`.product-num-${productId}`);
        toUpdate.classList.add('is-editing-quantity');
    });
});

document.querySelectorAll('.save-quantity').forEach((button) => {
    button.addEventListener('click', () => {
        let productId = button.dataset.saveId;
        let toSave = document.querySelector(`.product-num-${productId}`);
        let newQuantity = document.querySelector(`.value-for-${productId}`).value;

        if(newQuantity > 0 && newQuantity <100){
            toSave.classList.remove('is-editing-quantity');
        updateToNewQuantity(productId , Number(newQuantity))
        document.querySelector(`.quantity-for-${productId}`).innerHTML = `Quantity : ${newQuantity}`;
        displayCartQuantity();
        }

        else{
            alert('Invalid Quantity');
        }
        
    });
});