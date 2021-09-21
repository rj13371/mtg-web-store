import React,{useState,Fragment} from 'react'
import axiosClient from '../../utils/axios';

export default function EditMtgCard(props) {

  const [formData, setFormData] = useState({
    stock: "",
    price: ""
  })

  const {
    stock,
    price,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
      stock: stock,
      price: price
    };

    await axiosClient({
      method: "put",
      url: `/mtgcards/${props.id}`,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
        console.log(response)
         })

  };


    return (
 
            
            <Fragment>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            value={stock}
            onChange={onChange}
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={price}
            onChange={onChange}
          />
        </div>
        <input type="submit" value="EditMtgCard" />
      </form>
    </Fragment>

    )
}