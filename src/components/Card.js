import React from 'react'
import { useDispatchCart,useCart } from './ContextReducer';

export default function Card(props) {


  let option = props.options;
  var priceoptions;
  if (option != null) { priceoptions = Object.keys(option); }
  if(props.foodItem!=null)
  {var foodItem=props.foodItem}
  console.log(props.foodItem)
const handleaddtocart=()=>{
                 
}

  return (
    
      <div>
        <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
          <img src={props.foodItem?.img !=null?props.foodItem?.img:""} className="card-img-top" alt="..." style={{ height: "140px", objectFit: "fill" }} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem?.name}</h5>

            <div className='container w-100'>
              <select className='m-2 h-100 bg-success rounded'>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  )
                })}
              </select>
              <select className='m-2 h-100 bg-success rounded'>
                {priceoptions != null ?
                  priceoptions.map((data) => {
                    return <option key={data} value={data}>{data}</option>
                  }) : ""}
              </select>
              <div className='d-inline fs-5 h-100'>
                total price
              </div>

            </div>
            <hr></hr>
            <button className='btn btn-success justify-center ms-2' onClick={handleaddtocart} >Add to cart</button>
          </div>
          
        </div>
      </div>
    
  )
}
