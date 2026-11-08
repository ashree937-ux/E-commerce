function calculateDiscount(originalPrice, price) {
    const dis = ((originalPrice -price) / originalPrice) * 100;
    return Math.round(dis);
}

function calculateItemTotal(itemPrice, quantity) {
    const itemTotal = itemPrice * quantity;
    return Math.round(itemTotal);
}

function calculateShipping(subTotal) {
    if(subTotal === 0 || subTotal >= 999) {
        return 0;
    } else {
        return 49;
    }
}