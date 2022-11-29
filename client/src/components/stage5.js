import React, { useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


function navtouser(Stage) {
    sessionStorage.setItem("stage", Stage);
    window.location.href = "/user";
}

async function print_json() {

    var curr_email = sessionStorage.getItem("email")
    // var curr_stage = sessionStorage.getItem("stage")
    var curr_proj = sessionStorage.getItem("project")
    console.log(curr_email, curr_proj);

    var BACKEND_URL = 'http://localhost:5001/api/';
    var alljson_body = JSON.stringify({ "email": curr_email, "proj_name": curr_proj });

    const response = await fetch(`${BACKEND_URL}alljson`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: alljson_body
    })

    const data = await response.json();
    console.log(data);
    var json1tA = document.getElementById("json1");
    var json2tA = document.getElementById("json2");
    var json3tA = document.getElementById("json3");

    if (response.status === 200) {


        var json_Ob = JSON.parse(data[0]["json_obj"]);

        json1tA.value = JSON.stringify(json_Ob["1"], null, 2);
        json2tA.value = JSON.stringify(json_Ob["2"], null, 2);
        json3tA.value = JSON.stringify(json_Ob["3"], null, 2);


    }

    var all_json = json1tA.value + "\n" + json2tA.value + "\n" + json3tA.value

    var create = document.getElementById('create');

    create.addEventListener('click', function () {

        var log_file = new Blob([all_json], { type: 'text/plain' });
        if (log_file !== null) {
            window.URL.revokeObjectURL(log_file);
        }
        log_file = window.URL.createObjectURL(log_file);
        var link = document.createElement('a');
        link.setAttribute('download', 'json_file.txt');
        link.href = log_file;
        document.body.appendChild(link);
        window.requestAnimationFrame(function () {
            var event = new MouseEvent('click');
            link.dispatchEvent(event);
            document.body.removeChild(link);
        });
    }, false);

}

function logout() {

    sessionStorage.removeItem("email")
    sessionStorage.removeItem("stage")
    sessionStorage.removeItem("project")
    window.location.href = "login"


}



function Stage5() {

    useEffect(() => {
        // document.title = "Stage 5";
        print_json();
    }, []);
    var curr_email = sessionStorage.getItem("email")


    return (
        <>
            <Navbar bg="info" expand="lg">
                <Navbar.Brand href="stage5" >
                    <div id="wrapper">
                        <div id='typing-demo'>
                            Requirement Specification Tool</div>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="project">Projects</Nav.Link>
                    </Nav>
                    <Nav className="me-auto justify-content-end" style={{width:"100%"}}>
                        <button type="button" class="btn btn-danger" onClick={logout}>Logout</button>
                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link href="user" style={{ color: "black" }}>{curr_email}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className='containe'>
                <div className='containe my-3 mt-4'>
                    <div className='text-center mx-3'>
                        <button id="stage1" className='btn btn-outline-info btn-lg mr-4' onClick={() => navtouser(1)} >1</button>
                        <button id="stage2" className='btn btn-outline-info btn-lg mr-4' onClick={() => navtouser(2)} >2</button>
                        <button id="stage3" className='btn btn-outline-info btn-lg mr-4' onClick={() => navtouser(3)}>3</button>
                        <button id="stage4" className='btn btn-outline-info btn-lg mr-4' onClick={() => navtouser(4)}>4</button>
                        <button id="stage5" className='btn btn-outline-info btn-lg mr-4' >5</button>
                    </div>
                </div>
                {/* 
                    <div className='row'>
                        <div className='mt-2'></div>
                    </div> */}
                {/* Text area for saving json */}
                <br>
                </br>
                <div className='row mx-5'>
                    <div className='col' >
                        <textarea id="json1" className="container" style={{ height: "70vh", width: "90%", resize: "none" }} placeholder="Enter JSON here"></textarea>
                    </div>
                    <div className='col' >
                        <textarea id="json2" className="container" style={{ height: "70vh", width: "90%", resize: "none" }} placeholder="Enter JSON here"></textarea>
                    </div>
                    <div className='col' >
                        <textarea id="json3" className="container" style={{ height: "70vh", width: "90%", resize: "none" }} placeholder="Enter JSON here"></textarea>
                    </div>
                </div>


                <button id="create">Download JSON_FILE</button>
            </div>
        </>
    );
}


export default Stage5;