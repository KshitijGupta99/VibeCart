import React, { useState } from 'react';

const Item = ({ data }) => {
    // console.log(data);
    const [errorMsg, setErrorMessage] = useState("");
    const [buffer, setBuffer] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleClick = async (e) => {
        setErrorMessage("");
        const url = import.meta.env.VITE_BACKEND_URL;
        e.preventDefault();
        
        try {
            console.log(data.id, " propduct ID");
            setBuffer(true);
            const response = await fetch(`${url}/cart/addProductToCart/67370126b62a527033831a34/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    productId: data.id,
                    quantity: quantity,
                    price: data.price,
                }),
            });
            

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log("Added to cart:", result); // Optional: log the result for debugging
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An error occurred. Please try again.");
        } finally {
            setBuffer(false);
        }
    };

    return (
        <div className="card my-3 px-4 pb-1 pt-3" style={{ width: "18rem", height: "20rem", marginLeft: '1em', marginRight: '1em' }}>
            <img src={data.image} alt={data.description} style={{ width: "100%", height: "125px", objectFit: "contain" }} className="card-img-top" />
            <div className="card-body text-start">
                <h5 className="card-title" style={{ overflow: "hidden", maxHeight: '7vh' }}>
                    {data?.title ? (data.title.length > 40 ? `${data.title.slice(0, 40)}...` : data.title) : null}
                </h5>
                <p className="card-text mb-0"><b>${data.price}</b></p>
                <p className="card-text mt-0">
                    {data.rating.rate}
                    <svg style={{ marginTop: -4, marginLeft: 2 }} xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                    </svg>
                </p>
                {errorMsg && <p className="text-danger">{errorMsg}</p>}
            </div>
            <div className="position-absolute" style={{ bottom: '1em', right: '1em' }}>
                <button type="button" className="btn btn-success" onClick={handleClick} disabled={buffer}>
                    {buffer ? 'Adding...' : 'Add'}
                </button>
            </div>
        </div>
    );
};

export default Item;
