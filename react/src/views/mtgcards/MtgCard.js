import React from 'react'
import MtgCardDisplay from './MtgCardDisplay'

export default function MtgCard(props) {
    return (
        <div>   
            

            {
                props.data.map( ({name}) =>
                  <MtgCardDisplay 
                  name ={name}
                  />
                )
              }


        </div>
    )
}
