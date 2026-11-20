function searchProducts(query)
{
    const cleanQuery = query.toLowerCase().trim();
    if(cleanQuery.length === 0)
    {
        return products;
    }
    else
    {
        return products
            .filter(product =>
                product.name.toLowerCase().includes(cleanQuery) ||
                product.category.toLowerCase().includes(cleanQuery) ||
                product.tags.some(tag => tag.toLowerCase().includes(cleanQuery))
            )
    }
}