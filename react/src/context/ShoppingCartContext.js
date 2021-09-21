import React, {createContext} from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState';

export const ShoppingCartContext = createContext();

export function ShoppingCartProvider(props) {

    const [cart, setCart] = useLocalStorageState("item", [])

    const addToCart = (e) =>{
        console.log(e)
        setCart([...cart, e])
    }

    return (
        <ShoppingCartContext.Provider value={{cart, addToCart}}>

            {props.children}

        </ShoppingCartContext.Provider>
    )
}
