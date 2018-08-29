import React,{Component} from 'react';

/** Render hijacking HOC for inducing loader */

const routerDeciderHoc = (WrappedComponent) => {
    return class Enhancer extends WrappedComponent {
      
        render() {
        
            localStorage.setItem('id',this.props.id)

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
