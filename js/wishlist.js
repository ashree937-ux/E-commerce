let wishlist = [];

function toggleWishlist(productId) {
    const existingItem = wishlist.includes(productId);
    if (existingItem) {
        wishlist = wishlist.filter(item => item !== productId);
    } else {
        wishlist.push(productId);
    }
    saveWishlist();
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function loadWishlist() {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
        wishlist = JSON.parse(storedWishlist);
    }
}

function openWishlist() {
    if (typeof closeCart === 'function') {
        closeCart();
    }
    wishlistDrawer.classList.add('open');
    wishlistOverlay?.classList.add('open');
}

function closeWishlist() {
    wishlistDrawer.classList.remove('open');
    wishlistOverlay?.classList.remove('open');
}

function clearWishlist() {
    wishlist = [];
    saveWishlist();
}