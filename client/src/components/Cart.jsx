import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL;

const Cart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/cart/getcartdetails/67077c963a43fcac1c5046e0`, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem('token'),
            "content-type": "application/json"
          },
        });

        const result = await response.json();
        setData(result); // Set data with fetched result
        console.log("Fetched Data:", result); // Log the result
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    navigate('/checkout');
  };

  // Render loading state or data

  if (!loading) {
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
                {data && data.products && data.products.length > 0 ? (
                  data.products.map((item) => (
                    <CartItem key={item._id} item={item} />
                  ))
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </div>
              <div>
                <h5>Total quantity is {data?.total || 0}</h5>
              </div>
              <div className="modal-footer py-2">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" style={{ background: "linear-gradient(to bottom right, #cc66ff 0%, #3399ff 100%)" }} onClick={handleClick}>CheckOut</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
}

export default Cart;
