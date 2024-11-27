import React, { useEffect, useState } from 'react';
import Item from './Item';
import "../index.css";

const ItemContainer = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("#");
  useEffect(() => {
    const fetching = async () => {
      try {
        let append = '';
        if(category == '#') append = '';
        else append = '/' + category;
        let response = await fetch(`${url}/product/getAllProducts${append}`, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem('token')
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch items");
      }
        var result = await response.json();
        setItems(result);
        console.log(result);;
    
      } catch (error) {
        console.log('Error in fetching items:', error);
        return;
      }
    };
    fetching();
  }, [category]);
return (
  <div className='container'>
    <div>
      <ul className='nav d-flex justify-content-around' style={{backgroundColor: '#775b5b', height: '3rem', fontSize: "2em", fontFamily: "serif"}}>
        <li className='nav-item ps-4 pe-4 font-face' onClick = {()=>setCategory("#")} style={{ backgroundColor: category === "#" ? "#a7a7a770" : "#775b5b" , borderRadius : "3em"}}>All</li>
        <li className='nav-item ps-4 pe-4 font-face' onClick = {()=>setCategory("men's clothing")}  style={{ backgroundColor: category === "men's clothing" ? "#a7a7a770" : "#775b5b" , borderRadius : "3em"}}>Men</li>
        <li className='nav-item ps-4 pe-4 font-face' onClick = {()=>setCategory("jewelery")} style={{ backgroundColor: category === "jewelery" ? "#a7a7a770" : "#775b5b" , borderRadius : "3em"}}>Jewelery</li>
        <li className='nav-item ps-4 pe-4 font-face' onClick = {()=>setCategory("electronics")} style={{ backgroundColor: category === "electronics" ? "#a7a7a770" : "#775b5b" , borderRadius : "3em"}}>Electronics</li>
        <li className='nav-item ps-4 pe-4 font-face' onClick = {()=>setCategory("women's clothing")} style={{ backgroundColor: category === "women's clothing" ? "#a7a7a770" : "#775b5b" , borderRadius : "3em"}}>Women</li>
      </ul>
    </div>
    <div className='container row align-items-start' style={{ height: "auto", width: "100vw" }}>
      {(items)?.map((item) => {
        return <Item key={item._id} data={item} />
      })}
    </div>


  </div>
)
}

export default ItemContainer;
