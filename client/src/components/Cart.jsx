import React from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const Cart = ({ data }) => {
  const navigate = useNavigate();
  // Debugging log
  

  const handleClick = () => {
    navigate("/checkout");
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header py-2">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Your Cart
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div>
              {/* Correctly check and map products */}
              {data?.[0]?.products?.length > 0 ? (
                data[0].products.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))
              ) : (
                <p>No items in the cart.</p>
              )}
            </div>
            {
              data?.[0]?.products?.length > 0 ?(<h5>Total: ${data[0].total.toFixed(2)}</h5>) : <p>No item</p>
            }
            
            <div className="modal-footer py-2">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  background:
                    "linear-gradient(to bottom right, #cc66ff 0%, #3399ff 100%)",
                }}
                onClick={handleClick}
              >
                CheckOut
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
