import React from 'react';

const sideBar =  (props) => {
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

                 { props.selectedType.priceFilter.map((filter,index)=>
                {
                return (
                    <div key={index} className="category-priceRange checkbox-custom">
                    <label>
                        <input checked={props.filteredDataSet.filterObj[`${filter.minPrice}-${filter.maxPrice}`]} type="checkbox" onChange={(e)=>props.applyPriceRangeFilter(`${filter.minPrice}-${filter.maxPrice}`, e.target.checked)}/>
                        <span className="term-conditions">{'$'+filter.minPrice}-{'$'+filter.maxPrice}</span>
                    </label>
                </div>
                )
                })
            }
            </div>
        </div>
    )
}

export default sideBar;