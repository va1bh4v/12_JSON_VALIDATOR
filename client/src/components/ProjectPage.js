import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Project.css"


const BACKEND_URL = 'http://localhost:5001/api/';


function navTOlogin() {
    var curr_email = sessionStorage.getItem("email")
    if (curr_email == null) {
        alert("login")
        window.location.href = "login"
    }

}

function logout() {

    sessionStorage.removeItem("email")
    sessionStorage.removeItem("stage")
    sessionStorage.removeItem("project")
    window.location.href = "login"


}

function Project(props) {

    const navigate = useNavigate();
    var curr_email = sessionStorage.getItem("email")

    const [projectName, setProjectName] = useState('');



    const handlecreate = async (e) => {
        sessionStorage.setItem("stage", 1)
        e.preventDefault();
        console.log(e);
        var projectStage = 1;
        var proj_json = JSON.stringify({ "name": projectName, "owner": curr_email, "stage": projectStage });
        console.log(proj_json);

        const response = await fetch(`${BACKEND_URL}addProject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: proj_json
        })

        const data = await response.json();
        if (data.msg) {
            console.log(data.msg);
            if (data.msg == "Project created successfully") {
                alert(data.msg);
                update_table();
                // navigate('/project');
            }
            else
                alert(data.msg);
        }
        else {
            console.log(data);
            alert(data.msg);

            // props.setUser(data);
            // navigate('/project');
        }
    }

    function print_table(data) {
        var table = document.getElementById("projtable");
        table.insertRow(-1).innerHTML = "<th>Project Name</th><th>Project Owner</th><th>Project Stage</th><th>Project Action</th>";
        for (var i = 0; i < data.length; i++) {
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = data[i].name;
            cell2.innerHTML = data[i].owner;
            cell3.innerHTML = data[i].stage;
            cell4.innerHTML = "<button type='button' class='btn btn-primary'>Edit</button>";
            // navigte edit button to /user
            document.getElementById("projtable").rows[i + 1].cells[3].childNodes[0].onclick = function () {
                navigate('/user');
                sessionStorage.setItem("project", this.parentNode.parentNode.cells[0].innerHTML);
            }


        }

    }


    const handleget = async (e) => {

        var usr = sessionStorage.getItem("email")
        var allProjects = JSON.stringify({ "owner": usr });

        const response = await fetch(`${BACKEND_URL}allProjects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: allProjects
        })



        const data = await response.json();
        console.log(data)
        if (data.data) {
            console.log(data.data);
            print_table(data.data);

        }
        else {
            console.log(data);
            alert(data.msg);
            props.setUser(data);
            // navigate('/project');
        }
    }
    function update_table() {
        var table = document.getElementById("projtable");
        for (var i = table.rows.length - 1; i > -1; i--) {
            table.deleteRow(i);
        }
        handleget();
    }

    useEffect(() => {
        console.log('i fire once');
        sessionStorage.setItem("stage", 1)
        navTOlogin();
        update_table();
    }, []);

    var curr_email = sessionStorage.getItem("email")
    return (
        <div className="Project">
            <Navbar bg="info" expand="lg">
                <Navbar.Brand href="project" >
                    <div id="wrapper">
                        {/* <img src="https://www.pngitem.com/pimgs/m/146-1468479_transparent-background-json-logo-hd-png-download.png" alt="logo" /> */}
                        <div id='typing-demo'>
                            Requirement Specification Tool</div>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="project" style={{ color: "black" }}>Projects</Nav.Link>
                    </Nav>
                    <Nav className="me-auto justify-content-end" style={{width:"100%"}}>
                        <button type="button" class="btn btn-danger" onClick={logout}>Logout</button>
                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link href="project" style={{ color: "black" }}>{curr_email}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <br>
            </br>

            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Project</h1>
                        <form onSubmit={handlecreate}>
                            <div className="form-group">
                                <label htmlFor="projectName">Enter Project Name</label>
                                <input type="text" className="form-control" id="projectName" placeholder="Enter Project Name" onChange={(e) => setProjectName(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <h1>Project List</h1>
                        <table id="projtable" className="table table-striped table-bordered">
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default Project;
