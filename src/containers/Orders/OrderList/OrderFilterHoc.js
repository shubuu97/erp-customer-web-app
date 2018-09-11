import React,{Component} from 'react';
import {filter, sortBy,reverse} from 'lodash';

function FilterData(WrappedComponent)
{
    return class WithFilterOrders extends Component
    {
    constructor(props)
    {
        super(props)
        this.state ={orderListData:props.orderListData}
    }
        filterData(key)
        {
            if(key=='Nofilter')
            {
               let  orderListData= sortBy(this.props.orderListData, function(dateObj) {
                    return new Date(dateObj.orderDate);
                  });
                 reverse(orderListData)
           return  this.setState({orderListData})
            }
        
       let orderListData =    filter(this.props.orderListData,['status',key]);
        orderListData= sortBy(orderListData, function(dateObj) {
            return new Date(dateObj.orderDate);
          });
         reverse(orderListData)
       this.setState({orderListData})

        }
        render()
        {
            return(
                <div>
                <div style={{display:'flex'}}>
                <div onClick={()=>this.filterData('Nofilter')}>
                Orders
                </div>
                <div onClick={()=>this.filterData('ACCEPTED')}>
                 ACCEPTED
                </div>
                <div onClick={()=>this.filterData('IN_TRANSIT')}>
                IN TRANSIT
                </div>
                <div onClick={()=>this.filterData('INCOMING')}>
                 INCOMING
                </div>
                </div>

                <WrappedComponent {...this.props} orderListData={this.state.orderListData} />
                </div>
            
        )
    }
    }
}

export default FilterData;