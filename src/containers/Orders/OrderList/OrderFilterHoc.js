import React,{Component} from 'react';
import {filter} from 'lodash';

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
           return  this.setState({orderListData:this.props.orderListData})
        
       let orderListData =    filter(this.props.orderListData,['status',key]);
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