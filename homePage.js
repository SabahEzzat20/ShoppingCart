const CartProductsNumber = document.querySelector('.cart-products-number');
const logout = document.getElementById('logout');
const productsContainer = document.getElementById('products-container');
const cartBtn = document.getElementById('cart');


const products = [
    {
        id: 1,
        qty: 0,
        productName: "Shaan gel cleanser",
        image: "./images/Shaan Antioxidant Facial Cleanser 250 ml.jpeg",
        price: "114",
        description: "shaan facial cleanser contains hydrating & cleansing ingredients"
    },
    {
        id: 2,
        qty: 0,
        productName: "Starville cleanser",
        image: "./images/Starville Acne Prone Skin Facial Cleanser For Oily And Combined Skin 200 Ml.jpeg",
        price: "200",
        description: "shaan facial cleanser contains hydrating & cleansing ingredients"
    },
    {
        id: 3,
        qty: 0,
        productName: "Dermactive cleanser",
        image: "./images/Dermactive Acti White Foaming Gel Remove Impurities & Color Uniformity 200ml.jpeg",
        price: "148",
        description: "shaan facial cleanser contains hydrating & cleansing ingredients"
    },
    {
        id: 4,
        qty: 0,
        productName: "Eva body lotion",
        image: "./images/download.jpeg",
        price: "100",
        description: "shaan facial cleanser contains hydrating & cleansing ingredients"
    },
    {
        id: 5,
        qty: 0,
        productName: "Himalaya cleanser",
        image: "./images/download (1).jpeg",
        price: "85",
        description: "shaan facial cleanser contains hydrating & cleansing ingredients"
    },
    {
        id: 6,
        qty: 0,
        productName: "Luna lip therapy",
        image: "./images/Luna Emollient Lip Therapy 10 Ml.jpeg",
        price: "35",
        description: "shaan facial cleanser contains hydrating & cleansing ingredients"
    },
    {
        id: 7,
        qty: 0,
        productName: "Avuva shea butter",
        image: "./images/0000532_raw-shea-butter.webp",
        price: "150",
        description: "shaan facial cleanser contains hydrating & cleansing ingredients"
    },
    {
        id: 8,
        qty: 0,
        productName: "Avuva body butter",
        image: "./images/0000647_body-butter-passion-fruit.png.webp",
        price: "250",
        description: "shaan facial cleanser contains hydrating & cleansing ingredients"
    },
    {
        id: 9,
        qty: 0,
        productName: "Eva shower cream",
        image: "./images/R.png",
        price: "65",
        description: "shaan facial cleanser contains hydrating & cleansing ingredients"
    },
    {
        id: 10,
        qty: 0,
        productName: "Starville deodorant",
        image: "./images/deodorant.jpg",
        price: "65",
        description: "shaan facial cleanser contains hydrating & cleansing ingredients"
    },
]

productsContainer.innerHTML = products.map((product,i) =>
    `
        <div class="card col-lg-3 col-md-4 col-sm-6 col-xs-12 product-catalog d-flex justify-content-between align-items-center flex-column gap-2 border-0" >
            <img src="${product.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <div class="d-flex align-items-center justify-content-between gap-2">
                <h6 class="card-title">${product.productName}</h6>
                <h4>$${product.price}</h4>
            </div>
            <p class="card-text">${product.description}</p>
            <a class="btn btn-success add-to-cart" data-product-index="${i+1}">Add to cart</a>
            </div>
        </div>
    `
).join('');


const addToCartButtons = document.querySelectorAll('.add-to-cart');



const badge = () => {
    const cartProducts = JSON.parse(window.localStorage.getItem('cart-products'));
        CartProductsNumber.innerHTML = cartProducts ? cartProducts.length : 0;
}


badge();
addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); 
        const productIndex = button.getAttribute('data-product-index');
        const productAddedToCart = products.find(product => product.id == productIndex);
        addProductToCart(productAddedToCart);
        badge();
        setTimeout(() => {            
            const alertDiv = document.createElement('div'); 
            alertDiv.innerHTML = `
                <div class="alert alert-success" style="position: fixed; right:10px;bottom:10px;" role="alert">
                    Product added to cart successfully!
                </div>`;
            document.body.appendChild(alertDiv); 
            setTimeout(() => {
                alertDiv.remove();
            }, 2000);
        }, 10);
    });
});



cartBtn.addEventListener('click', () => {
    if(localStorage.getItem('authenticated'))
        window.location.href = 'shoppingCart.html';
})

const addProductToCart = (product) => {
    let products = returnCartProducts();
    if (!products) {
        products = [];
    }
    const matchedProduct = products.find(prod => prod.id == product.id);
    if (matchedProduct === undefined) {
        product.qty += 1;
        products.push(product);
    } else {
        const productIndex = products.findIndex(prod => prod.id === product.id);
        products[productIndex].qty += 1;
    }
    window.localStorage.setItem('cart-products',JSON.stringify(products))
}

const returnCartProducts = () => {
    return JSON.parse(window.localStorage.getItem('cart-products'));
}

if (localStorage.getItem('authenticated') === 'false') {
    window.location.href = 'index.html';
}
logout.addEventListener('click',() => {
    localStorage.removeItem('userAuthentication');
    window.location.href = 'index.html';
    localStorage.setItem('authenticated', 'false');
})



// localStorage.removeItem('cart-products')