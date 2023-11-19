import React from "react";

import { BiX } from "react-icons/bi";

class EditHistory extends React.Component {
    render() {
        return(<div className="app-modal-history-edit modal-fullscreen d-none">
            <div>
                <header className="d-flex justify-content-between mb-4">
                    <h5 className="user-select-none">Edit History</h5>
                    <BiX className="bix" onClick={() => {
                        document.querySelector(".app-modal-history-edit").classList.add("d-none");
                        let money = document.querySelector(".app-modal-history-edit main input");
                        money.value = "";
                        money.placeholder = "Money";
                        money.classList.remove("red-placeholder");
                        document.querySelector(".app-modal-history-edit main textarea").value = "";
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
                        let money = document.querySelector(".app-modal-history-edit main input");
                        let disc = document.querySelector(".app-modal-history-edit main textarea");

                        if (money.value !== "") {
                            if (disc.value === "") {
                                disc.value = "-";
                            }
                            this.props.editHistory(parseInt(money.value), disc.value);
                            document.querySelector(".app-modal-history-edit").classList.add("d-none");
                        }
                        else {
                            money.placeholder = "Enter a money, please";
                            money.classList.add("red-placeholder");
                        }

                        money.value = "";
                        disc.value = "";

                    }}>Edit</button>
                </footer>
            </div>
        </div>)
    }
}

export default EditHistory;