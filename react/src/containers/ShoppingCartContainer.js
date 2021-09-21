import React,{useContext, useState} from "react";

import { ShoppingCartContext } from "../context/ShoppingCartContext";

export default function ShoppingCartContainer() {

    const {cart, addToCart} = useContext(ShoppingCartContext)

    return (
        <div>

       {cart.length !== 0 ? cart.map(item => (
       <div>
       <p>{item.name}</p>
       <p>{item.prices.usd}</p>
       </div>
       
       )) : 'Shopping Cart is Empty'}

        </div>
    )
}
