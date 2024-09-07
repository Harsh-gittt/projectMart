export let cart = JSON.parse(localStorage.getItem('savedCart')) || [
    // {
    //     productId : 'product-1',
    //     quantity : 1
    // },
    // {
    //     productId : 'product-2',
    //     quantity : 2
    // }
];

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