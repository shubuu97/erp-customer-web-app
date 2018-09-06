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
                        <input checked={props.filteredDataSet.filterObj.lessThan50} type="checkbox" onChange={(e)=>props.applyPriceRangeFilter('lessThan50', e.target.checked)}/>
                        <span className="term-conditions">Under $50</span>
                    </label>
                </div>
                <div className="category-priceRange checkbox-custom">
                    <label>
                        <input checked={props.filteredDataSet.filterObj.from50To100} type="checkbox" onChange={(e)=>props.applyPriceRangeFilter('from50To100', e.target.checked)}/>
                        <span className="term-conditions">$50 - $100</span>
                    </label>
                </div>
                <div className="category-priceRange checkbox-custom">
                    <label>
                        <input checked={props.filteredDataSet.filterObj.from100To200} type="checkbox" onChange={(e)=>props.applyPriceRangeFilter('from100To200', e.target.checked)}/>
                        <span className="term-conditions">$100 - $200</span>
                    </label>
                </div>
                <div className="category-priceRange checkbox-custom">
                    <label>
                        <input checked={props.filteredDataSet.filterObj.above200} type="checkbox" onChange={(e)=>props.applyPriceRangeFilter('above200', e.target.checked)}/>
                        <span className="term-conditions">Above $200</span>
                    </label>
                </div>
            </div>
        </div>
    )
}