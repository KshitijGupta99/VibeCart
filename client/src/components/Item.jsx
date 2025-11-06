import { useState } from "react";
import PropTypes from "prop-types";
// import { decode as jwtDecode } from "jwt-decode";
// import Cookies from 'js-cookie';

const Item = ({ data, product, onAdd }) => {
  // Accept either `data` or `product` prop (keeps compatibility with different call sites)
  const item = data || product;
  const [errorMsg, setErrorMessage] = useState("");
  const [buffer, setBuffer] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const userId = localStorage.getItem("userId");

  const handleClick = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setErrorMessage("");
    const url = import.meta.env.VITE_BACKEND_URL;

    try {
      setBuffer(true);
      const response = await fetch(
        `${url}/cart/addProductToCart/${userId}/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            productId: item?._id ?? item?.id,
            quantity: quantity,
            price: item?.price,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Added to cart:", result);
      // call optional onAdd callback for local UI updates
      if (typeof onAdd === "function") onAdd(item, quantity);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setBuffer(false);
    }
  };

  if (!item) return null;

  return (
    <div
      className="card my-3 px-4 pb-1 pt-3"
      style={{
        width: "18rem",
        height: "20rem",
        marginLeft: "2em",
        marginRight: "2em",
        position: "relative",
      }}
    >
      <img
        src={item.image}
        alt={item.description || item.title}
        style={{ width: "100%", height: "125px", objectFit: "contain" }}
        className="card-img-top"
      />
      <div className="card-body text-start">
        <h5 className="card-title" style={{ overflow: "hidden", maxHeight: "7vh" }}>
          {item?.title ? (item.title.length > 40 ? `${item.title.slice(0, 40)}...` : item.title) : null}
        </h5>
        <p className="card-text mb-0">
          <b>${Number(item.price).toFixed(2)}</b>
        </p>
        <p className="card-text mt-0">
          {item?.rating?.rate ?? "—"}
          <svg
            style={{ marginTop: -4, marginLeft: 2 }}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            className="bi bi-star"
            viewBox="0 0 16 16"
          >
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
          </svg>
        </p>
        {errorMsg && <p className="text-danger">{errorMsg}</p>}
        {/* quantity selector (optional) */}
        <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={buffer}
          >
            -
          </button>
          <div style={{ minWidth: 32, textAlign: "center" }}>{quantity}</div>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setQuantity((q) => q + 1)}
            disabled={buffer}
          >
            +
          </button>
        </div>
      </div>
      <div className="position-absolute" style={{ bottom: "1em", right: "1em" }}>
        <button type="button" className="btn btn-success" onClick={handleClick} disabled={buffer}>
          {buffer ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
};

Item.propTypes = {
  data: PropTypes.object,
  product: PropTypes.object,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  data: null,
  product: null,
  onAdd: null,
};

export default Item;
