function calculateDiscount(originalPrice, price) {
    const dis = ((originalPrice -price) / originalPrice) * 100;
    return Math.round(dis);
}

function calculateItemTotal(itemPrice, quantity) {
    const itemTotal = itemPrice * quantity;
    return Math.round(itemTotal);
}
