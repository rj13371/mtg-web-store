import React,{useEffect, useState, useContext} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import EditMtgCard from './EditMtgCard'
import axios from 'axios'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import ShoppingCartContainer from '../../containers/ShoppingCartContainer';

export default function MtgCardDisplay(props) {

    const [card, setCard] = useState({name:'', set_name:'', rarity:'', oracle_text:'', prices:'', stock:'', artist:'', image_uris:'', _id:''})

    const location = useLocation()
    const {id} = useParams()

    const {cart, addToCart} = useContext(ShoppingCartContext)

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

<Card>
<CardImg className="w-25 h-25 p-3" src={`${card.image_uris.normal}`} alt="Card image cap" />
<CardBody>
  <CardTitle tag="h5">{card.name}</CardTitle>
  <CardSubtitle tag="h6" className="mb-2 text-muted">{card.rarity}</CardSubtitle>
  <CardText>{card.set_name}</CardText>
  <CardText>{card.oracle_text}</CardText>
  <CardText>{card.prices ? card.prices.usd:''}</CardText>
  <CardText>{card.artist}</CardText>
  <Button onClick={()=>addToCart(card)}>Button</Button>
</CardBody>
</Card>

<ShoppingCartContainer/>

{location.state && <EditMtgCard id={card._id}/>}
        </div>
    )
}

{/* <img src={`${image_uris.small}`} /> */}


// {card.name}
// {card.set_name}
// {card.rarity}
// {card.oracle_text}
// {card.prices ? card.prices.usd:''}
// {card.stock}
// {card.artist}
// <img src={`${card.image_uris.small}`} />