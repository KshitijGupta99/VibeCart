import React, { useState, useEffect } from "react";
import ItemContainer from "./ItemContainer";
import { useNavigate } from "react-router-dom";
// import { decode as jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Sidebar from "./Sidebar";
import Cart from "./Cart";
const url = import.meta.env.VITE_BACKEND_URL;
import sample from "../assets/bgVid.mp4";

const Home = () => {
  const navigate = useNavigate();

  //   <video autoplay muted loop id="myVideo">
  //   <source src="rain.mp4" type="video/mp4">
  // </video>
  // document.getElementById("root").style.backgroundImage("none")
  document.body.style.backgroundImage = "none";
  const [CartVisible, SetCartVisible] = useState(false);
  function toggleCart() {
    if (CartVisible) {
      SetCartVisible(false);
    } else {
      SetCartVisible(true);
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
    } else {
      console.log("User is logged in. userId:", userId);
    }
  }, []);

  // Retrieve the userId cookie

  // const token = localStorage.getItem("auth-token");
  // var userId = '';
  // if (token) {
  //   const decodedToken = jwtDecode(token);
  //   userId = decodedToken.userId; // Replace `userId` with the key used in your token.
  //   console.log(userId);
  // }

  const [CartData, setCartData] = useState([]);
  const fetchData = async () => {
    try {
      let userId = localStorage.getItem("userId");
      const response = await fetch(`${url}/cart/getcartdetails/${userId}`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "content-type": "application/json",
        },
      });

      const result = await response.json();
      setCartData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      {}

      <Sidebar />
      <div
        className="container-fluid max-vw-100 p-0 bg-opacity-0 "
        style={{ backgroundColor: "none" }}
      >
        <div style={{ background: "none" ,zIndex: "0"}} className="col pt-3  my-3 d-flex justify-content-between">
          <video
            className="videoTag"
            autoPlay
            loop
            muted
            style={{
              position: "fixed",
              zIndex: "0",
              width: "100vw",
              height: "100vh", // Add this to cover the full viewport
              top: 0, // Ensure it starts from the top of the viewport
              left: 0, // Ensure it starts from the left of the viewport
            }}
          >
            <source src={sample} type="video/mp4" />
          </video>

          <div style={{ backgroundColor: "none" }}>
            <button
              className="pt-0 btn float-end px-5"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvas"
              role="button"
              style={{zIndex: 1}}
            >
              <i
                className="bi bi-arrow-right-square-fill fs-3"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvas"
              >
                <img src="icon.png" height="60vh" alt="logo image" />
              </i>
            </button>
          </div>

          <div className="" style={{ backgroundColor: "none" }}>
            <input
              className="rounded-pill"
              style={{ width: "28vw", height: "4vh", opacity: "80%" }}
              placeholder="   Search your item..."
              type="text"
            />
          </div>

          <div
            className="btn d-flex mt-4 me-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => {
              fetchData(); // Call fetchData
              toggleCart();
            }}
            style={{
              zIndex:"0",
              justifyContent: "center",
              alignItems: "center",
              width: "4%",
              height: "10%",
              position: "relative",
            }}
          >
            <img
              src="cloud.png"
              className="mt-1"
              width="130"
              height="130"
              style={{ position: "absolute" }}
            />
            <img
              src="shopping-cart.png"
              width="40"
              height="40"
              style={{ position: "absolute" }}
            />
          </div>
        </div>
        <ItemContainer />
      </div>

      <Cart data={CartData} />
    </>
  );
};

export default Home;
