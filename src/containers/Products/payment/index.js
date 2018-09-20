import React,{ Component } from "react";
import Paypal from './paypal';
import PayWithCard from './payWithCard';
import PayWithCheck from './payWithCheck'

export default class Payment extends Component
{
    
 render()
 {
     return(
         <div>
        <PayWithCard/>
        <PayWithCheck/>
        <Paypal/>

         </div>
     )
 }
}