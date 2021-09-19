import React,{useEffect, useState} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import EditMtgCard from './EditMtgCard'
import axios from 'axios'

export default function MtgCardDisplay() {

    const [card, setCard] = useState({name:'', set_name:'', rarity:'', oracle_text:'', prices:'', stock:'', artist:'', image_uris:'', _id:''})

    const location = useLocation()
    const {id} = useParams()

    // const {name, set_name, rarity, oracle_text, prices, stock, artist, image_uris, _id} =
    //         (location.state ) != undefined
    //             ? location.state
    //             : " ";

    useEffect(()=>{

       const grabCard = async () =>{  if (!location.state){
            await axios({
                method: 'get',
                url: `/mtgcards/${id}`,
                    headers: {
                      'Content-Type': 'application/json'
                    }
              }).then(response => {
                setCard({...response.data})
                 })
        }else{
            setCard({...location.state})
        }}
        grabCard();

    },[])
    


    return (
        <div>
{card.name}
{card.set_name}
{card.rarity}
{card.oracle_text}
{card.prices ? card.prices.usd:''}
{card.stock}
{card.artist}
<img src={`${card.image_uris.small}`} />

{location.state && <EditMtgCard id={card._id}/>}
        </div>
    )
}

{/* <img src={`${image_uris.small}`} /> */}