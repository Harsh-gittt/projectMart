export let cart = JSON.parse(localStorage.getItem('savedCart')) || [];

// saves cart to localStorage
function saveToStorage () {
    localStorage.setItem('savedCart' , JSON.stringify(cart));
}

// inserts product into cart 
export function insertIntoCart (productId , numOfItems) {
    let isInCart;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            isInCart = cartItem;
        }
    });
    
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

// creates a new cart and copies all cart items into it except deleted item 
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

// updates cart quantity on clicking 'update' button 
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