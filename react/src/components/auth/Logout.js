import React,{useEffect, useContext} from 'react'
import axios from 'axios';

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
            await axios({
                method: "get",
                url: 'users/logout',
                withCredentials:true,
                exposedHeaders: ["set-cookie"]
              })
        }
        logout().then(
            setTimeout(() => {
                history.push('/')
<<<<<<< HEAD
              }, 500)
=======
              }, 100)
>>>>>>> ed33d808437d1a41c622f6e7c119da41683dffa5
        )

    }, [])

    return (<></>
    )
}
