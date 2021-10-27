import React from 'react'
import axiosClient from '../../../../utils/axios'
import { Button } from 'react-bootstrap'

export default function ToggleComplete(props) {

    const toggleComplete = async () => { 

        await axiosClient({
            method: "put",
            url: `/event/markComplete/${props.id}`,
            headers: {
              "Content-Type": "application/json",
            },
          }).then((resp)=> {
            console.log(resp)
          })
        }
      


    return (
        <Button size='sm' variant='primary' onClick={toggleComplete} >
            Mark complete
        </Button >
    )
}
