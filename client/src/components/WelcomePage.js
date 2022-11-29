import "./welcome_style.css";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function WelcomePage() {
    return (


        <div className="App">

            <div class="container">
                <section class="one">
                    <div id="one-main-div">
                        <div id="welcome">
                            <h1 contenteditable="true" id="welcomeh1">Welcome</h1>
                        </div>
                    </div>
                </section>
                <section class="two">
                    <div id="two-main-div">
                        <div id="team">
                            <div >
                                <h1>Click here to Begin::<Link to="/login">Login/Signup</Link></h1>
                            </div>
                        </div>
                    </div>
                </section>
            </div>


        </div>



    )

}

export default WelcomePage;
