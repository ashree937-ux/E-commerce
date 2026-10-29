let cart = [];

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) 
    {
        if(product.stock === 0)
        {
            console.log("Product cannot be added as it is out of stock"); 
        }
        if(existingItem.quantity < product.stock)
        {
            existingItem.quantity++;
        } 
        else    
        {
            console.log("Maximum stock reached"); 
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