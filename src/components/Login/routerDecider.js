import React,{Component} from 'react';
import { debug } from 'util';

/** Render hijacking HOC for inducing loader */

const routerDeciderHoc = (WrappedComponent) => {
    return class Enhancer extends WrappedComponent {
      
        render() {
            console.log("In the route decider", this.props.customerStatus);
            localStorage.setItem('id',this.props.id);
            localStorage.setItem('customerStatus',this.props.customerStatus)
            if(this.props.role&&this.props.role=="customer")
            localStorage.setItem('role','customer')
            else
            localStorage.setItem('role','company')
            switch (this.props.customerStatus) {
                case 'In Approval':
               this.props.history.push('/approval')
                return null
                    break;
                case 'New':
                
                if(this.props.role=='customer'){

                this.props.history.push('/customerProfile')
                return null}
                else{

                this.props.history.push('/companyProfile')
                return null
                }
                break;
                case 'Approved':
                this.props.history.push('/productList')
                return null
                break;
                case 'Rejected':
                this.props.history.push('/approval')
                return null
                break;

                default:
                return <WrappedComponent {...this.props}/>
                    break;
            }
          

    };
};
}

export default routerDeciderHoc;
