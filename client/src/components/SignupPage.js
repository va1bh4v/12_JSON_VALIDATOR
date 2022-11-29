
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./login_style.css"

const BACKEND_URL = 'http://localhost:5001/api/';

function Loginpage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        var r = JSON.stringify({ email, password, role });
        console.log(r);
        const response = await fetch(`${BACKEND_URL}register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, role })
        })
        const data = await response.json();
        if (data.msg) {
            console.log(data.msg);
            if (data.msg == "User created successfully") {
                alert(data.msg);

                navigate('/login');
            }
            else
                alert(data.msg);
        } else {
            console.log(data);
            alert(data.msg);
            props.setUser(data);
            navigate('/singup');
        }
    }

    return (
        <div className="login" >


            <div className='row' style={{ width: "100%", height: "100%" }}>
                <div className='col' style={{ height: "100vh", background: "#b2cfcb" }}>
                    <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
                        <div style={{ width: "auto", height: "auto" }}>
                            <div className='d-flex justify-content-center align-items-center' style={{ width: "400px", height: "500px" }}>
                                <div style={{ width: "395px", height: "250px" }}>
                                    {/* <img alt="piyush" style={{ borderRadius: "20px", width: "100%" }} /> */}
                                    <div id="wrapper" >
                                        <div id="typing-demo" style={{ fontSize: "25px" }} >
                                            Requirement Specification Tool
                                        </div>
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <h2 style={{ textAlign: "center" }}>About</h2>
                                    <div className="d-flex justify-content-center align-items-center" style={{ textAlign: "justify ", width: "450px" }} id="about" >
                                        To fulfill the required expectations at the very basic we need a web app to facilitate the processing of the given requirement specifications. Accompanied with a proper database setup to store the different user base and the save the progress of their respective progress over the projects for future references. And over this web app, we would need a validator system working in the background to provide the validation services to the users.
                                        The validator system should be able to identify any validator grammar provided and it should be able to validate any given data.

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='col' style={{ height: "100vh", width: "100%", background: "#048c7c" }}>
                    <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
                        <div style={{ width: "auto", height: "auto" }}>
                            <div className='d-flex justify-content-center align-items-center' style={{ width: "500px", height: "600px" }}>
                                <form className='justify-content-center align-items-center' style={{}}>
                                    <div>
                                        <input className='my-3' type="email" placeholder='Email' style={{ textAlign: "center", height: "70px", width: "330px", borderRadius: "20px" }} value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div>
                                        <input className='my-3' type="password" placeholder='Password' style={{ textAlign: "center", height: "70px", width: "330px", borderRadius: "20px" }} value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                    <select className="my-2" id="role" style={{ textAlign: "center", width: "130px", height: "50px", borderRadius: "20px" }} value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="" >Select</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                    <div className=' d-flex justify-content-end' style={{ width: "100%" }}>
                                        <input value="Register" className='justify-content-end' style={{ borderRadius: "20px", width: "120px", height: "40px" }} type="submit" onClick={handleSubmit} />
                                    </div>
                                    <div className='mt-3 d-flex justify-content-center' style={{ width: "100%", fontWeight: "400", fontSize: "25px" }}  >
                                        <p>Already a Member ?<a href="login" style={{ color: "pink" }}> Login</a></p>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div className='row' style={{ width: "100%", height: "100%" }}>
                <div className='col' style={{ height: "100vh", background: "#b2cfcb" }}>
                    <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
                        <div style={{ width: "auto", height: "auto" }}>
                            <div className='d-flex justify-content-center align-items-center' style={{ width: "400px", height: "500px" }}>
                                <div style={{ width: "395px", height: "250px" }}>
                                    {/* <img alt="piyush" style={{ borderRadius: "20px", width: "100%" }} /> */}
                                    <div id="wrapper" >
                                        <div id="typing-demo">
                                            Requirement Specification Tool
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col' style={{ height: "100vh", width: "100%", background: "#048c7c" }}>
                    <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
                        <div style={{ width: "auto", height: "auto" }}>
                            <div className='d-flex justify-content-center align-items-center' style={{ width: "500px", height: "600px" }}>
                                <form className='justify-content-center align-items-center' style={{}}>
                                    <div>
                                        <input className='my-2' placeholder='Email' style={{ height: "50px", width: "280px", borderRadius: "20px" }} value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div>
                                        <input className='my-2' placeholder='Password' style={{ height: "50px", width: "280px", borderRadius: "20px" }} value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div>
                                        <input className='my-2' placeholder='Password' style={{ height: "50px", width: "280px", borderRadius: "20px" }} />
                                    </div>
                                    <div>
                                        <input className='my-2' placeholder='Password' style={{ height: "50px", width: "280px", borderRadius: "20px" }} />
                                    </div>
                                    <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                    <div className=' d-flex justify-content-end' style={{ width: "100%" }}>
                                        <input className='justify-content-end' style={{ borderRadius: "20px", width: "120px", height: "40px" }} type="submit" onClick={handleSubmit} />
                                    </div>
                                    <div className='mt-3 d-flex justify-content-end' style={{ width: "100%" }}  >
                                        <p>To Register <a>click here</a></p>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );





}

export default Loginpage;
