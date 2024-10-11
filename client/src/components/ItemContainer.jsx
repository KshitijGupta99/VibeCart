import React, { useEffect, useState } from 'react';
import Item from './Item';
import "../index.css";

const ItemContainer = () => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${url}/product/getAllProducts`, {
                    method: "GET",
                    headers: {
                        "auth-token": localStorage.getItem('token')
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch items");
                }

                const result = await response.json();
                setItems(result);
            } catch (error) {
                console.log('Error in fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className=' mx-0 py-5 max-vw-100'style={{width:'100vw', backgroundColor:'#c8e5e1'}} >
            <nav className='my-3' >
                <ul className='nav d-flex justify-content-around' style = {{width: '100vw', alignItems:'center'}}>
                    {['All', 'Electronics', 'Fashion', 'Kitchen', 'Kids', 'Cosmetics'].map(category => (
                        <li key={category} style={{fontFamily: 'serif'}} className='fs-3 nav-item px-4 font-face bg-warning-subtle'>{category}</li>
                    ))}
                </ul>
            </nav>
            <div className='ms-4 me-4 row align-items-start d-flex justify-content-between' style={{ height: "auto", width: '97vw' }}>
                {items?.map(item => (
                    <Item key={item._id} data={item} />
                ))}
            </div>
        </div>
    );
};

export default ItemContainer;
