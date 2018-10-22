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
   <div className="loader-center">
      
    <CircularProgress />
    </div>
);


const withLoader = (WrappedComponent) => {
    return class Enhancer extends WrappedComponent {
x
        render() {
            console.log(this.props,'props is here')

            if (this.props.isLoading) {
                return matLoader();
            }
            
            return <WrappedComponent {...this.props}/>
        }

    };
};

export default withLoader;
