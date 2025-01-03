import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
const url  =  import.meta.env.VITE_BACKEND_URL;
const Login = () => {
    
    const navigate = useNavigate();

    //document.getElementById('root').style.backgroundImage = "url(..\\public\\bg.jpg)";
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, seterrorMsg] = useState('');

    
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
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            let response = await fetch(`${url}/user/login`,{
                method : "POST",
                headers: {
                    "Content-type" : 'application/json'
                },
                body: JSON.stringify({username, password})
            });
            console.log(response)
            if(response.ok){
                const data = await response.json();
                console.log(data)
                localStorage.setItem('token', data?.token);
                localStorage.setItem('userId', data?.userId);
                seterrorMsg("");
                navigate('/');
            }
            else if( response.status == 401){
                seterrorMsg("Invalid Creds");
                
                console.log("login error galat creds");
                
            }
            else{
                seterrorMsg("server Error")
                console.log("antarik error");
            }
        }catch(err){
            console.log("error", err);
        }
    }
    return (

        <div className="d-flex justify-content-center shadow p-3 mb-5" style={{ backgroundColor: "none;", backgroundImage:"none", borderRadius: 3 + "vh", height: 60 + 'vh', border: 2 + 'px solid black', paddingLeft: 0 + 'px', width: 33 + "vw", textAlign: 'center' }}>
            <div className="  h-100" style={{ height: 80 + 'vh' }}>
                <div className="align-items-center h-100" style={{ height: 80 + 'vh', fontSize: 21 + 'px' }}>

                    <h3 className="text-center coatainer mb-4 mt-3">Login</h3>
                    <form onSubmit={handleSubmit} className='' style={{ height: 70 + 'vh', fontFamily: 'Verdana' }}>
                        <div className="form-group d-flex justify-content-around" style={{ marginBottom: 2 + 'vh', position: 'center' }}>
                            <label htmlFor="text" style={{}}> Enter Username :</label>
                            <input
                                style={{
                                    height: 6 + 'vh', fontSize: 21 + 'px', color: "#5d5454", fontFamily: 'Verdana', border: '1px solid #ccc',
                                    outline: 'none',
                                    boxShadow: 'none'
                                }}

                                onFocus={(e) => e.target.style.border = '1px solid #ccc'}
                                onBlur={(e) => e.target.style.border = '1px solid #ccc'}
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                                    onFocus={(e) => e.target.style.border = '1px solid #ccc'}
                                    onBlur={(e) => e.target.style.border = '1px solid #ccc'}
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                            Login
                        </button>
                        <div  className='mt-2'>
                         <h6><a className='text-light-emphasis'  href=''>Forgot Your Password</a></h6>
                        
                        <h5 className='' style={{color: '#c1b3b3'}}>New User?<a className='text-light-emphasis' onClick={()=>{
                            navigate('/signup')
                        }} href=''> Click Here</a></h5>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login
