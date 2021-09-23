import React, {createContext} from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState';

export const ShoppingCartContext = createContext();

export function ShoppingCartProvider(props) {

    const [cart, setCart] = useLocalStorageState("item", [])

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

        console.log(newCart)
        setCart(newCart)
    }

    return (
        <ShoppingCartContext.Provider value={{cart, addToCart, clearCart, removeItem}}>

            {props.children}

        </ShoppingCartContext.Provider>
    )
}
