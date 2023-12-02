import React from "react";

import { BiX } from "react-icons/bi";

class Remove extends React.Component {
    render() {
        return(<div className="app-modal-remove modal-fullscreen d-none">
            <div>
                <header className="d-flex justify-content-between mb-4">
                    <h5>Warning</h5>
                    <BiX className="bix" onClick={() => {document.querySelector(".app-modal-remove").classList.add("d-none")}}/>
                </header>
                <main>
                    <p>Are you sure you want to remove "{this.props.selectPerson().nick}"?</p>
                </main>
                <footer className="d-flex justify-content-end">
                    <button className="btn" onClick={() => {
                        this.props.remove();
                        document.querySelector(".app-modal-remove").classList.add("d-none");
                    }}>Remove</button>
                </footer>
            </div>
        </div>)
    }
}

export default Remove;