import React from 'react';
import Product from './product';

export default (props) => {
    const productsData = Array.isArray(props.productsList) && props.productsList.length &&
        props.productsList.map(product =>
            <Product
                key={product.key}
                code={product.itemInfo.itemNo}
                price={product.itemInfo.price}
                description={product.itemInfo.itemDesc}
                name={product.itemInfo.itemName}
                image={(product.itemInfo.images && product.itemInfo.images[0].url) || 'https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg'}
                id={product.itemId}
                click={props.onProductClick}
                detail={product}
            />);
    return (
        <div className="row d-flex">
            {productsData}
        </div >
    );
}