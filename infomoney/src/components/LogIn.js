import React from "react";

import { BiX } from "react-icons/bi";

class LogIn extends React.Component {
    render() {
        return(<div className="app-modal-log-in modal-fullscreen d-none">
            <div>
                <header className="d-flex justify-content-between mb-4">
                    <h5>Log in</h5>
                    <BiX className="bix" onClick={() => {
                        const inputs = document.querySelectorAll(".app-modal-log-in main input");

                        inputs[0].value = "";
                        inputs[0].placeholder = "e-mail";
                        inputs[0].classList.remove("red-placeholder");

                        inputs[1].value = "";
                        inputs[1].placeholder = "password";
                        inputs[1].classList.remove("red-placeholder");

                        document.querySelector(".app-modal-log-in").classList.add("d-none");
                    }}/>
                </header>
                <main className="d-flex flex-column justify-content-center">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="e-mail" maxLength="56"/>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="password" maxLength="32"/>
                    </div>
                </main>
                <footer className="d-flex justify-content-end">
                    <button className="btn" onClick={() => {
                        const inputs = document.querySelectorAll(".app-modal-log-in main input");

                        const email = inputs[0];
                        const password0 = inputs[1];

                        let goodEmail = false;
                        let goodPassword0 = false;

                        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
                        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,32}$/;
                        
                        if (emailRegex.test(email.value)) {
                            email.placeholder = "e-mail";
                            email.classList.remove("red-placeholder");
                            goodEmail = true;
                        }
                        else {
                            email.placeholder = "Enter a e-mail, please.";
                            email.classList.add("red-placeholder");
                            email.value = "";
                            goodEmail = false;
                        }

                        if (passwordRegex.test(password0.value)) {
                            password0.placeholder = "password";
                            password0.classList.remove("red-placeholder");
                            goodPassword0 = true;
                        }
                        else {
                            password0.placeholder = "Include 1 uppercase, 1 lowercase letter, 1 digit, and 8 - 32 char";
                            password0.classList.add("red-placeholder");
                            password0.value = "";
                            goodPassword0 = false;
                        }

                        if (goodEmail && goodPassword0) {
                            document.querySelector(".app-modal-log-in").classList.add("d-none");
                            email.value = "";
                            password0.value = "";
                        }
                    }}>Log in</button>
                </footer>
            </div>
        </div>)
    }
}

export default LogIn;