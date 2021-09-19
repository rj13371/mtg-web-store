import React from 'react'
import { useLocation } from 'react-router-dom'
import EditMtgCard from './EditMtgCard'

export default function MtgCardDisplay() {

    const location = useLocation()
    console.log (location)

    const {name, set_name, rarity, oracle_text, prices, stock, artist, image_uris, _id} =
            (location.state ) != undefined
                ? location.state
                : " ";


    return (
        <div>
{name}
{set_name}
{rarity}
{oracle_text}
{prices.usd}
{stock}
{artist}

{true?<EditMtgCard id={_id}/>: null}
        </div>
    )
}

{/* <img src={`${image_uris.small}`} /> */}