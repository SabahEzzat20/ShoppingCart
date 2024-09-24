const productsContainer = document.querySelector('.products');
const totalContainer = document.querySelector('.total');
const totalDetails = document.querySelector('.total-details');
const totalItems = document.querySelector('.itemsNum');



if (localStorage.getItem('authenticated') === 'false') {
    window.location.href = 'index.html';
}

const products = JSON.parse(window.localStorage.getItem('cart-products'));

// Function to calculate total price
const calculateTotal = () => {
    if (products.length < 1) {
        totalDetails.style.display = 'none'; 
        return;
    }
    const total = products.reduce((sum, product) => {
        return sum + (product.price * product.qty);
    }, 0);
    
    // Display total in the UI
    totalContainer.innerHTML = `$${total}`;
};


totalItems.innerHTML = `${products.length > 1 ? `${products.length} items` : `${products.length} item`}`;


const listCartProducts = () => {
    if (products.length < 1) {
        productsContainer.innerHTML = `<h2 class='empty-txt'>Cart is empty!</h2>`;
        totalDetails.style.display = 'none'; 
        return;
    } else {
        productsContainer.innerHTML = products.map((product, i) =>
            `
            <div class="product">
                <div class='prod'>
                    <div>
                        <img src="${product.image}" alt="product">
                    </div>
                    <div class="product-details">
                        <div class="product-name">
                            <h5 class="name">${product.productName}</h5>
                            <h5 class="price">$${product.price}</h5>
                        </div>
                        <div class="description card-text">${product.description}</div>
                        <div class="counter">
                            <h5 class="plus" role='button' data-index="${product.id}">+</h5>
                            <h5 class="count" data-index="${product.id}">${product.qty}</h5>
                            <h5 class="minus" role='button' data-index="${product.id}">-</h5>
                        </div>
                    </div>
                </div>
                <button class="remove-product-btn" data-index=${product.id} title="Remove item">
                    <i class="fa-solid fa-x"></i>
                </button>
            </div>
            `
        ).join('');
    }
    // After updating the DOM, reassign event listeners
    attachEventListeners();
    attachRemoveEventListeners();
    calculateTotal();
};
// Function to attach event listeners to remove product buttons
const attachRemoveEventListeners = () => {
    const removeProductButtons = document.querySelectorAll('.remove-product-btn');
    removeProductButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const productIndex = products.findIndex(prod => prod.id == e.currentTarget.dataset.index);            
            if (productIndex !== -1) {
                products.splice(productIndex, 1); // Remove product from array
                window.localStorage.setItem('cart-products', JSON.stringify(products)); // Update localStorage
                listCartProducts(); // Re-render the products list
            }
        });
    });
};


const attachEventListeners = () => {
    const increaseQtyBtn = document.querySelectorAll('.plus');
    const decreaseQtyBtn = document.querySelectorAll('.minus');

    increaseQtyBtn.forEach(increaseButton => {
        increaseButton.addEventListener('click', (e) => {
            const productIndex = products.findIndex(prod => prod.id == e.currentTarget.dataset.index);
            products[productIndex].qty += 1;
            
            window.localStorage.setItem('cart-products', JSON.stringify(products));
            listCartProducts();
        });
    });

    decreaseQtyBtn.forEach(decreaseButton => {
        decreaseButton.addEventListener('click', (e) => {
            const productIndex = products.findIndex(prod => prod.id == e.currentTarget.dataset.index);
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
