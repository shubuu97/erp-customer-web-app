import React,{Component} from 'react';
import {filter} from 'lodash';
import Button from '@material-ui/core/Button';

function FilterData(WrappedComponent)
{
    return class WithFilterOrders extends Component
    {
    constructor(props)
    {
        debugger;
        super(props)
        this.state ={orderListData:props.orderListData}
    }
        filterData(key)
        {
            if(key=='Nofilter')
           return  this.setState({orderListData:this.props.orderListData})
        
       let orderListData =    filter(this.props.orderListData,['status',key]);
       this.setState({orderListData})

        }
        componentWillReceiveProps(nextProps)
        {
            this.setState({orderListData:nextProps  .orderListData})
        }
        render()
        {
            return(
                <div>
                <h2 className="cart-heading">Your Orders</h2>
                <div className="order-tab-parent">
                    <ul className="order-tab-ul">
                        <li className="active" onClick={()=>this.filterData('Nofilter')}>
                            Orders
                        </li>
                        <li onClick={()=>this.filterData('ACCEPTED')}>
                            Accepted
                        </li>
                        <li onClick={()=>this.filterData('IN_TRANSIT')}>
                            In Transit
                        </li>
                        <li onClick={()=>this.filterData('INCOMING')}>
                            Incoming
                        </li>
                    </ul>
                    <div className="order-tab-right">
                        <div className="order-search">
                            <input className="form-control" placeholder="" />
                            <Button variant="contained" color='primary'>Search Order</Button>
                        </div>
                        <div className="order-filter">

                        </div>
                    </div>
                </div>

                <WrappedComponent {...this.props} orderListData={this.state.orderListData} />
                </div>
            
        )
    }
    }
}

export default FilterData;