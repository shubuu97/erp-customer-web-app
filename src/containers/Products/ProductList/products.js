import React from 'react';
import Product from './product';

export default (props) => {
    const productsData = Array.isArray(props.productsList) && props.productsList.length &&
        props.productsList.map(product =>
            <Product
                key={product.id}
                code={product.itemCode}
                price={product.price}
                description={product.description}
                name={product.name}
                image={product.image}
                id={product.id}
                click={props.onProductClick}
                detail={product}
            />);
    return (
        <div className="row d-flex">
            {productsData}
        </div >
    );
}