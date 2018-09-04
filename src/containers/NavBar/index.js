import React, { Component } from 'react';

export default class extends Component {
    render() {
        return (
            <ul className="app-navbar">
                {this.props.categories && this.props.categories.map((category)=>(
                    <li className={category.id == this.props.selectedCategory.id ? 'active' : '' } onClick={()=>this.props.handleClick(category)}>{category.displayName}</li>
                ))}
            </ul>
        )
    }
}