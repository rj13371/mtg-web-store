import React from 'react';
import { LoopCircleLoading } from 'react-loadingg';


export default function Loading(props) {

    if(props.navbar){
    return (
        <LoopCircleLoading  style={{width: "25px", height:"25px"}} color='red' size='small' />
    )
    }else 
    return (
<LoopCircleLoading  color='red' size='small' />
    )
}
