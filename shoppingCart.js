const productsContainer = document.querySelector('.products');
const totalContainer = document.querySelector('.total');
const totalItems = document.querySelector('.itemsNum');




if (localStorage.getItem('authenticated') === 'false') {
    window.location.href = 'index.html';
}

const products = JSON.parse(window.localStorage.getItem('cart-products'));

// Function to calculate total price
const calculateTotal = () => {
    const total = products.reduce((sum, product) => {
        return sum + (product.price * product.qty);
    }, 0);
    
    // Display total in the UI
    totalContainer.innerHTML = `$${total}`;
};


totalItems.innerHTML = `${products.length > 1 ? `${products.length} items` : `${products.length} item`}`;


const listCartProducts = () => {
    productsContainer.innerHTML = products.map((product, i) =>
        `
            <div class="product">
                <div>
                    <img src="${product.image}" alt="product">
                </div>
                <div class="product-details">
                    <h2 class="name">${product.productName}</h2>
                    <div class="description card-text">${product.description}</div>
                    <div class="price">$${product.price}</div>
                    <div class="counter">
                        <h5 class="plus" data-index="${product.id}">+</h5>
                        <h5 class="count" data-index="${product.id}">${product.qty}</h5>
                        <h5 class="minus" data-index="${product.id}">-</h5>
                    </div>
                </div>
            </div>
        `
    ).join('');
    // After updating the DOM, reassign event listeners
    attachEventListeners();
    calculateTotal();
};

const attachEventListeners = () => {
    const increaseQtyBtn = document.querySelectorAll('.plus');
    const decreaseQtyBtn = document.querySelectorAll('.minus');

    increaseQtyBtn.forEach(increaseButton => {
        increaseButton.addEventListener('click', (e) => {
            const productIndex = products.findIndex(prod => prod.id == e.currentTarget.dataset.index);
            console.log(productIndex);
            products[productIndex].qty += 1;
            
            window.localStorage.setItem('cart-products', JSON.stringify(products));
            listCartProducts();
        });
    });

    decreaseQtyBtn.forEach(decreaseButton => {
        decreaseButton.addEventListener('click', (e) => {
            const productIndex = products.findIndex(prod => prod.id == e.currentTarget.dataset.index);
            console.log(productIndex);
            
            if (products[productIndex].qty > 1) {
                products[productIndex].qty -= 1;
            }
            window.localStorage.setItem('cart-products', JSON.stringify(products));
            listCartProducts();
        });
    });
};

// Initial call to render products and attach event listeners
listCartProducts();


logout.addEventListener('click',() => {
    localStorage.removeItem('userAuthentication');
    localStorage.removeItem('cart-products');
    window.location.href = 'index.html';
    localStorage.setItem('authenticated', 'false');
})
