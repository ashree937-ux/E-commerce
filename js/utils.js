function calculateDiscount(originalPrice, price) {
    const dis = ((originalPrice -price) / originalPrice) * 100;
    return Math.round(dis);
}