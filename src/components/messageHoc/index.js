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
            console.log(this.props.message,"message")
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
          message={<span id="message-id">{this.props.message}</span>}
          />
          </div>:super.render()}
          </div>
            
            )
        }
    }
}

export default withMessage;
