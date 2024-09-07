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
    })

    let numOfItems = document.querySelector(`.select-items-${productId}`).value;
    
    if(isInCart){
        isInCart.quantity += Number(numOfItems);
    }
    else{
        cart.push(
            {
                productId : productId,
                quantity : Number(numOfItems)
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