import React, { useState, useEffect } from 'react';
const url = import.meta.env.VITE_BACKEND_URL;

const CartItem = ({ item }) => {
  const [data, setData] = useState({});
  const [errorMsg, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(item, "product ID");
        const response = await fetch(`${url}/product/getProductById?product_id=${item.productId}`, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem('token'),
            "content-type": "application/json",
          },
        });
  
        const result = await response.json();
        
        let x= result[0];
        x.quantity = item.quantity;
        await setData(x);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


  
    fetchData();
  }, [item.productId]);

  const handleClick = async (e) => {
    console.log(data, data.qyantity, "hereee")
    setErrorMessage("");
    const url = import.meta.env.VITE_BACKEND_URL;
    e.preventDefault();
    
    try {
        console.log(data.id, " propduct ID");
        
        const response = await fetch(`${url}/cart/updateProductQuantity`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({
                productId: data.id,
                quantity: data.quantity,
                price: data.price,
            }),
        });
        

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("Cart quantity updated:", data.quantity); 
    } catch (error) {
        console.error("Error:", error);
        setErrorMessage("An error occurred. Please try again.");
    }
  };

  const add = ()=>{
    data.quantity++;
    console.log(data.quantity, "sankhya ")
    handleClick();
  }
  const reduce = ()=>{
    data.quantity--;
    handleClick;
  }
  
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      console.log(data, "inside item after data update");
    }
  }, [data]);
  

  return (
    <div className=''>
      <div className="card " style={{ width: "26rem", padding:"0", marginTop: "1rem", marginBottom: "2rem", marginInline: "1rem"}}>
        <div className="card-body d-flex">
          <div className=' text-star'>
            
            <h6 className="card-subtitle mb-2 text-body-secondary">{data?.title? (data.title.length > 20 ? `${data.title.slice(0, 20)}...` : data.title) : "No Title Available"}</h6>
            <p className="card-text">{data?.description? (data.title.length > 40 ? `${data.title.slice(0, 40)}...` : data.title) : "No Description Available"}</p>
            <a href="#" className="card-link">{data?.price ? `Price: $${data.price}` : "No Price Available"}</a>
            <h6 className="card-title"><button href="#" type="button" onClick={reduce} className="btn">-</button>Quantity : {data.quantity || "N/A"} <button onClick={add} href="#" type="button" className="btn">+</button> </h6>
          </div>
          
          <div>
            <img src= {`${data.image}`} alt={data.description} style={{ width: "100%", height: "125px", objectFit: "contain" }} className="card-img-top" />
          </div>
        </div>
      </div>
    </div>
  );
};
//     category
// : 
// "electronics"
// description
// : 
// "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag"
// id
// : 
// 14
// image
// : 
// "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
// price
// : 
// 999.99
// rating
// : 
// {rate: 2.2, count: 140}
// title
// : 
// "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED "
// _id
// : 
// "6
export default CartItem;
