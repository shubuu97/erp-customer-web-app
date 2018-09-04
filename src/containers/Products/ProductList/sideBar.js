import React from 'react';

export default (props) => {
    return (
        <div className="left-sidebar">
            <div className="left-sidebar-category">
                <h4>Categories</h4>
                <div className="category-list selected">
                    <span className="categoryName">Indica</span>
                    <span className="category-count">43</span>
                </div>
                <div className="category-list">
                    <span className="categoryName">Sativa</span>
                    <span className="category-count">36</span>
                </div>
                <div className="category-list">
                    <span className="categoryName">Hybrid</span>
                    <span className="category-count">17</span>
                </div>
                <div className="category-list">
                    <span className="categoryName">Extract</span>
                    <span className="category-count">14</span>
                </div>
                <div className="category-list">
                    <span className="categoryName">Gear</span>
                    <span className="category-count">44</span>
                </div>
                <div className="category-list">
                    <span className="categoryName">Peroll</span>
                    <span className="category-count">26</span>
                </div>
                <div className="category-list">
                    <span className="categoryName">Tropicals</span>
                    <span className="category-count">12</span>
                </div>
            </div>
            <div className="left-sidebar-category">
                <h4>By Price</h4>
                <div class="category-priceRange checkbox-custom">
                    <label>
                        <input value="false" type="checkbox" />
                        <span class="term-conditions">Under $50</span>
                    </label>
                </div>
                <div class="category-priceRange checkbox-custom">
                    <label>
                        <input value="false" type="checkbox" />
                        <span class="term-conditions">$50 - $100</span>
                    </label>
                </div>
                <div class="category-priceRange checkbox-custom">
                    <label>
                        <input value="false" type="checkbox" />
                        <span class="term-conditions">$100 - $200</span>
                    </label>
                </div>
                <div class="category-priceRange checkbox-custom">
                    <label>
                        <input value="false" type="checkbox" />
                        <span class="term-conditions">Above $200</span>
                    </label>
                </div>
            </div>
        </div>
    )
}