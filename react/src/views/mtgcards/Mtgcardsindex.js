import React,{useState, useEffect} from "react";
import { useLocation , useParams} from "react-router-dom";
import MtgCard from "./MtgCard";

export default function Mtgcardsindex() {

    const [data, setData] = useState([{name:'Roland'}])
    const [isLoading, setisLoading] = useState(true);

    const location = useLocation();
    const {name} = useParams()

    // const query = location.state.params;

    useEffect(() => {

        if (data.name){
            setData(name)
             console.log(data)
            
            }

      }, [data]);

      useEffect(() => {

        if (data.name){
            setisLoading(false)
             console.log(isLoading)
            
            }

      }, [isLoading]);




      return (
        <div>

        <MtgCard data={data}/>

        </div>
    )
}
