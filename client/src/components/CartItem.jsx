import React, { useState, useEffect } from 'react';
const url = import.meta.env.VITE_BACKEND_URL;

const CartItem = ({ item }) => {
  const [data, setData] = useState({});
  console.log(item, "itemsssss");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(item.productId, "product ID");
        const response = await fetch(`${url}/product/getProductById?product_id=${item.productId}`, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem('token'),
            "content-type": "application/json",
          },
        });
  
        const result = await response.json();
        console.log(result, "result of get product by id");
        await setData(result[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


  
    fetchData();
  }, [item.productId]);
  
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
            <h6 className="card-title">Quantity : {item.quantity || "N/A"}</h6>
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
