import React,{useEffect} from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'

export default function Logout() {

    useEffect(() => {
       axios.get('/users/logout')
    }, [])

    return (
            <Redirect to='/'></Redirect>
    )
}
