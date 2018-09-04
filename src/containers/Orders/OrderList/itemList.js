import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader'


   

    export default (props)=>
    {
        return (
            
                <div>
                    <div>
                        <div>image will come here</div>
                        <div>
                            <div>
                             {props.name}
                            </div>
                            <div>
                            Price Will come here
                            </div>
                        </div>
                        <div>
                            <div>Quantity</div>
                            <div>{props.quantity}</div>
                        </div>
                    </div>
                </div>
            
        )
    }



