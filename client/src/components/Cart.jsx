import React, { useEffect, useState } from 'react'
import CartItem from './CartItem';
const url = import.meta.env.VITE_BACKEND_URL;
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Define the async fetch function
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/cart/getcartdetails`, {
          method: "GET",
          headers: {
              "auth-token": localStorage.getItem('token'),
              "content-type": "application/json"
          },

      });
       
        const result = await response.json();
        setData(result);
        console.log(result); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch function when the component loads
    fetchData();
    console.log(data)
  }, []);


  const handleClick = () => {
    navigate('/checkout')
  }


  return (
    <div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header py-2">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Your Cart</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {data?.map((item)=>{
                return (
                  <CartItem key={item._id} item={item}/>
                )
              })}
            </div>
            <div className="modal-footer py-2">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" style={{background: "linear-gradient(to bottom right, #cc66ff 0%, #3399ff 100%)"}} onClick = {handleClick} >CheckOut</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
