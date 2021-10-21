import React,{createContext, useState, useEffect} from 'react'

export const AuthContext = createContext();

export function AuthProvider(props) {

    const [authState, setAuthState] = useState({
        _id:'',
        username:'',
        email:'',
        authorization_level:''
    })
    const [loadingAuth, setLoadingAuth] = useState(true)

    // useEffect(()=>{
    //     setAuthState(


    //     )
    // },[])
    

    console.log(authState)

    return (
        <AuthContext.Provider value={{authState, setAuthState,loadingAuth, setLoadingAuth }}>
            {props.children}
        </AuthContext.Provider>
    )
}
