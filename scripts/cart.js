import { cart , removeFromCart , updateCartQuantity , updateDeliveryOption, updateToNewQuantity} from "./cart-data.js";
import { products } from "./products.js";
import { deliveryOption } from "./delivery-options.js";

generateCartItems();

function generateCartItems () {
    displayCartQuantity();

    let html = '';

    cart.forEach((cartItem) => {
        let productId = cartItem.productId;
        let matchingItem;

        products.forEach((product) => {
            if(productId === product.id){
                matchingItem = product;
            }
        });

        let deliveryOptionId = cartItem.deliveryOptionId;

        let selectedOption;

        deliveryOption.forEach((option) => {
            if(option.id === deliveryOptionId){
                selectedOption = option;
            }
        });

        let today = dayjs();
        let deliveryDate = today.add(selectedOption.delay , 'days');
        let dayString = deliveryDate.format('dddd , MMMM D');

        html += `
            <div class="product-in-cart product-num-${cartItem.productId}">
                <h2>Delivery date : ${dayString}</h2>
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
                        
                        ${generateDeliveryOptions(cartItem)}

                    </div>
                </div>
            </div>
        `
    })

    document.querySelector('.cart-body-left').innerHTML = html;

    function generateDeliveryOptions (cartItem) {
        let htmlOptions = '';
        deliveryOption.forEach((option) => {
            let today = dayjs();
            let deliveryDate = today.add(option.delay , 'days');
            let dayString = deliveryDate.format('dddd , MMMM D');
            let priceString = option.price;
    
            priceString = priceString == 0 ? 'FREE' : `&#8377;${priceString} - `;
    
            let isChecked = option.id === cartItem.deliveryOptionId;
    
            htmlOptions += `
                <div class="delivery-date-selection"
                    data-product-id="${cartItem.productId}"
                    data-delivery-option-id="${option.id}"
                    >
                    <input type="radio" name="radio-${cartItem.productId}" id="radio-${cartItem.productId}-option-${option.id}"
                    ${isChecked ? "checked" : ""}>
                    <label for="radio-${cartItem.productId}-option-${option.id}">
                        <div class="delivery-date">
                            ${dayString}
                        </div>
                        <div class="delivery-charge">
                            ${priceString} Shipping
                        </div>
                    </label>
                </div>
            `;
        });
        return htmlOptions;
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
    
    document.querySelectorAll('.delivery-date-selection').forEach((date) => {
        date.addEventListener('click', () => {
            let {productId, deliveryOptionId} = date.dataset;
            updateDeliveryOption(productId , deliveryOptionId);
            generateCartItems();
        });
    });

}

