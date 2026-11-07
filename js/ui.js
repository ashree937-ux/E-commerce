const productContainer = document.querySelector('.product-container'); 

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
        element.classList.add(className);
    }
    if (text !== undefined) {
        element.textContent = text;
    }
    return element;
}

function createButton(text, className, onClick) {
    const button = createElement('button', className, text);
    button.addEventListener('click', onClick);
    return button;
}

function updateWishlistButton(button, productId) {
    const isWishlisted = wishlist.includes(productId);
    button.classList.toggle('wishlisted', isWishlisted);
    button.textContent = isWishlisted ? '♥' : '♡';
}

function refreshCartUI() {
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const cartCount = document.querySelector('#cart-count');
    const total =  cart.reduce((acc, curr) => {
        return acc + curr.quantity; 
    },0);
    cartCount.textContent = total; 
}

function updateWishlistCount() {
    const total = wishlist.length;
    const wishlistCount = document.querySelector('#wishlist-count');
    wishlistCount.textContent = total;
}

function refreshWishlistUI() {
    updateWishlistCount();
    renderWishlist();
    const wishlistButtons = document.querySelectorAll('.heart-button');
    wishlistButtons.forEach(button => {
        const productId = parseInt(button.dataset.productId);
        updateWishlistButton(button, productId);
    });
}

function createProductCard(product) {
    const productCard = createElement('div', 'product-card');

    const productImage = createElement('img', 'product-image');
    productImage.src = product.image;
    productImage.alt = product.name;

    const productName = createElement('h3', '', product.name);

    const reviewContainer = createElement('div', 'review-container');
    const productRating = createElement('p', '', `⭐ ${product.rating}`);
    const productReviews = createElement('p', '', `(${product.reviews} reviews)`);
    reviewContainer.append(productRating, productReviews);

    const priceContainer = createElement('div', 'price-container');
    const productOriginalPrice = createElement('p', 'original-price', `₹${product.originalPrice}`);
    const productPrice = createElement('p', 'product-price', `₹${product.price}`);
    const discountPercentage = calculateDiscount(product.originalPrice, product.price);
    const productDiscount = createElement('p', '', `(${discountPercentage}% off)`);
    priceContainer.append(productOriginalPrice, productPrice, productDiscount);

    const actionContainer = createElement('div', 'action-container');
    const addToCartButton = createButton('Add to Cart', 'add-to-cart-button', () => {
        addToCart(product);
        refreshCartUI();
        showToast(`${product.name} has been added to the cart.`);
    });

    const wishList = createButton('♡', 'heart-button', () => {
        toggleWishlist(product.id);
        refreshWishlistUI();
        showToast(`${product.name} has been ${wishlist.includes(product.id) ? 'wishlisted.' : 'removed from wishlist'}`);
    });
    wishList.dataset.productId = product.id;
    actionContainer.append(addToCartButton, wishList);
    
    productCard.append(productImage, productName, reviewContainer, priceContainer, actionContainer);

    productContainer.append(productCard);
}

function renderCart() {
    const checkoutButton = document.querySelector('.checkout-button');
    const itemsInCart = document.querySelector('.cart-items');
    itemsInCart.textContent = '';

    const isEmpty = cart.length === 0;
    checkoutButton.classList.toggle('disabled-button', isEmpty);
    checkoutButton.disabled = isEmpty;
    if (isEmpty) {
        const emptyMessage = createElement('p', 'empty-cart-message', 'Your cart is empty.');
        itemsInCart.append(emptyMessage);
    }

    let subTotal = 0;

    cart.forEach(item => {
        const foundProduct = products.find(product => product.id === item.id);

        if(foundProduct) {
            const productCardCart = createElement('div', 'product-card-cart');

            const productImageCart = createElement('img', 'product-image-cart');
            productImageCart.src = foundProduct.image;
            productImageCart.alt = foundProduct.name;

            const productNameCart = createElement('h3', 'product-name-cart', foundProduct.name);

            const productPriceCart = createElement('p', 'product-price-cart', `₹${foundProduct.price}`);

            const total = calculateItemTotal(foundProduct.price, item.quantity);
            const itemTotal = createElement('p', '', `Item Total: ₹${total}`);

            const actionContainer = createElement('div', 'cart-action-container');
            const minusButton = createButton('-', 'minus-button', () => {
                removeItems(item);
                refreshCartUI();
            });
            
            const productQuantity = createElement('p', 'product-quantity', `${item.quantity}`);
            const plusButton = createButton('+', 'plus-button', () => {
                addItems(foundProduct.stock, item);
                refreshCartUI();
            });

            actionContainer.append(minusButton,productQuantity,plusButton);

            const removeItem = createButton('Remove Product', 'remove-item-button', () => {
                removeFromCart(item.id);
                refreshCartUI();
            });
            
            productCardCart.append(productImageCart, productNameCart, productPriceCart, itemTotal, actionContainer, removeItem);

            subTotal += total; 

            itemsInCart.append(productCardCart);
        }
        
    });

    const shippingCost = calculateShipping(subTotal);
    const finalTotal = subTotal + shippingCost;

    const shippingValue = document.querySelector('#shipping-value');
    shippingValue.textContent = '₹' + shippingCost;

    const finalTotalValue = document.querySelector('#final-total');
    finalTotalValue.textContent = '₹' + finalTotal;

    const cartSubTotal = document.querySelector('#cart-value');
    cartSubTotal.textContent = '₹' + subTotal;  
}

function createWishlistItem(foundProduct) {
    const productCardWishlist = createElement('div', 'product-card-wishlist');

    const productImageWishlist = createElement('img', 'product-image-wishlist');
    productImageWishlist.src = foundProduct.image;
    productImageWishlist.alt = foundProduct.name;

    const productNameWishlist = createElement('h3', '', foundProduct.name);

    const productPriceWishlist = createElement('p', 'product-price-wishlist', `₹${foundProduct.price}`);        

    const removeItemWishlist = createButton('♥','remove-item-wishlist', () => {
        toggleWishlist(foundProduct.id);
        refreshWishlistUI();
    });

    const addToCartButtonWishlist = createButton('Add to Cart', 'add-to-cart-button-wishlist', () => {
        addToCart(foundProduct);
        refreshCartUI();
        showToast(`${foundProduct.name} has been added to the cart.`);
    });

    productCardWishlist.append(productImageWishlist, productNameWishlist, productPriceWishlist, removeItemWishlist, addToCartButtonWishlist);

    return productCardWishlist;    
}

function renderWishlist() {
    const itemsInWishlist = document.querySelector('.wishlist-items');
    itemsInWishlist.textContent = '';

    if (wishlist.length === 0) {
        const emptyMessage = createElement('p', 'empty-wishlist-message', 'My wishlist is empty.');
        itemsInWishlist.append(emptyMessage);
    }

    wishlist.forEach(item => {
        const foundProduct = products.find(product => product.id === item);
        if(foundProduct) {
            itemsInWishlist.append(createWishlistItem(foundProduct));
        }
    });
}