import React, { useEffect, useState } from 'react';
import Item from './Item';
import "../index.css";

const ItemContainer = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("All");
  useEffect(() => {
    const fetching = async () => {
      try {
        let response = await fetch(`${url}/product/getAllProducts`, {
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
        return <Item key={item._id} data={item} />
      })}
    </div>


  </div>
)
}

export default ItemContainer;
