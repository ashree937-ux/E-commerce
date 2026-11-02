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
}