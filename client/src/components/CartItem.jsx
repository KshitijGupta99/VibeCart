import React, { useState, useEffect } from 'react'
const url = import.meta.env.VITE_BACKEND_URL;

const CartItem = (props) => {
      const { item } = props; // Fixed: Added missing prop validation
    const [data, setData] = useState({})


    useEffect(() => {
        // Define the async fetch function
        const fetchData = async () => {
          try {
            const response = await fetch(`${url}/product/getProductById`, {
              method: "GET",
              headers: {
                  "auth-token": localStorage.getItem('token'),
                  "content-type": "application/json",
                  "product_id": `${item._id}`
              },
    
            });
           
            const result = await response.json();
            setData(result);
            console.log(result, "result of product "); // Update state with fetched data
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        // Call the fetch function when the component loads
        fetchData();
        console.log(data)
      }, []);
    return (
        <div>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{item.quantity}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{data.title}</h6>
                    <p className="card-text">{data.description}</p>
                    <a href="#" className="card-link">{data.price}</a>
                    <a href="#" className="card-link">{data.rating.rate}</a>
                </div>
            </div>
        </div>
    )
}

export default CartItem
