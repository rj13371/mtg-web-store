import React,{createContext, useState, useEffect} from 'react'

export const AuthContext = createContext();

export function AuthProvider(props) {

    const [authState, setAuthState] = useState({})

    useEffect(()=>{
        setAuthState(
            {
                _id:'',
                username:'',
                email:'',
                authorization_level:''
            }

        )
    },[])
    

    console.log(authState)

    return (
        <AuthContext.Provider value={{authState, setAuthState}}>
            {props.children}
        </AuthContext.Provider>
    )
}
