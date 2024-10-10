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
        <div className='container'>
            <nav>
                <ul className='nav'>
                    {['All', 'Electronics', 'Fashion', 'Kitchen', 'Kids', 'Cosmetics'].map(category => (
                        <li key={category} className='nav-item ps-4 font-face'>{category}</li>
                    ))}
                </ul>
            </nav>
            <div className='container row align-items-start' style={{ height: "auto", width: "100vw" }}>
                {items?.map(item => (
                    <Item key={item._id} data={item} />
                ))}
            </div>
        </div>
    );
};

export default ItemContainer;
