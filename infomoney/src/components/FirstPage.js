import React from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

import pigPhoto from "../images/pig.png"

class FirstPage extends React.Component {
    render() {
        return(<div className="d-flex align-items-center first-page">
            <div className="d-flex flex-column align-items-center div-left">
                <div className="ml-140">
                    <h3 className="infomoney-title">iNFOMANEY-</h3>
                    <p>The app that keeps track of your finances</p>
                    <div className="d-flex flex-row">
                        <button type="button" className="btn btn-sign" onClick={() => {
                            document.querySelector(".app-modal-sign-up").classList.remove("d-none");
                        }}>Sign up</button>
                        <button type="button" className="btn btn-log" onClick={() => {
                            document.querySelector(".app-modal-log-in").classList.remove("d-none");
                        }}>Login</button>
                    </div> 
                    <div className="d-flex justify-content-center mt-5">
                        <div className="skip" onClick={() => {
                            document.querySelector(".first-page").classList.add("d-none");
                            document.querySelector(".app-fun").classList.remove("d-none");
                        }}>Skip</div>
                    </div>
                </div>
            </div>
    
            <div className="d-inline-flex justify-content-end div-right">
                <img src={pigPhoto} alt="(*(..)*)"/>
            </div>

            <SignUp/>
            <LogIn/>

        </div>)
    }
}

export default FirstPage;