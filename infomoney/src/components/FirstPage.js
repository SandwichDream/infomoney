import React from "react";

import pigPhoto from "../images/pig.png"

class FirstPage extends React.Component {
    render() {
        return(<div className="d-flex align-items-center first-page">
            <div className="d-flex flex-column align-items-center div-left">
                <div className="ml-140">
                    <h3 className="infomoney-title">iNFOMANEY-</h3>
                    <p>The app that keeps track of your finances</p>
                    <div className="d-flex justify-content-center mt-5">
                        <button className="btn skip" onClick={() => {
                            document.querySelector(".first-page").classList.add("d-none");
                            document.querySelector(".app-fun").classList.remove("d-none");
                        }}>Start</button>
                    </div>
                </div>
            </div>
    
            <div className="d-inline-flex justify-content-end div-right">
                <img src={pigPhoto} alt="(*(..)*)"/>
            </div>
        </div>)
    }
}

export default FirstPage;