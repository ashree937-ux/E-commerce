const productContainer = document.querySelector('.product-container'); 
console.log(productContainer);

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
    const wishList = document.createElement('button');
    wishList.textContent = '♡';
    wishList.classList.add('wishlist-button');
    actionContainer.append(addToCartButton, wishList);
    productCard.append(actionContainer);

    productContainer.append(productCard);
}

products.forEach(currentelement => {
    createProductCard(currentelement);
});
