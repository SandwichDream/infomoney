import React from "react";

import { BiX } from "react-icons/bi";

class AddHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: 0
        }
    }

    render() {
        const currentDate = new Date();

        return(<form className="app-modal-history modal-fullscreen d-none" ref={(e) => this.addHistoryForm = e}>
            <div>
                <header className="d-flex justify-content-between mb-4">
                    <h5>Add History</h5>
                    <BiX className="bix" onClick={() => {
                        document.querySelector(".app-modal-history").classList.add("d-none");
                        let money = document.querySelector(".app-modal-history main input");
                        money.placeholder = "Money";
                        money.classList.remove("red-placeholder");
                        this.addHistoryForm.reset();
                    }}/>
                </header>
                <main className="d-flex flex-column justify-content-center">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Money"/>
                    </div>
                    <div className="d-flex">
                        <div className="form-check m-2">
                            <input className="form-check-input" type="radio" name="AddHistoryRadio" id="AddHistoryRadio1" defaultChecked/>
                            <label className="form-check-label" htmlFor="AddHistoryRadio1">
                                Profit
                            </label>
                        </div>
                        <div className="form-check m-2">
                            <input className="form-check-input" type="radio" name="AddHistoryRadio" id="AddHistoryRadio2"/>
                            <label className="form-check-label" htmlFor="AddHistoryRadio2">
                                Expenses
                            </label>
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <select className="form-select select-date" defaultValue={currentDate.getDate()}>
                            {this.daysOfMonth()}
                        </select>
                        <select className="form-select select-month" defaultValue={currentDate.getMonth()} onChange={(el) => this.setState({month: el.target.value})}>
                            <option value="0">January</option>
                            <option value="1">February</option>
                            <option value="2">March</option>
                            <option value="3">April</option>
                            <option value="4">May</option>
                            <option value="5">June</option>
                            <option value="6">July</option>
                            <option value="7">August</option>
                            <option value="8">September</option>
                            <option value="9">October</option>
                            <option value="10">November</option>
                            <option value="11">December</option>
                        </select>
                        <select className="form-select select-year" defaultValue={currentDate.getFullYear()}>
                            {(() => {
                                const year = currentDate.getFullYear();
                                const options = [];

                                for (let i = -100; i <= 100; i++) {
                                    const res = year + i;
                                    options.push(<option key={res} value={res}>{res}</option>);
                                }

                                return options;
                            })()}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <textarea rows="3" placeholder="Desc" className="form-control scroll-0" maxLength="150"></textarea>
                    </div>
                </main>
                <footer className="d-flex justify-content-end">
                    <button className="btn" onClick={(e) => {
                        e.preventDefault();
                        const money = document.querySelector(".app-modal-history main input[type='text']");
                        const date = `${document.querySelector(".app-modal-history .select-date").value}.${parseInt(document.querySelector(".app-modal-history .select-month").value) + 1}.${document.querySelector(".app-modal-history .select-year").value}`;
                        const desc = document.querySelector(".app-modal-history main textarea");

                        const type = document.querySelectorAll(".app-modal-history main input[type='radio']")[0].checked ? "INCOME" : "OUTCOME";

                        if (money.value !== "" && !isNaN(money.value)) {
                            if (desc.value === "") {
                                desc.value = "-";
                            }
                            this.props.addHistory(parseInt(money.value), type, date, desc.value);
                            document.querySelector(".app-modal-history").classList.add("d-none");
                            money.placeholder = "Money";
                            money.classList.remove("red-placeholder");
                            this.addHistoryForm.reset();
                        }
                        else {
                            money.placeholder = "Enter a money, please";
                            money.classList.add("red-placeholder");
                        }

                        money.value = "";

                    }}>Add</button>
                </footer>
            </div>
        </form>)
    }   
    
    daysOfMonth() {
        const options = [];
        const month = parseInt(this.state.month);

        if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
            for (let i = 1; i <= 31; i++) {
                options.push(<option key={i} value={i}>{i}</option>);
            }
        }
        else if (month === 1) {
            for (let i = 1; i <= 28; i++) {
                options.push(<option key={i} value={i}>{i}</option>);
            }
        }
        else {
            for (let i = 1; i <= 30; i++) {
                options.push(<option key={i} value={i}>{i}</option>);
            }
        }
        
        return options;
    };
}

export default AddHistory;