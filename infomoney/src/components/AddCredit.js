import React from "react";

import { BiX } from "react-icons/bi";

class AddCredit extends React.Component {
    render() {
        return(<div className="app-modal-credit modal-fullscreen d-none">
            <div>
                <header className="d-flex justify-content-between mb-4">
                    <h5>Add History</h5>
                    <BiX className="bix" onClick={() => {
                        document.querySelector(".app-modal-credit").classList.add("d-none");
                        let money = document.querySelector(".app-modal-credit main input");
                        money.value = "";
                        money.placeholder = "Money";
                        money.classList.remove("red-placeholder");
                        document.querySelector(".app-modal-credit main textarea").value = "";
                    }}/>
                </header>
                <main className="d-flex flex-column justify-content-center">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Money" maxLength=""/>
                    </div>
                    <div className="input-group mb-3">
                        <textarea rows="3" placeholder="Disc" className="form-control scroll-0" maxLength="150"></textarea>
                    </div>
                </main>
                <footer className="d-flex justify-content-end">
                    <button className="btn" onClick={() => {
                        let money = document.querySelector(".app-modal-credit main input");
                        let disc = document.querySelector(".app-modal-credit main textarea");
                        let id = Date.now();

                        if (money.value !== "" && !isNaN(money.value)) {
                            if (disc.value === "") {
                                disc.value = "-";
                            }
                            this.props.addHistory(id, parseInt(money.value), disc.value);
                            document.querySelector(".app-modal-credit").classList.add("d-none");
                            disc.value = "";
                        }
                        else {
                            money.placeholder = "Enter a money, please";
                            money.classList.add("red-placeholder");
                        }

                        money.value = "";

                    }}>Add</button>
                </footer>
            </div>
        </div>)
    }
}

export default AddCredit;