import React from 'react';

export default (props) => {
    return (
        <div className="left-sidebar">
            <div className="left-sidebar-category">
                <h4>Categories</h4>
                {props.types && props.types.map((type, key) => (
                    <div className={`category-list ${props.selectedType.itemType == type.itemType ? 'selected':''}`} key={key} onClick={()=>props.selectCategoryType(type)}>
                        <span className="categoryName">{type.itemType}</span>
                        <span className="category-count">{type.products.length}</span>
                    </div>
                ))}
            </div>
            <div className="left-sidebar-category">
                <h4>By Price</h4>
                <div className="category-priceRange checkbox-custom">
                    <label>
                        <input type="checkbox" onChange={(e)=>props.applyPriceRangeFilter('<50', e.target.checked)}/>
                        <span className="term-conditions">Under $50</span>
                    </label>
                </div>
                <div className="category-priceRange checkbox-custom">
                    <label>
                        <input type="checkbox" onChange={(e)=>props.applyPriceRangeFilter('50-100', e.target.checked)}/>
                        <span className="term-conditions">$50 - $100</span>
                    </label>
                </div>
                <div className="category-priceRange checkbox-custom">
                    <label>
                        <input type="checkbox" onChange={(e)=>props.applyPriceRangeFilter('100-200', e.target.checked)}/>
                        <span className="term-conditions">$100 - $200</span>
                    </label>
                </div>
                <div className="category-priceRange checkbox-custom">
                    <label>
                        <input type="checkbox" onChange={(e)=>props.applyPriceRangeFilter('>200', e.target.checked)}/>
                        <span className="term-conditions">Above $200</span>
                    </label>
                </div>
            </div>
        </div>
    )
}