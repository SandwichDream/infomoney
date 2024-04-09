import React from "react";

import { BiX } from "react-icons/bi";

class SetPeriod extends React.Component {

    render() {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        return(<div className="set-period app-modal modal-fullscreen d-none">
            <div>
                <header className="d-flex justify-content-between mb-4">
                    <h5>Set Period</h5>
                    <BiX className="bix" onClick={() => {
                        document.querySelector(".set-period").classList.add("d-none");
                    }}/>
                </header>
                <main className="d-flex flex-column">
                    <div className="input-group mb-2">
                        <input type="date" className="form-control" defaultValue={formattedDate}/>
                    </div>
                    <h6>To</h6>
                    <div className="input-group mb-2">
                        <input type="date" className="form-control" defaultValue={formattedDate}/>
                    </div>    
                </main>
                <footer className="d-flex justify-content-end">
                    <button className="btn" onClick={(e) => {
                        e.preventDefault();

                        let btns = document.querySelectorAll(".period-btns");
                        for (let i = 0; i < btns.length; i++) {
                            btns[i].classList.remove("chosen");
                        }

                        const dateInputs = document.querySelectorAll(".set-period main input");
                        
                        this.props.setDateFrom(dateInputs[0].value);
                        this.props.setDateTo(dateInputs[1].value);
                        this.props.setInitialStatePI();

                        document.querySelector(".set-period").classList.add("d-none");

                    }}>Set</button>
                </footer>
            </div>
        </div>)
    }
}

export default SetPeriod;