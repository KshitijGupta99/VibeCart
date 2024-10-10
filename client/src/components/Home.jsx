import React, { useState } from 'react'
import ItemContainer from './ItemContainer';
import { Navigate } from "react-router-dom";
import Sidebar from './Sidebar';
import Cart from './Cart';

const Home = () => {
  // document.getElementById("root").style.backgroundImage("none")
  document.body.style.backgroundImage = "none";
  const[CartVisible, SetCartVisible] = useState(false);
  function toggleCart(){
    if (CartVisible){
      SetCartVisible(false);
    } else {
      SetCartVisible(true);
    }
  }
  return (
    <>
      
      <Sidebar/>

      <div className="container-fluid max-vw-100 ">
        <div className="row">
          <div className="col  py-1 d-flex justify-content-between">
          

            <div><button className="pt-0 btn float-end" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button">
              <i className="bi bi-arrow-right-square-fill fs-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"><img src="client\public\icon.png" alt="logo image" /></i>
            </button></div>


            <div className=''  >
              <input style={{ width: '25vw' }} placeholder='   Search your item...' type="text" />
            </div>


            <div className='btn ' data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ width: '9%' }} onClick={toggleCart}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart3 className='position-relative mt-2 mb-4" style={{ top: '3px' }} viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </div>


          </div>
        </div>
        <ItemContainer />
      </div> 
      
      {/* {
        CartVisible ? <Cart /> : null
      } */}
      <Cart/>

    </>
  )
}

export default Home
