import React, {createContext, useEffect, useState, useRef} from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState';

export const ShoppingCartContext = createContext();

export function ShoppingCartProvider(props) {

    const [cart, setCart] = useLocalStorageState("item", [])

    const [total, setTotal] = useState(0)



    useEffect(()=>{
        let totalCost = 0;

        if(cart.length !=0 && cart.every((e) => e.prices) ){
            for (let i =0;i<cart.length;i++){
               totalCost += cart[i].prices.usd * cart[i].quantity
            }
        } else {
            for (let i =0;i<cart.length;i++){
                totalCost += cart[i].price * cart[i].quantity
             }
        }

        setTotal(totalCost.toFixed(2))
    },[cart])

    const addToCart = (e, quantity) =>{
        e.quantity = quantity;
        setCart([...cart, e])
    }

    const clearCart = (e) => {
        window.localStorage.clear();
        setCart([]);
    }

    const removeItem = (index) =>{
        
        cart.splice(index, 1);
        const newCart = cart.filter((e)=>e)

        setCart(newCart)
    }



    return (
        <ShoppingCartContext.Provider value={{cart, addToCart, clearCart, removeItem, total}}>

            {props.children}

        </ShoppingCartContext.Provider>
    )
}
