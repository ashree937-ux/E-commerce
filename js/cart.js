let cart = [];

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if(product.stock === 0)
    {
        alert("Product cannot be added as it is out"); 
        return;
    }
    if (existingItem) 
    {
        if(existingItem.quantity < product.stock)
        {
            existingItem.quantity++;
            saveCart();
        } 
        else    
        {
            alert("Maximum stock reached"); 
        }
    } 
    else 
    {
        cart.push({
            id: product.id,
            quantity: 1
        });
        saveCart();
    }
    console.log(cart);
}

function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay?.classList.add('open');
}

function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay?.classList.remove('open');
}

function addItems(stock, item) {
    if(item.quantity < stock)
    {
        item.quantity++;
        saveCart();
    }
    else
    {
        alert("Maximum stock reached"); 
    }
}

function removeItems(item) {
    if(item.quantity > 1)
    {
        item.quantity--;
        saveCart();
    }
    else if(item.quantity === 1)
    {
        removeFromCart(item.id);
    }
}

function removeFromCart(id) {
    cart = cart.filter((item) => {
        if(item.id !== id)
        {
            return true;
        }
        else
        {
            return false;
        }
    });
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if(savedCart) {
        cart = JSON.parse(savedCart);
    }

}

function clearCart() {
    let confirmation = confirm("Are you sure you want to clear the cart?");
    if(confirmation)
    {
        cart = [];
        saveCart();
        refreshCartUI();
    }
}
