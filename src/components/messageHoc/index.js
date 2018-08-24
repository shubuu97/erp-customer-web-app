import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';


const warrningMessage = () => (
    <div>

    </div>);
    const errorMessage = () =>
    (
    <div>

    </div>
    )
    
    const successMessage  = ()=>
    (
    <div>

    </div>
    )
const withMessage = (WrappedComponent) => {
    return class Enhancer extends WrappedComponent {

        handleOpen=()=>
        {
            return true;
        }
        render() {
            return (
            <div> 
                 
              {this.props.message!=null ? 
             <div> {super.render()}
              
              <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.handleOpen()}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{"An email has been send to your email id please Check the mail"}</span>}
          />
          </div>:<WrappedComponent {...this.props}/>}
          </div>
            
            )
        }
    }
}

export default withMessage;
