import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Signup = () => {

    const navigate = useNavigate();

    const url = import.meta.env.VITE_BACKEND_URL;
    const[creds,setCreds] = useState({
        username : "",
        email : "",
        password :''
    })
    const[errorMsg, seterrorMsg] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{

            let response = await fetch(`${url}/user/register`,{
                method : "POST",
                headers: {
                    "Content-type" : 'application/json'
                },
                body: JSON.stringify({username: creds.username, email :creds.email, password: creds.password})
            });

            if(response.ok){
                const data = await response.json();
                localStorage.setItem('token', data?.token);
                localStorage.setItem('userId', data?.userId);
                seterrorMsg("");
                console.log("Signup success");
                navigate('/')
            }
            else if( response.status == 401){
                seterrorMsg("Invalid email");
                console.log("user Exsist");
                alert("User Already Exsist with this Email");
            }else if( response.status == 403){
                seterrorMsg("Invalid username");
                console.log("user Exsist");
                alert("User Already Exsist with this Username");
            }
            else{
                seterrorMsg("server Error")
                console.log("antarik error");
            }

        }catch(err){
            console.log("error", err);
        }
        // Handle form submission
        
        
        console.log(creds);
    };
    const onchange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }
    const togglePass = (e) => {
        const eye = e.target;
        const x = document.getElementById("password");

        if (x.type === "password") {
            x.type = "text";
            eye.src = "eyeopen.png";
        } else {
            x.type = "password";
            eye.src = "eyebrowClose.png";
        }
    };

    return (

        <div className="d-flex justify-content-center shadow p-3 mb-5 bg-body-tertiary rounded " style={{ borderRadius: 3 + "vh", height: 60 + 'vh', border: 2 + 'px solid black', backgroundColor: '#c7c7c79c', paddingLeft: 0 + 'px', width: 33 + "vw", textAlign: 'center' }}>
            <div className="  h-100" style={{ height: 80 + 'vh' }}>
                <div className="align-items-center h-100" style={{ height: 80 + 'vh', fontSize: 21 + 'px' }}>

                    <h3 className="text-center coatainer mb-4 mt-3">SignUp</h3>
                    <form onSubmit={handleSubmit} className='' style={{ height: 70 + 'vh', fontFamily: 'Verdana' }}>
                        <div className="form-group d-flex justify-content-around" style={{ marginBottom: 2 + 'vh', position: 'center' }}>
                            <label htmlFor="email" style={{}}>Email address</label>
                            <input
                                style={{
                                    height: 6 + 'vh', fontSize: 21 + 'px', color: "#5d5454", fontFamily: 'Verdana', border: '1px solid #ccc',
                                    outline: 'none',
                                    boxShadow: 'none'
                                }}
                                name='email'
                                onFocus={(e) => e.target.style.border = '1px solid #ccc'}
                                onBlur={(e) => e.target.style.border = '1px solid #ccc'}
                                type="email"
                                className="form-control"
                                id="email"
                                value={creds.email}
                                onChange={onchange}
                                required
                            />
                        </div>
                        <div className="form-group d-flex justify-content-around" style={{ marginBottom: 2 + 'vh', position: 'center' }}>
                            <label htmlFor="email" style={{}}>UserName</label>
                            <input
                                style={{
                                    height: 6 + 'vh', fontSize: 21 + 'px', color: "#5d5454", fontFamily: 'Verdana', border: '1px solid #ccc',
                                    outline: 'none',
                                    boxShadow: 'none'
                                }}
                                name='username'
                                onFocus={(e) => e.target.style.border = '1px solid #ccc'}
                                onBlur={(e) => e.target.style.border = '1px solid #ccc'}
                                type="text"
                                className="form-control"
                                id="username"
                                value={creds.username}
                                onChange={onchange}
                                required
                            />
                        </div>
                        <div className="form-group d-flex justify-content-around" style={{ marginBottom: 2 + 'vh', position: 'center' }}>

                            <label htmlFor="password me-2" style={{}}>Password </label>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <input
                                    style={{
                                        marginLeft: '1vh',
                                        height: '6vh',
                                        width: '98%',
                                        fontSize: '21px',
                                        border: '1px solid #ccc',
                                        paddingRight: '40px', // Provide space for the image
                                        outline: 'none',
                                        boxShadow: 'none'
                                    }}
                                    name='password'
                                    onBlur={(e) => e.target.style.border = '1px solid #ccc'}
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={creds.password}
                                    onChange={onchange}
                                    required
                                />
                                <img
                                    src="eyebrowClose.png"
                                    alt="show"
                                    style={{
                                        height: '2vw',
                                        width: '2vw',
                                        position: 'absolute',
                                        top: '50%',
                                        right: '10px',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                    }}
                                    onClick={togglePass}
                                />
                            </div>
                        </div>

                        <button type="submit" className="mt-5 btn btn-primary btn-block">
                            SignUp
                        </button>
                        
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Signup
