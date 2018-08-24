/** Render hijacking HOC for inducing loader */
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const rectLoader = () => (<div className='loader-wrapper'>
    <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
    </div>
</div>);
const matLoader = () => (
   <div>
      
    <CircularProgress />
    </div>
);


const withLoader = (WrappedComponent) => {
console.log(this.props,"props of the")
    return class Enhancer extends WrappedComponent {
        render() {
           
            if (this.props.isLoading) {
                return matLoader();
            }
            console.log(super.render,'ff')
            
            return <WrappedComponent {...this.props}/>
        }

    };
};

export default withLoader;
