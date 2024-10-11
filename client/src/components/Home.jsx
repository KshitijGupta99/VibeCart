import React, { useState } from 'react'
import ItemContainer from './ItemContainer';
import { Navigate } from "react-router-dom";
import Sidebar from './Sidebar';
import Cart from './Cart';

const Home = () => {
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
  return (
    <>

      <Sidebar />

      <div className="container-fluid max-vw-100 p-0 ">
        <div className="row w-100" style={{
          backgroundImage: `url('../public/mall_bg.jpg')`,
          backgroundSize: 'cover', // To cover the entire div
          backgroundPosition: 'center', // To center the image
          backgroundRepeat: 'no-repeat', // Prevent the image from repeating
          height: '40vh', // Full viewport height
          width: '100%' // Full width
        }}>
          <div className="col pt-3  my-3 d-flex justify-content-between">


            <div><button className="pt-0 btn float-end px-5" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button">
              <i className="bi bi-arrow-right-square-fill fs-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"><img src="..\public\icon.png" height='60vh'  alt="logo image" /></i>
            </button></div>


            <div className=''  >
              <input className='rounded-pill' style={{ width: '28vw', height: '4vh', opacity: '80%' }} placeholder='   Search your item...' type="text" />
            </div>


            <div className='btn d-flex mt-4 me-3' data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ justifyContent: 'center', alignItems: 'center', width: '4%', height: '10%', position: 'relative' }} onClick={toggleCart}>

              <img src='../public/CLOUD.png' className='mt-1' width="130" height="130" style={{ position: 'absolute' }} />
              <img src='../public/shopping-cart.png' width="40" height="40" style={{ position: 'absolute' }} />
            </div>


          </div>
        </div>
        <ItemContainer />
      </div>

      {/* {
        CartVisible ? <Cart /> : null
      } */}
      <Cart />

    </>
  )
}

export default Home
