import React from "react";

class SameName extends React.Component {
    render() {
        return (<div className="app-same-name modal-fullscreen d-none">
            <div>
                <header className="d-flex justify-content-between mb-4">
                    <h5>Same Name</h5>
                </header>
                <main className="d-flex flex-column justify-content-center">
                    <div className="input-group mb-3">
                        {this.props.message}
                    </div>
                </main>
                <footer className="d-flex justify-content-end">
                    <button className="btn" onClick={() => document.querySelector(".app-same-name").classList.add("d-none")}>Ok</button>
                </footer>
            </div>
        </div>)
    }
}

export default SameName;