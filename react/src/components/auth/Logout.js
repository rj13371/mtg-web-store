import React,{useEffect, useContext} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    BrowserRouter as Router,
    Redirect,
    useHistory
  } from "react-router-dom";
import axiosClient from '../../utils/axios';
import { Button } from 'react-bootstrap';

export default function Logout() {
    const history = useHistory()

    const logout = async () => {
        await axiosClient({
            method: "get",
            url: 'users/logout',
            withCredentials:true,
            exposedHeaders: ["set-cookie"]
          })

          setTimeout(() => {
            history.push('/')
          }, 1000)
        

    }
    



    return (
    
    <Button onClick={()=>logout()} >
    <FontAwesomeIcon icon='sign-out-alt' size="lg" color='red' />
    </Button>

    )
}
