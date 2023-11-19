import React from "react";

import { BiX } from "react-icons/bi";

class EditPerson extends React.Component {
    render() {
        return (<div className="app-modal-edit modal-fullscreen d-none">
            <div>
                <header className="d-flex justify-content-between mb-4">
                    <h5 className="user-select-none">Edit person</h5>
                    <BiX className="bix" onClick={() => {
                        let nick = document.querySelector(".app-modal-edit main input");
                        nick.value = "";
                        nick.placeholder = "Nick";
                        nick.classList.remove("red-placeholder");
                        document.querySelector(".app-modal-edit").classList.add("d-none");
                    }}/>
                </header>
                <main className="d-flex flex-column justify-content-center">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nick" maxLength="10"/>
                    </div>
                </main>
                <footer className="d-flex justify-content-end">
                    <button className="btn" onClick={() => {
                        let nick = document.querySelector(".app-modal-edit main input");

                        if (nick.value !== "") {
                            
                            this.props.editPerson(nick.value);

                            nick.placeholder = "Nick";
                            nick.classList.remove("red-placeholder");
                            document.querySelector(".app-modal-edit").classList.add("d-none");
                        }
                        else {
                            nick.placeholder = "Enter a nickname, please";
                            nick.classList.add("red-placeholder");
                        }

                        nick.value = "";
                    
                    }}>Edit</button>
                </footer>
            </div>
        </div>)
    }
}

export default EditPerson;