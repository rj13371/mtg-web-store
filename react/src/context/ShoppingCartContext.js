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

    return (
        <ShoppingCartContext.Provider value={{cart, addToCart, clearCart}}>

            {props.children}

        </ShoppingCartContext.Provider>
    )
}
