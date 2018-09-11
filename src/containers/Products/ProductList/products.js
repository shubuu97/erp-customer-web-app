import React from 'react';
import Product from './product';
import withLoader from '../../../components/LoaderHoc';
import productPlaceholder from '../../../assets/images/product-image-placeholder.jpg';

class ProductsListClass extends React.Component {
    render() {
    const productsData = Array.isArray(this.props.productsList) && this.props.productsList.length &&
        this.props.productsList.map(product =>
            <Product
                key={product._id}
                code={product.itemNo}
                price={product.price}
                description={product.itemDesc}
                name={product.aliasName || product.itemName}
                image={(product.images && product.images[0] && product.images[0].url) || productPlaceholder}
                id={product.itemId}
                click={this.props.onProductClick}
                detail={product}
                {...this.props}
            />);
    return (
        <div className="row">
            {productsData}
        </div >
    );
}
}
export default withLoader(ProductsListClass)