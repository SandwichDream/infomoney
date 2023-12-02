import React from "react";
import PersonHistory from "./PersonHistory";
import SetPeriod from "./SetPeriod";

import { BiPlus } from "react-icons/bi";
import { BsFillXCircleFill, BsFillPencilFill, BsTrashFill } from "react-icons/bs";

class PersonInfo extends React.Component {
    constructor(props) {
        super(props);

        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${day}-${month}-${year}`;

        this.state = {
            selectedPeriod: 0,
            dateFrom: formattedDate,
            dateTo: formattedDate
        }
        this.setDateFrom = this.setDateFrom.bind(this);
        this.setDateTo = this.setDateTo.bind(this);
    }

    render() {

        const person = this.props.selectPerson();
        const profits = person.id !== 0 ? this.personProfits(person.id) : null;
        const expenses = person.id !== 0 ? this.personExpenses(person.id) : null;

        if (person.id === 0) {
            return (<main className="person-info scroll-0">
            <header className="d-flex align-items-center">
                <ul className="d-flex">
                    <li className="app-border-right period-btns" onClick={(el) => {
                        this.setState({selectedPeriod: 1});

                        let btns = document.querySelectorAll(".period-btns");
                        for (let i = 0; i < btns.length; i++) {
                            btns[i].classList.remove("chosen");
                        }

                        el.target.closest('li').classList.add("chosen");
                    }}>day</li>
                    <li className="app-border-right period-btns" onClick={(el) => {
                        this.setState({selectedPeriod: 2});

                        let btns = document.querySelectorAll(".period-btns");
                        for (let i = 0; i < btns.length; i++) {
                            btns[i].classList.remove("chosen");
                        }

                        el.target.closest('li').classList.add("chosen");
                    }}>month</li>
                    <li className="app-border-right period-btns" onClick={(el) => {
                        this.setState({selectedPeriod: 3});

                        let btns = document.querySelectorAll(".period-btns");
                        for (let i = 0; i < btns.length; i++) {
                            btns[i].classList.remove("chosen");
                        }

                        el.target.closest('li').classList.add("chosen");
                    }}>year</li>
                    <li className="period-btns chosen" onClick={(el) => {
                        this.setState({selectedPeriod: 0});

                        let btns = document.querySelectorAll(".period-btns");
                        for (let i = 0; i < btns.length; i++) {
                            btns[i].classList.remove("chosen");
                        }

                        el.target.closest('li').classList.add("chosen");
                    }}>all</li>
                </ul>
                <button className="btn" onClick={() => {
                    document.querySelector(".app-set-period").classList.remove("d-none");
                }}>
                    <h6>{this.state.dateFrom}</h6>
                    <h6 className="m-0">{this.state.dateTo}</h6>
                </button>
            </header>
                <main>
                    <h4>Total:</h4>
                    <div className="container info-money">
                        <div className="row row-cols-2">
                            <div className="col app-border-bottom app-border-right">number of profits:</div>
                            <div className="col text-success app-border-bottom">{this.totalProfits()}</div>

                            <div className="col app-border-bottom app-border-right">number of losses:</div>
                            <div className="col text-danger app-border-bottom">{this.totalExpenses()}</div>

                            <div className="col app-border-right">total:</div>
                            <div className="col">{this.totalProfits() + this.totalExpenses()}</div>
                        </div>
                    </div>
                </main>
                <SetPeriod setDateFrom={this.setDateFrom} setDateTo={this.setDateTo}/>
            </main>)
        }
        return (<main className="person-info scroll-0">
            <header className="d-flex align-items-center">
                <ul className="d-flex">
                    <li className="app-border-right period-btns" onClick={(el) => {
                        this.setState({selectedPeriod: 1});

                        let btns = document.querySelectorAll(".period-btns");
                        for (let i = 0; i < btns.length; i++) {
                            btns[i].classList.remove("chosen");
                        }

                        el.target.closest('li').classList.add("chosen");
                    }}>day</li>
                    <li className="app-border-right period-btns" onClick={(el) => {
                        this.setState({selectedPeriod: 2});

                        let btns = document.querySelectorAll(".period-btns");
                        for (let i = 0; i < btns.length; i++) {
                            btns[i].classList.remove("chosen");
                        }

                        el.target.closest('li').classList.add("chosen");
                    }}>month</li>
                    <li className="app-border-right period-btns" onClick={(el) => {
                        this.setState({selectedPeriod: 3});

                        let btns = document.querySelectorAll(".period-btns");
                        for (let i = 0; i < btns.length; i++) {
                            btns[i].classList.remove("chosen");
                        }

                        el.target.closest('li').classList.add("chosen");
                    }}>year</li>
                    <li className="period-btns chosen" onClick={(el) => {
                        this.setState({selectedPeriod: 0});

                        let btns = document.querySelectorAll(".period-btns");
                        for (let i = 0; i < btns.length; i++) {
                            btns[i].classList.remove("chosen");
                        }

                        el.target.closest('li').classList.add("chosen");
                    }}>all</li>
                </ul>
                <button className="btn" onClick={() => {
                    document.querySelector(".app-set-period").classList.remove("d-none");
                }}>
                    <h6>{this.state.dateFrom}</h6>
                    <h6 className="m-0">{this.state.dateTo}</h6>
                </button>
            </header>
            <main>
                <h4>Total:</h4>
                <div className="container info-money">
                    <div className="row row-cols-2">
                        <div className="col app-border-bottom app-border-right">number of profits:</div>
                        <div className="col text-success app-border-bottom">{this.totalProfits()}</div>

                        <div className="col app-border-bottom app-border-right">number of losses:</div>
                        <div className="col text-danger app-border-bottom">{this.totalExpenses()}</div>

                        <div className="col app-border-right">total:</div>
                        <div className="col">{this.totalProfits() + this.totalExpenses()}</div>
                    </div>
                </div>
                <div className="d-flex justify-content-between person-info-nick">
                    <h4>{person.nick}'s info:</h4>
                    <div className="d-flex justify-content-evenly m-2 controls-btns-person">
                        <BsFillPencilFill className="icon" onClick={() => {
                            document.querySelector(".app-modal-edit main input").value = person.nick;
                            document.querySelector(".app-modal-edit").classList.remove("d-none");
                        }}/>
                        <BsTrashFill className="icon" onClick={() => document.querySelector(".app-modal-remove").classList.remove("d-none")}/>
                        <BsFillXCircleFill className="icon" onClick={() => {
                            this.props.setIdSelector(0);
                            
                            let nicks = document.querySelectorAll(".person");
                            for (let i = 0; i < nicks.length; i++) {
                                nicks[i].classList.remove("chosen");
                            }
                        }}/>
                    </div>
                </div>
                <div className="container info-money">
                    <div className="row row-cols-2">
                        <div className="col app-border-bottom app-border-right">number of profits:</div>
                        <div className="col text-success app-border-bottom">{profits}</div>

                        <div className="col app-border-bottom app-border-right">number of losses:</div>
                        <div className="col text-danger app-border-bottom">{expenses}</div>

                        <div className="col app-border-right">total:</div>
                        <div className="col">{profits + expenses}</div>
                    </div>
                </div>
                <div className="periods">
                    <header>
                        <h3>History</h3>
                    </header>
                    <main>
                        <PersonHistory person={person} selectedPeriod={this.state.selectedPeriod} dateFrom={this.state.dateFrom} dateTo={this.state.dateTo} setPeriodIdSelector={this.props.setPeriodIdSelector} remove={this.props.removeHistory}/>
                    </main>
                    <footer className="d-flex">
                        <button className="btn m-1" onClick={() => {
                            document.querySelector(".app-modal-history").classList.remove("d-none");
                        }}><BiPlus className="icon-plus"/> Add History</button>
                    </footer>
                </div>
            </main>
            <SetPeriod setDateFrom={this.setDateFrom} setDateTo={this.setDateTo} dateFrom={this.state.dateFrom} dateTo={this.state.dateTo}/>
        </main>)
    }

    setDateFrom = (date) => {
        const dateParts = date.split("-");
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

        this.setState({ selectedPeriod: 4, dateFrom: formattedDate});
    }
    
    setDateTo = (date) => {
        const dateParts = date.split("-");
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

        this.setState({ selectedPeriod: 4, dateTo: formattedDate });
    }

    personProfits(id) {
        let periods = this.findPersonById(id).periods;
        let count = 0;
        const currentDate = new Date();

        const dateFromParts = this.state.dateFrom.split("-");
        const dateFrom = new Date(dateFromParts[2], dateFromParts[1] - 1, dateFromParts[0]);

        const dateToParts = this.state.dateTo.split("-");
        const dateTo = new Date(dateToParts[2], dateToParts[1] - 1, dateToParts[0]);

        // currentDate like "1.1.1111"
        if (this.state.selectedPeriod === 1) {
            for (let i = 0; i < periods.length; i++) {
                const date = periods[i].date.split(".");
                if(periods[i].money >= 0 && parseInt(date[0]) === currentDate.getDate() && parseInt(date[1]) - 1 === currentDate.getMonth() && parseInt(date[2]) === currentDate.getFullYear()) {
                    count += periods[i].money;
                }
            }
        }
        else if (this.state.selectedPeriod === 2) {
            for (let i = 0; i < periods.length; i++) {
                const date = periods[i].date.split(".");
                if(periods[i].money >= 0 && parseInt(date[1]) - 1 === currentDate.getMonth() && parseInt(date[2]) === currentDate.getFullYear()) {
                    count += periods[i].money;
                }
            }
        }
        else if (this.state.selectedPeriod === 3) {
            for (let i = 0; i < periods.length; i++) {
                const date = periods[i].date.split(".");
                if(periods[i].money >= 0 && parseInt(date[2]) === currentDate.getFullYear()) {
                    count += periods[i].money;
                }
            }
        }
        else if (this.state.selectedPeriod === 4) {
            const elementsForPeriod = periods.filter((period) => {

                const periodDateParts = period.date.split(".")
                const periodDate = new Date(periodDateParts[2], periodDateParts[1] - 1, periodDateParts[0]);

                if (dateFrom > dateTo) {
                    return (
                        periodDate <= dateFrom &&
                        periodDate >= dateTo
                    );
                }
                return (
                    periodDate >= dateFrom &&
                    periodDate <= dateTo
                );
            });
        
            for (let i = 0; i < elementsForPeriod.length; i++) {
                if (elementsForPeriod[i].money >= 0) {
                    count += elementsForPeriod[i].money;
                }
            }
        }
        else {
            for (let i = 0; i < periods.length; i++) {
                if(periods[i].money >= 0) {
                    count += periods[i].money;
                }
            }
        }

        return count;
    }

    personExpenses(id) {

        let periods = this.findPersonById(id).periods;
        let count = 0;
        const currentDate = new Date();

        const dateFromParts = this.state.dateFrom.split("-");
        const dateFrom = new Date(dateFromParts[2], dateFromParts[1] - 1, dateFromParts[0]);

        const dateToParts = this.state.dateTo.split("-");
        const dateTo = new Date(dateToParts[2], dateToParts[1] - 1, dateToParts[0]);

        if (this.state.selectedPeriod === 1) {
            for (let i = 0; i < periods.length; i++) {
                const date = periods[i].date.split(".");
                if(periods[i].money < 0 && parseInt(date[0]) === currentDate.getDate() && parseInt(date[1]) - 1 === currentDate.getMonth() && parseInt(date[2]) === currentDate.getFullYear()) {
                    count += periods[i].money;
                }
            }
        }
        else if (this.state.selectedPeriod === 2) {
            for (let i = 0; i < periods.length; i++) {
                const date = periods[i].date.split(".");
                if(periods[i].money < 0 && parseInt(date[1]) - 1 === currentDate.getMonth() && parseInt(date[2]) === currentDate.getFullYear()) {
                    count += periods[i].money;
                }
            }
        }
        else if (this.state.selectedPeriod === 3) {
            for (let i = 0; i < periods.length; i++) {
                const date = periods[i].date.split(".");
                if(periods[i].money < 0 && parseInt(date[2]) === currentDate.getFullYear()) {
                    count += periods[i].money;
                }
            }
        }
        else if (this.state.selectedPeriod === 4) {

            const elementsForPeriod = periods.filter((period) => {

                const periodDateParts = period.date.split(".")
                const periodDate = new Date(periodDateParts[2], periodDateParts[1] - 1, periodDateParts[0]);

                if (dateFrom > dateTo) {
                    return (
                        periodDate <= dateFrom &&
                        periodDate >= dateTo
                    );
                }
                return (
                    periodDate >= dateFrom &&
                    periodDate <= dateTo
                );
            });
        
            for (let i = 0; i < elementsForPeriod.length; i++) {
                if (elementsForPeriod[i].money < 0) {
                    count += elementsForPeriod[i].money;
                }
            }
        }
        else {
            for (let i = 0; i < periods.length; i++) {
                if(periods[i].money < 0) {
                    count += periods[i].money;
                }
            }
        }

        return count;
    }

    totalProfits() {
        let persons = this.props.persons;
        let count = 0;
        for (let i = 0; i < persons.length; i++) {
            count += this.personProfits(persons[i].id);
        }
        return count;
    }

    totalExpenses() {
        let persons = this.props.persons;
        let count = 0;
        for (let i = 0; i < persons.length; i++) {
            count += this.personExpenses(persons[i].id);
        }
        return count;
    }

    findPersonById(id) {
        const persons = this.props.persons;
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].id === id) {
                return persons[i];
            }
        }
    }
}

export default PersonInfo;