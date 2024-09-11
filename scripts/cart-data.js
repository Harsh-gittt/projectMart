export let cart = JSON.parse(localStorage.getItem('savedCart')) || [];

function saveToStorage () {
    localStorage.setItem('savedCart' , JSON.stringify(cart));
}

export function insertIntoCart (productId) {
    let isInCart;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            isInCart = cartItem;
        }
    });

    let numOfItems = document.querySelector(`.select-items-${productId}`).value;
    
    if(isInCart){
        isInCart.quantity += Number(numOfItems);
    }
    else{
        cart.push(
            {
                productId : productId,
                quantity : Number(numOfItems),
                deliveryOptionId : '1'
            }
        )
    }

    saveToStorage();
}

export function removeFromCart (productId) {
    let newCart = [];

    cart.forEach((cartItem) => {
        if(productId !== cartItem.productId){
            newCart.push(cartItem);
        }
    });

    cart =newCart;
    saveToStorage();
}

export function updateCartQuantity () {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

export function updateToNewQuantity (productId , newQuantity) {
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            cartItem.quantity = newQuantity;
        }
    });
    saveToStorage();
}

export function updateDeliveryOption (productId , deliveryOptionId) {
    let isInCart;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            isInCart = cartItem;
        }
    });

    isInCart.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}

export function emptyCart () {
    cart = [];
    saveToStorage();
}