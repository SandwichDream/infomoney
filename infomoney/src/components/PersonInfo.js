import React from "react";
import axios from "axios";
import PersonHistory from "./PersonHistory";
import SetPeriod from "./SetPeriod";

import { BiPlus } from "react-icons/bi";
import { BsFillXCircleFill, BsFillPencilFill, BsTrashFill } from "react-icons/bs";

const API_URL = "13.51.169.135";
const LOCAL_URL = "localhost";

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
            dateTo: formattedDate,
            totalProfits: 0,
            totalExpenses: 0,
            personProfits: 0,
            personExpenses: 0,
            allTransactions: [],
            personTransactions: []
        }
        this.setDateFrom = this.setDateFrom.bind(this);
        this.setDateTo = this.setDateTo.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
    }

    render() {

        const person = this.props.selectPerson();

        if (person.id === 0) {
            return (<main className="person-info scroll-0">
            <header className="d-flex align-items-center">
                <ul className="d-flex">
                    <li className="app-border-right period-btns" onClick={(el) => {
                        this.setState({selectedPeriod: 1});
                        this.setInitialState();

                        let btns = document.querySelectorAll(".period-btns");
                        for (let i = 0; i < btns.length; i++) {
                            btns[i].classList.remove("chosen");
                        }

                        el.target.closest('li').classList.add("chosen");
                    }}>day</li>
                    <li className="app-border-right period-btns" onClick={(el) => {
                        this.setState({selectedPeriod: 2});
                        this.setInitialState();

                        let btns = document.querySelectorAll(".period-btns");
                        for (let i = 0; i < btns.length; i++) {
                            btns[i].classList.remove("chosen");
                        }

                        el.target.closest('li').classList.add("chosen");
                    }}>month</li>
                    <li className="app-border-right period-btns" onClick={(el) => {
                        this.setState({selectedPeriod: 3});
                        this.setInitialState();

                        let btns = document.querySelectorAll(".period-btns");
                        for (let i = 0; i < btns.length; i++) {
                            btns[i].classList.remove("chosen");
                        }

                        el.target.closest('li').classList.add("chosen");
                    }}>year</li>
                    <li className="period-btns chosen" onClick={(el) => {
                        this.setState({selectedPeriod: 0});
                        this.setInitialState();

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
                            <div className="col text-success app-border-bottom">{this.state.totalProfits}</div>

                            <div className="col app-border-bottom app-border-right">number of losses:</div>
                            <div className="col text-danger app-border-bottom">{this.state.totalExpenses}</div>

                            <div className="col app-border-right">total:</div>
                            <div className="col">{this.state.totalProfits - this.state.totalExpenses}</div>
                        </div>
                    </div>
                </main>
                <SetPeriod setInitialStatePI={this.setInitialState} setDateFrom={this.setDateFrom} setDateTo={this.setDateTo}/>
            </main>)
        }
        return (<main className="person-info scroll-0">
            <header className="d-flex align-items-center">
                <ul className="d-flex">
                    <li className="app-border-right period-btns" onClick={(el) => {
                        this.setState({selectedPeriod: 1});
                        this.setInitialState();

                        let btns = document.querySelectorAll(".period-btns");
                        for (let i = 0; i < btns.length; i++) {
                            btns[i].classList.remove("chosen");
                        }

                        el.target.closest('li').classList.add("chosen");
                    }}>day</li>
                    <li className="app-border-right period-btns" onClick={(el) => {
                        this.setState({selectedPeriod: 2});
                        this.setInitialState();

                        let btns = document.querySelectorAll(".period-btns");
                        for (let i = 0; i < btns.length; i++) {
                            btns[i].classList.remove("chosen");
                        }

                        el.target.closest('li').classList.add("chosen");
                    }}>month</li>
                    <li className="app-border-right period-btns" onClick={(el) => {
                        this.setState({selectedPeriod: 3});
                        this.setInitialState();

                        let btns = document.querySelectorAll(".period-btns");
                        for (let i = 0; i < btns.length; i++) {
                            btns[i].classList.remove("chosen");
                        }

                        el.target.closest('li').classList.add("chosen");
                    }}>year</li>
                    <li className="period-btns chosen" onClick={(el) => {
                        this.setState({selectedPeriod: 0});
                        this.setInitialState();

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
                        <div className="col text-success app-border-bottom">{this.state.totalProfits}</div>

                        <div className="col app-border-bottom app-border-right">number of losses:</div>
                        <div className="col text-danger app-border-bottom">{this.state.totalExpenses}</div>

                        <div className="col app-border-right">total:</div>
                        <div className="col">{this.state.totalProfits - this.state.totalExpenses}</div>
                    </div>
                </div>
                <div className="d-flex justify-content-between person-info-nick">
                    <h4>{person.name}'s info:</h4>
                    <div className="d-flex justify-content-evenly m-2 controls-btns-person">
                        <BsFillPencilFill className="icon" onClick={() => {
                            document.querySelector(".app-modal-edit main input").value = person.name;
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
                        <div className="col text-success app-border-bottom">{this.state.personProfits}</div>

                        <div className="col app-border-bottom app-border-right">number of losses:</div>
                        <div className="col text-danger app-border-bottom">{this.state.personExpenses}</div>

                        <div className="col app-border-right">total:</div>
                        <div className="col">{this.state.personProfits - this.state.personExpenses}</div>
                    </div>
                </div>
                <div className="periods">
                    <header>
                        <h3>History</h3>
                    </header>
                    <main>
                        <PersonHistory person={person} transactions={this.state.personTransactions} selectedPeriod={this.state.selectedPeriod} dateFrom={this.state.dateFrom} dateTo={this.state.dateTo} setPeriodIdSelector={this.props.setPeriodIdSelector} remove={this.props.removeHistory}/>
                    </main>
                    <footer className="d-flex">
                        <button className="btn m-1" onClick={() => {
                            document.querySelector(".app-modal-history").classList.remove("d-none");
                        }}><BiPlus className="icon-plus"/> Add History</button>
                    </footer>
                </div>
            </main>
            <SetPeriod setInitialStatePI={this.setInitialState} setDateFrom={this.setDateFrom} setDateTo={this.setDateTo} dateFrom={this.state.dateFrom} dateTo={this.state.dateTo}/>
        </main>)
    }

    async componentDidMount() {
        await this.setInitialState();
    }

    async componentDidUpdate() {
        if (this.props.updatesetInitialState) {
            await this.setInitialState();
            this.props.setBoolUpdatePI(false);
        }
    }

    async setInitialState() {
        const result = await this.props.setInitialStateApp();
        const person = this.props.selectPerson();

        const allTransactions = await this.allTransactions(result);
        const totalProfits = this.totalProfits(allTransactions);
        const totalExpenses = this.totalExpenses(allTransactions);

        this.setState({ totalProfits, totalExpenses, allTransactions });

        if (person.id > 0) {
            const personTransactions = await this.personTransactions(person);
            const personProfits = this.totalProfits(personTransactions);
            const personExpenses = this.totalExpenses(personTransactions);

            this.setState({ personTransactions, personProfits, personExpenses });
        }
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

    async personTransactions(person) {
        try {
            const result = await axios.get(`http://${API_URL}:8080/api/v1/protected/transaction/${person.id}`);
            return result.data.profileTransactions;
        } catch (error) {
            console.error(`Error fetching transactions for person with ID ${person.id}:`, error);
            return [];
        }
    }

    async allTransactions(persons) {
        try {
            const transactionPromises = persons.map(async (person) => await this.personTransactions(person));
    
            const allPersonTransactions = await Promise.all(transactionPromises);
            return allPersonTransactions.flat();
        } catch (error) {
            console.error("Error fetching transactions for persons:", error);
            return [];
        }
    }

    totalProfits(transactions) {

        let count = 0;

        const currentDate = new Date();

        const dateFromParts = this.state.dateFrom.split("-");
        const dateFrom = new Date(dateFromParts[2], dateFromParts[1] - 1, dateFromParts[0]);

        const dateToParts = this.state.dateTo.split("-");
        const dateTo = new Date(dateToParts[2], dateToParts[1] - 1, dateToParts[0]);

        if (this.state.selectedPeriod === 1) {
            for (let i = 0; i < transactions.length; i++) {
                const [year, month, day] = transactions[i].createdAt;
                if(transactions[i].type === "INCOME" && parseInt(day) === currentDate.getDate() && parseInt(month) - 1 === currentDate.getMonth() && parseInt(year) === currentDate.getFullYear()) {
                    count += transactions[i].amount;
                }
            }
        }
        else if (this.state.selectedPeriod === 2) {
            for (let i = 0; i < transactions.length; i++) {
                const [year, month] = transactions[i].createdAt;
                if(transactions[i].type === "INCOME" && parseInt(month) - 1 === currentDate.getMonth() && parseInt(year) === currentDate.getFullYear()) {
                    count += transactions[i].amount;
                }
            }
        }
        else if (this.state.selectedPeriod === 3) {
            for (let i = 0; i < transactions.length; i++) {
                const [year] = transactions[i].createdAt;
                if(transactions[i].type === "INCOME" && parseInt(year) === currentDate.getFullYear()) {
                    count += transactions[i].amount;
                }
            }
        }
        else if (this.state.selectedPeriod === 4) {
            const elementsForPeriod = transactions.filter((period) => {
                const [year, month, day] = period.createdAt;
                const periodDate = new Date(year, month - 1, day);

                if (dateFrom > dateTo) {
                    return (periodDate <= dateFrom && periodDate >= dateTo);
                }
                return ( periodDate >= dateFrom && periodDate <= dateTo);
            });
        
            for (let i = 0; i < elementsForPeriod.length; i++) {
                if (elementsForPeriod[i].type === "INCOME") {
                    count += elementsForPeriod[i].amount;
                }
            }
        }
        else {
            for (let i = 0; i < transactions.length; i++) {
                if(transactions[i].type === "INCOME") {
                    count += transactions[i].amount;
                }
            }
        }

        return count;
    }
    
    totalExpenses(transactions) {
        
        let count = 0;

        const currentDate = new Date();

        const dateFromParts = this.state.dateFrom.split("-");
        const dateFrom = new Date(dateFromParts[2], dateFromParts[1] - 1, dateFromParts[0]);

        const dateToParts = this.state.dateTo.split("-");
        const dateTo = new Date(dateToParts[2], dateToParts[1] - 1, dateToParts[0]);

        if (this.state.selectedPeriod === 1) {
            for (let i = 0; i < transactions.length; i++) {
                const [year, month, day] = transactions[i].createdAt;
                if(transactions[i].type === "OUTCOME" && parseInt(day) === currentDate.getDate() && parseInt(month) - 1 === currentDate.getMonth() && parseInt(year) === currentDate.getFullYear()) {
                    count += transactions[i].amount;
                }
            }
        }
        else if (this.state.selectedPeriod === 2) {
            for (let i = 0; i < transactions.length; i++) {
                const [year, month] = transactions[i].createdAt;
                if(transactions[i].type === "OUTCOME" && parseInt(month) - 1 === currentDate.getMonth() && parseInt(year) === currentDate.getFullYear()) {
                    count += transactions[i].amount;
                }
            }
        }
        else if (this.state.selectedPeriod === 3) {
            for (let i = 0; i < transactions.length; i++) {
                const [year] = transactions[i].createdAt;
                if(transactions[i].type === "OUTCOME" && parseInt(year) === currentDate.getFullYear()) {
                    count += transactions[i].amount;
                }
            }
        }
        else if (this.state.selectedPeriod === 4) {
            const elementsForPeriod = transactions.filter((period) => {
                const [year, month, day] = period.createdAt;
                const periodDate = new Date(year, month - 1, day);

                if (dateFrom > dateTo) {
                    return (periodDate <= dateFrom && periodDate >= dateTo);
                }
                return ( periodDate >= dateFrom && periodDate <= dateTo);
            });
        
            for (let i = 0; i < elementsForPeriod.length; i++) {
                if (elementsForPeriod[i].type === "OUTCOME") {
                    count += elementsForPeriod[i].amount;
                }
            }
        }
        else {
            for (let i = 0; i < transactions.length; i++) {
                if(transactions[i].type === "OUTCOME") {
                    count += transactions[i].amount;
                }
            }
        }

        return count;
    }
}

export default PersonInfo;
