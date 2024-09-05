import React from 'react'
import "../index.css"
import { useState, useEffect } from 'react';
import Item from './Item';

const ItemContainer = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetching = async () => {
      try {
        let response = await fetch(`${url}/product/getitems`, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem('token')
          },
        });
        var result = await response.json();
        setItems(result);
        console.log(result);;
    
      } catch {
        console.log('Error in fetching items');
        return;
      }
    };
    fetching();
  }, []);
return (
  <div className='container'>
    <div>
      <ul className='nav '>
        <li className='nav-item ps-4 font-face'>All</li>
        <li className='nav-item ps-4 font-face'>electronics</li>
        <li className='nav-item px-4 font-face'>Fashion</li>
        <li className='nav-item px-4 font-face'>Kitchen</li>
        <li className='nav-item px-4 font-face'>Kids</li>
        <li className='nav-item px-4 font-face'>Cosmetics</li>
      </ul>
    </div>
    <div className='container row align-items-start' style={{ height: "auto", width: "100vw" }}>
      {(items)?.map((item) => {
        return <Item key={item.id} data={item} />
      })}
    </div>


  </div>
)
}

export default ItemContainer
