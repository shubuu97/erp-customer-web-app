import React, { Component } from 'react';

export default class extends Component {
    render() {
        return (
            <ul className="app-navbar">
                {this.props.categories && this.props.categories.map((category)=>(
                    <li onClick={this.props.handleClick}>{category.displayName}</li>
                ))}
            </ul>
        )
    }
}