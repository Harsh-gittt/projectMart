import { insertIntoCart, updateCartQuantity } from "./cart-data.js";
import { orders } from "./order-data.js";

// generates a single order block 
function generateOrdersHtml() {

    // updates cart icon in nav bar 
    let cartIcon = document.querySelector('.cart-number');
    cartIcon.innerHTML = updateCartQuantity();

    let html = '<h2>Your Orders</h2>';

    orders.forEach((singleOrder) => {
        html += `
            <div class="order-block">
                <div class="order-details">
                    <div class="order-details-right">
                        <div class="order-info">
                            <p class="text1">Order Placed:</p>
                            <p class="text2">${singleOrder.orderPlacedDate}</p>
                        </div>
                        <div class="order-info">
                            <p class="text1">Total:</p>
                            <p class="text2">&#8377;${singleOrder.totalOrderCost}</p>
                        </div>
                    </div>
                    <div class="order-details-left">
                        <div class="order-info">
                            <p class="text1">Order ID:</p>
                            <p class="text2">${singleOrder.orderId}</p>
                        </div>
                    </div>
                </div>

                <div class="item-details">
                    ${generateOneItem(singleOrder.orderedProducts)}
                </div>
            </div>
        `;
    });

    document.querySelector('.orders-body').innerHTML = html;

    // generates one item in one order block
    function generateOneItem(orderedProducts) {
        let oneHtml = '';
        orderedProducts.forEach((product) => {
            oneHtml += `
                <div class="one-item">
                    <div class="left">
                        <div class="item-image">
                            <img src="${product.productImage}" alt="">
                        </div>
                        <div class="item-info">
                            <div class="item-name">${product.productName}</div>
                            <div class="item-delivery-date">Arriving on: ${product.deliveryDate}</div>
                            <div class="item-quantity">Quantity: ${product.quantity}</div>
                            
                        </div>
                    </div>
                    <div class="right">
                        <button class="order-again" data-product-Id="${product.productId}">
                            <i class="ri-loop-left-line"></i> Buy it again
                        </button>
                    </div>
                </div>
            `;
        });
        return oneHtml; // Return the generated HTML for one item
    }

    document.querySelectorAll('.order-again').forEach((orderAgainButton) => {
        orderAgainButton.addEventListener('click' , () => {
            let productId = orderAgainButton.dataset.productId;
            insertIntoCart(productId , 1);
            let cartIcon = document.querySelector('.cart-number');
            cartIcon.innerHTML = updateCartQuantity();
        });
    });

}

generateOrdersHtml();
