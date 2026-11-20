loadCart();
loadWishlist();
refreshCartUI();

renderCategories();
refreshWishlistUI();

const cartButton = document.querySelector('.cart-button');
const cartDrawer = document.querySelector('.cart');
const cartCloseButton = document.querySelector('.cart-close-button');
const cartOverlay = document.querySelector('.cart-overlay');

if (cartButton && cartDrawer) {
    cartButton.addEventListener('click', () => {
        openCart();
    });
}

if (cartCloseButton && cartDrawer) {
    cartCloseButton.addEventListener('click', () => {
        closeCart();
    });
}

if (cartOverlay && cartDrawer) {
    cartOverlay.addEventListener('click', (event) => {
        if(event.target === cartOverlay) {
            closeCart();
        }
    });
}

const clearCartButton = document.querySelector('.clear-cart');
if(clearCartButton) {
    clearCartButton.addEventListener('click', () => {
        openConfirmation('Cart', 'Are you sure you want to remove all items from your cart?', () => {
            clearCart();
            refreshCartUI();
        });
    });
}

const wishlistButton = document.querySelector('.wishlist-button');
const wishlistDrawer = document.querySelector('.wishlist');
const wishlistCloseButton = document.querySelector('.wishlist-close-button');
const wishlistOverlay = document.querySelector('.wishlist-overlay');

if (wishlistButton && wishlistDrawer) {
    wishlistButton.addEventListener('click', () => {
        openWishlist();
    });
}

if (wishlistCloseButton && wishlistDrawer) {
    wishlistCloseButton.addEventListener('click', () => {
        closeWishlist();
    });
}

if (wishlistOverlay && wishlistDrawer) {
    wishlistOverlay.addEventListener('click', (event) => {
        if(event.target === wishlistOverlay) {
            closeWishlist();
        }
    });
}

const clearWishlistButton = document.querySelector('.clear-wishlist');
if(clearWishlistButton) {
    clearWishlistButton.addEventListener('click', () => {
        openConfirmation('Wishlist', 'Are you sure you want to remove all items from your wishlist?', () => {
            clearWishlist();
            refreshWishlistUI();
        });
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeCart();
        closeWishlist();
    }
});
