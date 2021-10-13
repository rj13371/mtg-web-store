import React,{createContext, useState} from 'react'

export const AuthContext = createContext();

export function AuthProvider(props) {

    const [authState, setAuthState] = useState({
        _id:'',
        username:'',
        email:'',
        authorization_level:''
    })

    

    console.log(authState)

    return (
        <AuthContext.Provider value={{authState, setAuthState}}>
            {props.children}
        </AuthContext.Provider>
    )
}
