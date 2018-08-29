import React, { Component } from 'react';

export default class extends Component {
    render() {
        return (
            <ul className="app-navbar">
                <li onClick={this.props.handleClick}>Indica</li>
                <li onClick={this.props.handleClick}>Sativa </li>
                <li onClick={this.props.handleClick}>Hybrid</li>
                <li onClick={this.props.handleClick}>Extract</li>
                <li onClick={this.props.handleClick}>Gear</li>
                <li onClick={this.props.handleClick}>Prerolls</li>
                <li onClick={this.props.handleClick}>Tropicals</li>
            </ul>
        )
    }
}