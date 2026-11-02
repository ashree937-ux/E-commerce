const productContainer = document.querySelector('.product-container'); 
console.log(productContainer);

function updateCount() {
    const cartCount = document.querySelector('#cart-count');
    const total =  cart.reduce((acc, curr) => {
        return acc + curr.quantity; 
    },0);
    cartCount.textContent = total; 
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.name;
    productImage.classList.add('product-image');
    productCard.append(productImage);

    const productName = document.createElement('h3');
    productName.textContent = product.name;
    productCard.append(productName);

    const reviewContainer = document.createElement('div');
    reviewContainer.classList.add('review-container');
    const productRating = document.createElement('p');
    productRating.textContent = `⭐ ${product.rating}`;
    const productReviews = document.createElement('p');
    productReviews.textContent = `(${product.reviews} reviews)`;
    reviewContainer.append(productRating, productReviews);
    productCard.append(reviewContainer);

    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container');
    const productOriginalPrice = document.createElement('p');
    productOriginalPrice.textContent = `₹${product.originalPrice}`;
    productOriginalPrice.classList.add('original-price');
    const productPrice = document.createElement('p');
    productPrice.textContent = `₹${product.price}`;
    productPrice.classList.add('product-price');
    const productDiscount = document.createElement('p');
    const discountPercentage = calculateDiscount(product.originalPrice, product.price);
    productDiscount.textContent = `(${discountPercentage}% off)`;
    priceContainer.append(productOriginalPrice, productPrice, productDiscount);
    productCard.append(priceContainer);

    const actionContainer = document.createElement('div');
    actionContainer.classList.add('action-container');
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.classList.add('add-to-cart-button');

    addToCartButton.addEventListener("click" , () => {
        addToCart(product);
        updateCount();
        renderCart();
    });

    const wishList = document.createElement('button');
    wishList.textContent = '♡';
    wishList.classList.add('wishlist-button');
    actionContainer.append(addToCartButton, wishList);
    productCard.append(actionContainer);

    productContainer.append(productCard);
}

function renderCart() {
    const itemsInCart = document.querySelector('.cart-items');
    itemsInCart.textContent = '';

    let subTotal = 0;

    cart.forEach(item => {
        const itemId = item.id;
        const foundProduct = products.find(product => product.id === itemId)
        
        const productCardCart = document.createElement('div');
        productCardCart.classList.add('product-card-cart');

        const productImageCart = document.createElement('img');
        productImageCart.src = foundProduct.image;
        productImageCart.alt = foundProduct.name;
        productImageCart.classList.add('product-image-cart');
        productCardCart.append(productImageCart);

        const productNameCart = document.createElement('h3');
        productNameCart.textContent = foundProduct.name;
        productCardCart.append(productNameCart);

        const productPriceCart = document.createElement('p');
        productPriceCart.textContent = `₹${foundProduct.price}`;
        productPriceCart.classList.add('product-price-cart');
        productCardCart.append(productPriceCart);

        const itemTotal = document.createElement('p');
        const total = calculateItemTotal(foundProduct.price, item.quantity);
        itemTotal.textContent = `Item Total: ₹${total}`;
        productCardCart.append(itemTotal);

        const actionContainer = document.createElement('div');
        actionContainer.classList.add('cart-action-container');
        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        const productQuantity = document.createElement('p');
        productQuantity.textContent = `${item.quantity}`;
        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        
        plusButton.addEventListener("click", () => {
            addItems(foundProduct.stock, item);
            updateCount();
            renderCart();
        });

        minusButton.addEventListener("click", () => {
            removeItems(item);
            updateCount();
            renderCart();
        });

        actionContainer.append(minusButton,productQuantity,plusButton);
        productCardCart.append(actionContainer);

        const removeItem = document.createElement('button');
        removeItem.textContent = 'Remove Product';
        removeItem.addEventListener("click", () => {
            removeFromCart(item.id);
            updateCount();
            renderCart();
        });
        productCardCart.append(removeItem);

        subTotal += total; 

        itemsInCart.append(productCardCart);
    });

    const cartSubTotal = document.querySelector('#cart-value');
    cartSubTotal.textContent = '₹' + subTotal;  
}

products.forEach(currentelement => {
    createProductCard(currentelement);
});

const cartButton = document.querySelector('.cart-button');
const cartDrawer = document.querySelector('.cart');
const closeButton = document.querySelector('.close-button');
const cartOverlay = document.querySelector('.cart-overlay');

if (cartButton && cartDrawer) {
    cartButton.addEventListener('click', () => {
        openCart();
    });
}

if (closeButton && cartDrawer) {
    closeButton.addEventListener('click', () => {
        closeCart();
    });
}

if (cartOverlay && cartDrawer) {
    cartOverlay.addEventListener('click', () => {
        closeCart();
    });
}

