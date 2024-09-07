generateProducts();

function generateProducts () {
    let procuctHtml = '';

    products.forEach((product , index) => {
        procuctHtml += `
            <div class="product">
                <div class="product-image">
                    <img src="${product.image}" alt="">
                </div>
                <div class="product-name">${product.name}</div>
                <div class="product-rating">${(product.rating).toFixed(1)}⭐</div>
                <div class="product-price">&#8377;${product.price}</div>
                <div class="product-quantity">
                    <select name="product-quantity" id="pq${index + 1}">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
    });
    document.querySelector('.products-container').innerHTML = procuctHtml;
}

