import React from "react";

import { BiX } from "react-icons/bi";

class AddHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: 0,
            walletId: null,
            categoryId: null
        }
    }

    render() {
        const currentDate = new Date();

        return(<form className="app-modal add-history modal-fullscreen d-none" ref={(e) => this.addHistoryForm = e}>
            <div>
                <header className="d-flex justify-content-between mb-4">
                    <h5>Add History</h5>
                    <BiX className="bix" onClick={() => {
                        document.querySelector(".add-history").classList.add("d-none");
                        let money = document.querySelector(".add-history main input");
                        money.placeholder = "Money";
                        money.classList.remove("red-placeholder");
                        this.addHistoryForm.reset();
                        this.setState({ walletId: null, categoryId: null });
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
                    <div className="d-flex mb-3">
                        <select className="form-select select-date" defaultValue={0} onChange={(el) => this.setState({ walletId: el.target.value !== 0 ? el.target.value : null })}>
                            <option value="0">None</option>
                            {(() => {
                                const wallets = this.props.wallets;
                                const options = [];

                                for (let i = 0; i < wallets.length; i++) {
                                    options.push(<option key={wallets[i].id} value={wallets[i].id}>{wallets[i].name}</option>);
                                }

                                return options;
                            })()}
                        </select>
                        <select className="form-select select-date" defaultValue={0} onChange={(el) => this.setState({ categoryId: el.target.value !== 0 ? el.target.value : null })}>
                            <option value="0">None</option>
                            {(() => {
                                const categories = this.props.categories;
                                const options = [];

                                for (let i = 0; i < categories.length; i++) {
                                    options.push(<option key={categories[i].id} value={categories[i].id}>{categories[i].name}</option>);
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
                        const money = document.querySelector(".add-history main input[type='text']");
                        const day = (parseInt(document.querySelector(".add-history .select-date").value)).toString().padStart(2, '0');
                        const month = (parseInt(document.querySelector(".add-history .select-month").value) + 1).toString().padStart(2, '0');
                        const year = document.querySelector(".add-history .select-year").value;
                        const date = `${day}.${month}.${year}`;
                        const desc = document.querySelector(".add-history main textarea");

                        const type = document.querySelectorAll(".add-history main input[type='radio']")[0].checked ? "INCOME" : "OUTCOME";

                        if (money.value !== "" && !isNaN(money.value)) {
                            if (desc.value === "") {
                                desc.value = "-";
                            }
                            this.props.addHistory(parseInt(money.value), type, date, desc.value, this.state.walletId, this.state.categoryId);
                            document.querySelector(".add-history").classList.add("d-none");
                            money.placeholder = "Money";
                            money.classList.remove("red-placeholder");
                            this.addHistoryForm.reset();
                        }
                        else {
                            money.placeholder = "Enter a money, please";
                            money.classList.add("red-placeholder");
                        }

                        this.setState({ walletId: null, categoryId: null });
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