import React, { Component } from 'react';
import { filter, sortBy, reverse, find, includes } from 'lodash';
import Button from '@material-ui/core/Button';
import moment from 'moment';


function FilterData(WrappedComponent) {
    return class WithFilterOrders extends Component {
        constructor(props) {
            super(props)
            this.state = {
                orderListData: props.orderListData,
                active: 0,
                sortingKey: 'all'
            }
        }
        findByMonth = (e) => {
            let orderListData;
            if (e.target.value == "1") {
                orderListData = filter(this.state.orderListData, function (item) {
                    let isFilter = false;
                    let createdDate = moment(item.createdDate)
                    let todayDate = moment(new Date())
                    if (todayDate.diff(createdDate, 'day') <= 30) {
                        isFilter = true;

                    }
                    return isFilter
                })

            }
            if (e.target.value == '6') {
                orderListData = filter(this.state.orderListData, function (item) {
                    let isFilter = false;
                    let createdDate = moment(item.createdDate)
                    let todayDate = moment(new Date())
                    if (todayDate.diff(createdDate, 'day') <= 180) {
                        isFilter = true;

                    }
                    return isFilter
                })


            }
            if (e.target.value == 'all') {
                orderListData = this.state.orderListData


            }
            orderListData = sortBy(orderListData, function (dateObj) {
                return new Date(dateObj.orderDate);
            });
            reverse(orderListData)
            this.setState({ orderListData })
            this.setState({ sortingKey: e.target.value })
        }
        handleSearch = (event) => {
            let orderListData = filter(this.props.orderListData, function (item) {
                let isFilter = false;
                item.saleProducts.map((product) => {
                    if (includes(item.displayId, event.target.value) || includes((product.itemName || '').toLowerCase(), (event.target.value || '').toLowerCase())) {
                        isFilter = true;
                    }
                })
                return isFilter
            })
            this.setState({ orderListData })
        }
        filterData(key, active) {
            if (key == 'Nofilter') {
                let orderListData = sortBy(this.props.orderListData, function (dateObj) {
                    return new Date(dateObj.orderDate);
                });
                reverse(orderListData)
                return this.setState({ orderListData, active })
            }
            if (key == 'DISPATCHED') {
                let orderListData = filter(this.props.orderListData, (order) => (order.status == 'PART_DISPATCHED' || order.status == 'DISPATCHED'));

                // let orderListData = filter(this.props.orderListData, ['status', key]);
                orderListData = sortBy(orderListData, function (dateObj) {
                    return new Date(dateObj.orderDate);
                });
                reverse(orderListData)
                this.setState({ orderListData, active })
            }
            if (key == 'ACCEPTED') {

                let orderListData = filter(this.props.orderListData, ['status', key]);
                orderListData = sortBy(orderListData, function (dateObj) {
                    return new Date(dateObj.orderDate);
                });
                reverse(orderListData)
                this.setState({ orderListData, active })
            }

            if (key == 'DELIVERED') {
                let orderListData = filter(this.props.orderListData, (order) => (order.status == 'PART_DELIVERED' || order.status == 'DELIVERED'));

                // let orderListData = filter(this.props.orderListData, ['status', key]);
                orderListData = sortBy(orderListData, function (dateObj) {
                    return new Date(dateObj.orderDate);
                });
                reverse(orderListData)
                this.setState({ orderListData, active })
            }
        }
        componentWillReceiveProps(nextProps) {
            let orderListData = sortBy(nextProps.orderListData, function (dateObj) {
                return new Date(dateObj.orderDate);
            });
            reverse(orderListData)
            this.setState({ orderListData })
        }
        render() {
            return (
                <div>
                    <h2 className="cart-heading">Your Orders</h2>
                    <div className="order-tab-parent">
                        <div className="order-tab-right">
                            <div className="order-search">
                                <input className="form-control" placeholder="" name="search" onChange={this.handleSearch} />
                                <div className="sort-by">
                                    <span>Filter By</span>
                                    <select value={this.state.sortingKey} className="form-control" onChange={this.findByMonth}>
                                        <option value="1">Last 1 month</option>
                                        <option value="6">Last 6 months</option>
                                        <option value="all">All</option>

                                    </select>
                                </div>
                            </div>
                            <div className="order-filter">

                            </div>
                        </div>
                        <ul className="order-tab-ul">
                            <li className={this.state.active == 0 ? 'active' : null} onClick={() => this.filterData('Nofilter', 0)}>
                                All Orders
                        </li>
                            <li className={this.state.active == 1 ? 'active' : null} onClick={() => this.filterData('ACCEPTED', 1)}>
                                Accepted
                        </li>
                            <li className={this.state.active == 2 ? 'active' : null} onClick={() => this.filterData('DISPATCHED', 2)}>
                                Dispatched
                        </li>
                            <li className={this.state.active == 3 ? 'active' : null} onClick={() => this.filterData('DELIVERED', 3)}>
                                Delivered
                        </li>
                        </ul>
                    </div>

                    <WrappedComponent {...this.props} orderListData={this.state.orderListData} />
                </div>

            )
        }
    }
}

export default FilterData;