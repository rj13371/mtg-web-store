import React, {createContext} from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState';

export const ShoppingCartContext = createContext();

export function ShoppingCartProvider(props) {

    const [cart, setCart] = useLocalStorageState("item", [])

    const addToCart = (e, quantity) =>{
        console.log(e)
        e.quantity = quantity;
        setCart([...cart, e])
    }

    const clearCart = () => {
        window.localStorage.clear();
        setCart([]);
    }

    return (
        <ShoppingCartContext.Provider value={{cart, addToCart, clearCart}}>

            {props.children}

        </ShoppingCartContext.Provider>
    )
}
