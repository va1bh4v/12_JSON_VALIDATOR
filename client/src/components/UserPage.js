import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import "./HomePage.css";

var chk = 0
function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


async function validateFile(stage) {


    var strData = document.getElementById("json").value
    if (isJsonString(strData)) {
        console.log("valid json")

    }
    else {
        alert("Invalid JSON")
        return
    }

    const new_data = JSON.parse(strData)

    // push json in db
    var proj_name = sessionStorage.getItem("project")

    console.log("new_Data ", new_data)
    var send_json_body = JSON.stringify({
        "name": proj_name,
        "stage": stage,
        "json_str": new_data

    });
    console.log("send_json_body: ", send_json_body)
    const res = await fetch('http://localhost:5001/api/json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: send_json_body
    })
    console.log(res)
    const validator_name = document.getElementById("validators").value;
    if (validator_name == "default") {
        alert("Please select a validator")
        return
    }
    fetch('http://localhost:5001/api/grammar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            validator_name: validator_name
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log("fetched validator data")
            const old_data = JSON.parse(data[0].data)
            // console.log(old_data)
            // checking if all tags are valid tags
            const invalid_array = []
            var counter = 2
            var errs = ""
            var line_no = {}

            for (const k in new_data) {
                // errs+=String(k)+" "+counter+" "+String(typeof(new_data[k]))+"\n"
                line_no[k] = counter
                if (typeof (new_data[k]) == "object") {
                    counter += Object.keys(new_data[k]).length + 2
                }
                else {
                    counter += 1
                }
            }

            for (const key in new_data) {
                counter += 1
                if (new_data.hasOwnProperty(key)) {
                    if (old_data.hasOwnProperty(key)) {
                        // tag is present in validator
                    }
                    else {
                        invalid_array.push(key + " [line:" + line_no[key] + "]")
                    }
                }
            }
            var err_div = document.getElementById("error")
            // console.log("invalid tags: ", invalid_array)
            if (invalid_array.length > 0) {
                errs += "Invalid Elements:\n"
                for (var i = 0; i < invalid_array.length; i++) {
                    errs += String(i + 1) + "-> " + invalid_array[i]
                    errs += "\n"
                }
                errs += "\n"
            }


            //creating list of mandatory tags
            const mandatory_array = []
            for (const key in old_data) {
                if (old_data[key]["req"] == "mandatory") {
                    mandatory_array.push(key);
                }
            }

            const should_contain = []
            for (const key in mandatory_array) {
                if (new_data.hasOwnProperty(mandatory_array[key])) {

                }
                else {
                    should_contain.push(mandatory_array[key])
                }
            }

            if (should_contain.length > 0) {
                errs += "Keys should be present(Mandatory):\n"
                for (var i = 0; i < should_contain.length; i++) {
                    errs += String(i + 1) + "-> " + should_contain[i]
                    errs += "\n"
                }
                errs += "\n"
            }

            counter = 1
            const should_be_non_empty = []
            for (const key in new_data) {
                if (mandatory_array.includes(key)) {
                    if (new_data[key] === "") {
                        should_be_non_empty.push(key);
                    }
                }

            }

            // console.log("shoule not be empty: ", should_be_non_empty)
            if (should_be_non_empty.length > 0) {
                errs += "Elements which cant be empty:\n"
                for (var i = 0; i < should_be_non_empty.length; i++) {
                    errs += String(i + 1) + "-> " + should_be_non_empty[i] + " [line:" + line_no[should_be_non_empty[i]] + "]"
                    errs += "\n"
                }
                errs += "\n"
            }
            // checking of data types
            const wrongData = []
            var i = 0
            for (const key in new_data) {
                if (old_data.hasOwnProperty(key) && new_data[key] != "") {
                    if (typeof (new_data[key]) == "object") {
                        const mydata = new_data[key]
                        for (const myKey in mydata) {
                            if (old_data[key].hasOwnProperty(myKey)) {
                                i = 0;
                                // console.log(mydata[myKey])
                                // console.log(data[0].data[key][myKey]["typeof"])
                                i = checktype(mydata[myKey], old_data[key][myKey]["typeof"])
                                if (i == 1) {
                                    // console.log(key,"validated of type: ",data[0].data[key]["typeof"])
                                }
                                else {
                                    // console.log(myKey, "does not match, expected: ", old_data[key][myKey]["typeof"], "found: ", mydata[myKey])
                                    errs += "Data Type Validation error! ( " + myKey + " key does not match type:" + old_data[key][myKey]["typeof"] + ")" + " [line:" + line_no[key] + "]" + "\n"
                                }
                            }

                        }
                    }
                    i = 0
                    i = checktype(new_data[key], old_data[key]["typeof"])
                    if (i == 1) {
                        // console.log(key,"validated of type: ",data[0].data[key]["typeof"])
                    }
                    else {
                        // console.log(key, "does not match, expected: ", old_data[key]["typeof"], "found: ", new_data[key])
                        errs += "Data Type Validation error! (" + key + " key does not match type:" + old_data[key]["typeof"] + ") [line:" + line_no[key] + "]\n"
                    }
                }
            }
            // print_errors(invalid_array, should_be_non_empty, wrongData)
            if (errs == "") {
                errs += "JSON validated Successfully !\n"
                err_div.value = errs
                err_div.style.color = "green"
            }
            else {
                errs = "JSON has errors !\n\n" + errs
                err_div.value = errs
                err_div.style.color = "red"
            }

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    // reader.addEventListener("load", () => {
    //     // strData = reader.result


    // }, false);
}


async function load_validators_list() {
    const response = await fetch('http://localhost:5001/api/all_grammar', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const res = await response.json()
    console.log(res)
    print_validators(res)
    chk = 1;
}

function print_validators(res) {
    console.log(res)
    const content = document.getElementById("validators");

    for (let i = 0; i < res.length; i++) {
        content.insertAdjacentHTML('beforeend', `<option value="${res[i].name}">${res[i].name}</option>`)
    }

}



function checktype(data, type) {
    if (type == "object") {
        if (typeof (data) == "object") {
            return 1
        }
        else {
            return 0
        }
    }
    else if (typeof (data) == "object") {
        let i = 0
        for (const key in data) {
            i = 0
            i = checktype(data[key], type)
            if (i == 0) {
                return 0
            }
        }
        return 1
    }
    else if (type == "string") {
        if (data !== "") {
            return 1
        }
        else {
            return 0
        }
    }
    else if (type == "number") {
        if (data != "") {
            const x = parseInt(data)
            if (Number.isNaN(x)) {
                return 0
            }
            else {
                return 1
            }
        }
        else {
            return 0
        }
    }
    else if (type == "boolean") {
        if (data != "") {
            if (data == "true" || data == "false") {
                return 1
            }
            else {
                return 0
            }
        }
        else {
            return 0
        }
    }
    else if (type == "date") {
        if (data != "") {
            var mydate = new Date(data);
            if (mydate == "Invalid Date") {
                return 0
            }
            else {
                return 1
            }
        }
        else {
            return 0
        }
    }
    else if (type == "array") {
        if (data != "") {
            if (Array.isArray(data)) {
                return 1
            }
            else {
                return 0
            }
        }
        else {
            return 0
        }
    }
    return 0


}


async function print_json(stage) {
    var proj_name = sessionStorage.getItem("project")
    var owner = sessionStorage.getItem("email")

    var req_body = JSON.stringify(
        {
            "name": proj_name,
            "owner": owner,
            "stage": stage
        });
    console.log("req body: ", req_body)
    const response = await fetch('http://localhost:5001/api/getJson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: req_body
    })

    const res = await response.json()
    console.log("Res:", res)
    // console.log("Res:", res.status)
    if (response.status == 200) {
        const content = document.getElementById("json");

        var str = JSON.stringify(res, null, 2)
        content.value = str
    }
}





function stg_updt(stage) {
    // setStage(stage);
    // console.log("stage ", stage)
    sessionStorage.setItem("stage", stage)
    // highlight the selected button

    var bttn = document.getElementById("stage" + stage)
    bttn.style.backgroundColor = "black"
    // unhighlight the other buttons
    for (let i = 1; i <= 5; i++) {
        if (i != stage) {
            var bttn = document.getElementById("stage" + i)
            bttn.style.backgroundColor = "white"
        }
    }


    document.getElementById("json").value = ""
    document.getElementById("error").value = ""
    // console.log(stage)
    print_json(stage)
}


function navTOlogin() {
    var curr_email = sessionStorage.getItem("email")
    if (curr_email == null) {
        alert("login first")
        window.location.href = "login"
    }
}
function navtostage() {
    var stg = sessionStorage.getItem("stage")
    if (stg == "1") {
        stg_updt(1)
    }
    else if (stg == "2") {
        stg_updt(2)
    }
    else if (stg == "3") {
        stg_updt(3)
    }
    else if (stg == "4") {
        stg_updt(4)
    }
    else {
        stg_updt(1)
    }

}
function logout() {

    sessionStorage.removeItem("email")
    sessionStorage.removeItem("stage")
    sessionStorage.removeItem("project")
    window.location.href = "login"


}


function UserPage() {
    const navigate = useNavigate();

    var curr_email = sessionStorage.getItem("email");
    const [stage, setStage] = useState(1);

    function load_currstg_json() {

        print_json(stage)
    }

    useEffect(() => {
        if (chk == 0) {

            // navigate to login if curremail


            navTOlogin()
            navtostage()
            load_validators_list();
            load_currstg_json();
        }
    }, []);

    function update_page(stage) {
        // empty the text area
        // setStage(stage);
        sessionStorage.setItem("stage", stage)
        // highlight the selected button

        var bttn = document.getElementById("stage" + stage)
        bttn.style.backgroundColor = "black"
        // unhighlight the other buttons
        for (let i = 1; i <= 5; i++) {
            if (i != stage) {
                var bttn = document.getElementById("stage" + i)
                bttn.style.backgroundColor = "white"
            }
        }


        document.getElementById("json").value = ""
        document.getElementById("error").value = ""
        // console.log(stage)
        print_json(stage)
    }


    function last_stage(stage) {
        // delete the two textAreas and create three textAreas
        // deleting
        navigate("/stage5")


    }

    return (


        <>
            <div>
                <Navbar bg="info" expand="lg">
                    <Navbar.Brand href="home" >
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
                            {/* update page on each button click */}
                            {/* call update page with args as stage_number */}
                            <button id="stage1" className='btn btn-outline-info btn-lg mr-4' onClick={() => update_page(1)} >1</button>
                            <button id="stage2" className='btn btn-outline-info btn-lg mr-4' onClick={() => update_page(2)} >2</button>
                            <button id="stage3" className='btn btn-outline-info btn-lg mr-4' onClick={() => update_page(3)}>3</button>
                            <button id="stage4" className='btn btn-outline-info btn-lg mr-4' onClick={() => update_page(4)}>4</button>
                            <button id="stage5" className='btn btn-outline-info btn-lg mr-4' onClick={() => last_stage(5)}>5</button>
                        </div>
                    </div>
                    {/* 
                    <div className='row'>
                        <div className='mt-2'></div>
                    </div> */}
                    {/* Text area for saving json */}
                    <br>
                    </br>
                    <div className="row mt-4 text-center">

                        <div className="col text-center">
                            <textarea id="json" className="container" style={{ height: "60vh", width: "80%", resize: "none" }} placeholder="Enter JSON here"></textarea>
                        </div>
                        <div className='col text-center'>
                            <textarea id="error" className="container" readOnly={true} style={{ height: "60vh", width: "80%", resize: "none" }} placeholder="Enter JSON here"></textarea>
                            <div className='text-center'>
                                <select id="validators" >
                                    <option value="default">Select Validator</option>
                                </select>

                                <Button onClick={() => { validateFile(sessionStorage.getItem("stage")) }} variant="primary mr-2 ml-4">Validate Json</Button>
                                {/* <Button variant="primary">Next Step</Button> */}
                            </div>

                        </div>
                    </div>


                </div>
            </div>



        </>



    )



}

export default UserPage;