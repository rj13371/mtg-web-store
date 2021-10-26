import React,{useEffect, useContext} from 'react'


import {
    BrowserRouter as Router,
    Redirect,
    useHistory
  } from "react-router-dom";
import axiosClient from '../../utils/axios';
import { AuthContext } from '../../context/AuthContext'

export default function Logout() {
    const history = useHistory()


    const {setAuthState, authState} = useContext(AuthContext)

    useEffect(() => {
        setAuthState({
            _id:'',
            username:'',
            email:'',
            authorization_level:''
        })

        const logout = async () => {
            await axiosClient({
                method: "get",
                url: '/users/logout',
                withCredentials:true,
                exposedHeaders: ["set-cookie"]
              })
        }
        logout()

    }, [])

    return (<></>
    )
}
