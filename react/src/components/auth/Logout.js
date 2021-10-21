import React,{useEffect, useContext} from 'react'

import {
    BrowserRouter as Router,
    Redirect
  } from "react-router-dom";
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export default function Logout() {


    const {setAuthState, authState} = useContext(AuthContext)

    useEffect(() => {
        setAuthState({
            _id:'',
            username:'',
            email:'',
            authorization_level:''
        })
       axios.get('/users/logout')

    }, [])

    return (<Redirect push to="/" />
    )
}
