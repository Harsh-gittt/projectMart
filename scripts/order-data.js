export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function createOrder (cart , products , deliveryOption) {
    // Generate the order details
    let today = dayjs();
    let orderPlacedDate = today.format('YYYY-MM-DD');
    let totalOrderCost = calculateTotalOrderCost();
    let orderId = generateUniqueOrderId();

    // Create the orderedProducts object
    let orderedProducts = cart.map((cartItem) => {
        let matchingProduct;
        products.forEach((product) => {
            if (product.id === cartItem.productId) {
                matchingProduct = product;
            }
        });

        let selectedOption;
        deliveryOption.forEach((option) => {
            if (option.id === cartItem.deliveryOptionId) {
                selectedOption = option;
            }
        });

        let deliveryDate = today.add(selectedOption.delay, 'days').format('dddd , MMMM DD');

        return {
            productId: matchingProduct.id,
            productName: matchingProduct.name,
            productImage: matchingProduct.image,
            deliveryDate: deliveryDate,
            quantity: cartItem.quantity,
        };
    });

    // Create the final order object
    let order = {
        orderPlacedDate: orderPlacedDate,
        totalOrderCost: totalOrderCost,
        orderId: orderId,
        orderedProducts: orderedProducts
    };

    // Push the order into the orders array
    orders.unshift(order);

    // Save the orders array to local storage
    localStorage.setItem('orders', JSON.stringify(orders));

    // redirects to orders page 
    window.location.href = 'orders.html'

    function calculateTotalOrderCost() {
        let itemsCost = 0;
        let shippingCost = 0;
    
        cart.forEach((cartItem) => {
            let matchingProduct;
            let matchingDeliveryOption;
    
            products.forEach((product) => {
                if (product.id === cartItem.productId) {
                    matchingProduct = product;
                }
            });
    
            itemsCost += matchingProduct.price * cartItem.quantity;
    
            deliveryOption.forEach((option) => {
                if (option.id === cartItem.deliveryOptionId) {
                    matchingDeliveryOption = option;
                }
            });
    
            shippingCost += matchingDeliveryOption.price;
        });
    
        let costBeforeTax = itemsCost + shippingCost;
        let tax = costBeforeTax * 0.1;
        return costBeforeTax + tax;
    }
    
    // function to generate a unique order ID
    function generateUniqueOrderId() {
        return 'ORDER-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
}


