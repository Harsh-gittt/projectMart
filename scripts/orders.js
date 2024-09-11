import { orders } from "./order-data";

function generateOrdersHtml () {
    let html = ''

    orders.forEach((singleOrder) => {
        html += `
            <div class="order-block">
                <div class="order-details">
                    <div class="order-details-right">
                        <div class="order-info">
                            <p class="text1">
                                Order Placed:
                            </p>
                            <p class="text2">
                                ${singleOrder.orderPlaceDate}
                            </p>
                        </div>
                        <div class="order-info">
                            <p class="text1">
                                Total:
                            </p>
                            <p class="text2">
                                &#8377;${singleOrder.totalOrderCost}
                            </p>
                        </div>
                    </div>
                    <div class="order-details-left">
                        <div class="order-info">
                            <p class="text1">
                                Order ID:
                            </p>
                            <p class="text2">
                                ${singleOrder.orderId}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="item-details">
                    ${generateOneItem()}
                </div>
            </div>
        `

        function generateOneItem () {
            let oneHtml = '';
            singleOrder.orderedProducts.forEach((product) => {
                oneHtml += `
                    <div class="one-item">
                        <div class="left">
                            <div class="item-image">
                                <img src="${product.productImage}" alt="">
                            </div>
                            <div class="item-info">
                                <div class="item-name">
                                    ${product.productName}
                                </div>
                                <div class="item-delivery-date">
                                    Arriving on: ${product.deliveryDate}
                                </div>
                                <div class="item-quantity">
                                    Quantity: ${product.quantity}
                                </div>
                                <button class="order-again">
                                    <i class="ri-loop-left-line"></i>
                                    Buy it again
                                </button>
                            </div>
                        </div>
                        <div class="right">
                            <button class="track-package">
                                Track package
                            </button>
                        </div>
                    </div>
                `
            })
        }
    })

    document.querySelector('.orders-body').innerHTML = html;
}

