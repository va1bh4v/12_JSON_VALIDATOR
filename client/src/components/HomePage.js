import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react'
import "./HomePage.css"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
let strData

function navTOlogin() {
    var curr_email = sessionStorage.getItem("email")
    if (curr_email == null) {
        alert("login first")
        window.location.href = "login"
    }
}


function takeValidator() {
    // const content = document.querySelector('.content');
    let data
    var validator_TA = document.getElementById("validator_TA")
    strData = validator_TA.value


    // strData = reader.result
    data = JSON.parse(strData)
    console.log(data)
    var name = document.getElementById("f_name").value
    // const name = file['name']
    const content = JSON.stringify(data)
    fetch('http://localhost:5001/api/validator', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, data: content })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert(data.msg)
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(data.msg)

        });



    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            // console.log(`${key}: ${data[key]}`);
            // console.log(key, data[key])
            // for(const subkey in data[key]){
            //     if(data[key].hasOwnProperty(subkey)){
            //         // console.log(`${key}: ${data[key][subkey]}`)
            //         console.log(data[key][subkey])
            //     }
            // }
        }
    }





}
function logout() {

    sessionStorage.removeItem("email")
    sessionStorage.removeItem("stage")
    sessionStorage.removeItem("project")
    window.location.href = "login"


}




function HomePage() {
    // const navigate = useNavigate();
    var curr_email = sessionStorage.getItem("email");
    useEffect(() => {
        console.log('i fire once');
        navTOlogin();
        // update_table();
    }, []);
    return (
        <>
            <Navbar bg="info" expand="lg">
                {/* wrapper and child for logo */}
                <Navbar.Brand href="home" >
                    <div id="wrapper">
                        {/* <img src="https://www.pngitem.com/pimgs/m/146-1468479_transparent-background-json-logo-hd-png-download.png" alt="logo" /> */}
                        <div id='typing-demo'>
                            Requirement Specification Tool</div>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    < Nav className="me-auto">
                        <Nav.Link href="project">Projects</Nav.Link>
                    </Nav>
                    <Nav className="me-auto justify-content-end" style={{width:"100%"}}>
                        <button type="button" class="btn btn-danger" onClick={logout}>Logout</button>
                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link href="project" style={{ color: "black" }}>{curr_email}</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
            {/* <div className='row'>
            </div> */}
            <div className='row mt-5' >
                <textarea id="validator_TA" className="container" style={{ height: "70vh", width: "90%", resize: "none" }} placeholder="Enter JSON here"></textarea>
            </div>

            <div className='text-center mt-4'>
                <input id="f_name" type="text" placeholder="Enter file name" />

                <button onClick={() => { takeValidator() }} className='text-center btn btn-primary'>Submit</button>
            </div>


        </>
    );
    // navTOlogin()
    // return (
    //     <div>
    //         <h1>Admin Page</h1>
    // <div className="content">
    //     Enter Validator file
    //     <input type="file" onChange={takeValidator} />
    //     {/* Enter Scene JSON file
    //     <input type="file" onChange={validateFile} /> */}
    // </div>



    //     </div>

    // )

}

export default HomePage;