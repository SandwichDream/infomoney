import React from "react";

class SignUpOnForm extends React.Component {
    render() {
        return(<main className="d-flex align-items-center">
        <div className="d-flex flex-column align-items-center div-left">
            <div className="ml-140">
                <h3 className="infomoney-title">iNFOMANEY-</h3>
                <p>додаток, який слідкує за вашими фінансами</p>
                <div className="d-flex flex-row">
                    <button type="button" className="btn btn-sign">реєстрація</button>
                    <button type="button" className="btn btn-log">логін</button>
                </div> 
            </div>
        </div>
    
        <div className="d-inline-flex justify-content-end div-right">
            <img src="./images/pig.png" alt=""/>
        </div>

        <div className="modal-fullscreen modal-window d-none">
            <div className="d-flex flex-column justify-content-evenly align-items-center sign-in d-none">
                <input className="user" placeholder="login" type="text"/>
                <input className="password" placeholder="password" type="text"/>
                <input className="password" placeholder="repeat password" type="text"/>
                <button className="btn btn-done">Done</button>
                
            </div>
            <div className="d-flex flex-column justify-content-evenly align-items-center log-in d-none">
                <input className="user" placeholder="login" type="text"/>
                <input className="password" placeholder="password" type="text"/>
                <button className="btn btn-done">Done</button>
                
            </div>
        </div>
    </main>)
    }
}

export default SignUpOnForm;