import React from "react";
import axios from "axios";
import PersonHistory from "./PersonHistory";
import SetPeriod from "./SetPeriod";

import { BiPlus } from "react-icons/bi";
import { BsFillXCircleFill, BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import { MdAddCircleOutline, MdCreate, MdRemoveCircleOutline } from "react-icons/md";

const API_URL = "apiurl";
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
            doComponentDidMount: true,
            walletValue: 0,
            categoryValue: 0,
            wallets: [],
            categories: [],
            allTransactions: [],
            transactions: { profits: [], expenses: [] },
            expenseTransactions: [],
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
                    document.querySelector(".set-period").classList.remove("d-none");
                }}>
                    <h6>{this.state.dateFrom}</h6>
                    <h6 className="m-0">{this.state.dateTo}</h6>
                </button>
            </header>
                <main>
                    <h4>Total:</h4>
                    <div className="container info-money">
                        <div className="row row-cols-2">
                            <div className="col app-border-bottom app-border-right">income:</div>
                            <div className="col text-success app-border-bottom">{this.state.totalProfits}</div>

                            <div className="col app-border-bottom app-border-right">expences:</div>
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
                    document.querySelector(".set-period").classList.remove("d-none");
                }}>
                    <h6>{this.state.dateFrom}</h6>
                    <h6 className="m-0">{this.state.dateTo}</h6>
                </button>
            </header>
            <main>
                <h4>Total:</h4>
                <div className="container info-money">
                    <div className="row row-cols-2">
                        <div className="col app-border-bottom app-border-right">income:</div>
                        <div className="col text-success app-border-bottom">{this.state.totalProfits}</div>

                        <div className="col app-border-bottom app-border-right">expences:</div>
                        <div className="col text-danger app-border-bottom">{this.state.totalExpenses}</div>

                        <div className="col app-border-right">total:</div>
                        <div className="col">{this.state.totalProfits - this.state.totalExpenses}</div>
                    </div>
                </div>
                <div className="d-flex justify-content-between person-info-nick">
                    <h4>{person.name}'s info:</h4>
                    <div className="d-flex justify-content-evenly m-2 controls-btns-person">
                        <BsFillPencilFill className="icon" onClick={() => {
                            document.querySelector(".edit-person main input").value = person.name;
                            document.querySelector(".edit-person").classList.remove("d-none");
                        }}/>
                        <BsTrashFill className="icon" onClick={() => document.querySelector(".remove-person").classList.remove("d-none")}/>
                        <BsFillXCircleFill className="icon" onClick={() => {
                            this.props.setIdSelector(0);
                            
                            let nicks = document.querySelectorAll(".person");
                            for (let i = 0; i < nicks.length; i++) {
                                nicks[i].classList.remove("chosen");
                            }
                        }}/>
                    </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                    wallet:
                    <select className="form-select select-wallet" defaultValue={0} onChange={(el) => {
                            this.setState({walletValue: el.target.value});
                            this.props.setWalletIdSelector(el.target.value);
                        }}>
                        <option value="0">All wallets</option>
                        {(() => {
                            const wallets = this.state.wallets;
                            const options = [];

                            for (let i = 0; i < wallets.length; i++) {
                                options.push(<option key={wallets[i].id} value={wallets[i].id}>{wallets[i].name}</option>);
                            }

                            return options;
                        })()}
                    </select>
                    <MdAddCircleOutline className="MdIcon" onClick={() => document.querySelector(".add-wallet").classList.remove("d-none")}/>
                    <MdRemoveCircleOutline className="MdIcon" onClick={() => {
                        if (this.state.walletValue !== 0) {
                            this.props.removeWallet();
                            this.setState({ walletValue: 0 });
                        }
                    }}/>
                    <MdCreate className="MdIcon" onClick={() => {
                        if (this.state.walletValue !== 0) {
                            document.querySelector(".edit-wallet").classList.remove("d-none");
                        }
                    }}/>
                </div>
                <div className="d-flex align-items-center mb-2">
                    category:
                    <select className="form-select select-wallet" defaultValue={0} onChange={(el) => {
                        this.setState({categoryValue: el.target.value});
                        this.props.setCategoryIdSelector(el.target.value);
                    }}>
                        <option value="0">All categories</option>
                        {(() => {
                            const categories = this.state.categories;
                            const options = [];

                            for (let i = 0; i < categories.length; i++) {
                                options.push(<option key={categories[i].id} value={categories[i].id}>{categories[i].name}</option>)
                            }

                            return options;
                        })()}
                    </select>
                    <MdAddCircleOutline className="MdIcon" onClick={() => document.querySelector(".add-category").classList.remove("d-none")}/>
                    <MdRemoveCircleOutline className="MdIcon" onClick={() => {
                        if (this.state.categoryValue !== 0) {
                            this.props.removeCategory();
                            this.setState({ categoryValue: 0 });
                        }
                    }}/>
                    <MdCreate className="MdIcon" onClick={() => {
                        if (this.state.categoryValue !== 0) {
                            document.querySelector(".edit-category").classList.remove("d-none");
                        }
                    }}/>
                </div>
                <div className="container info-money">
                    <div className="row row-cols-2">
                        <div className="col app-border-bottom app-border-right">income:</div>
                        <div className="col text-success app-border-bottom">{this.state.personProfits}</div>

                        <div className="col app-border-bottom app-border-right">expences:</div>
                        <div className="col text-danger app-border-bottom">{this.state.personExpenses}</div>

                        <div className="col app-border-right">total:</div>
                        <div className="col">{this.state.personProfits - this.state.personExpenses}</div>
                    </div>
                </div>
                <div className="periods">
                    <header>
                        <h3>Transactions</h3>
                    </header>
                    <main>
                        <PersonHistory person={person} transactions={this.state.transactions} selectedPeriod={this.state.selectedPeriod} dateFrom={this.state.dateFrom} dateTo={this.state.dateTo} setPeriodIdSelector={this.props.setPeriodIdSelector} remove={this.props.removeHistory}/>
                    </main>
                    <footer className="d-flex">
                        <button className="btn m-1" onClick={() => {
                            document.querySelector(".add-history").classList.remove("d-none");
                        }}><BiPlus className="icon-plus"/> Add History</button>
                    </footer>
                </div>
            </main>
            <SetPeriod setInitialStatePI={this.setInitialState} setDateFrom={this.setDateFrom} setDateTo={this.setDateTo} dateFrom={this.state.dateFrom} dateTo={this.state.dateTo}/>
        </main>)
    }

    async componentDidMount() {
        if (this.state.doComponentDidMount) {
            await this.setInitialState();
            this.setState({ doComponentDidMount: false });
        }
    }

    async componentDidUpdate() {
        if (this.props.updatesetInitialState) {
            await this.setInitialState();
            this.props.setBoolUpdatePI(false);
        }
    }

    async setInitialState() {
        const info = await this.props.setInitialStateApp();
        const person = this.props.selectPerson();

        const allTransactions = await this.allTransactions(info.persons);
        const transactionInfo = this.totalTransactions(allTransactions);

        this.setState({ totalProfits: transactionInfo.profitsAmount, totalExpenses: transactionInfo.expensesAmount, allTransactions, wallets: info.wallets, });

        if (person.id > 0) {
            const personTransactions = await this.personTransactions(person);
            const transactions = this.totalTransactions(personTransactions);

            this.setState({
                personProfits: transactions.profitsAmount,
                personExpenses: transactions.expensesAmount,
                transactions: { profits: transactions.profitsTransactions, expenses: transactions.expensesTransactions },
                categories: info.categories
            });
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

    totalTransactions(transactions) {
        const currentDate = new Date();
        const { dateFrom, dateTo, selectedPeriod } = this.state;

        let info = {
            profitsAmount: 0,
            expensesAmount: 0,
            profitsTransactions: [],
            expensesTransactions: []
        };
    
        const filterByPeriod = (transaction) => {
            if (selectedPeriod === 1) {
                return transaction.createdAt[2] === currentDate.getDate() &&
                       transaction.createdAt[1] === currentDate.getMonth() + 1 &&
                       transaction.createdAt[0] === currentDate.getFullYear();
            } else if (selectedPeriod === 2) {
                return transaction.createdAt[1] === currentDate.getMonth() + 1 &&
                       transaction.createdAt[0] === currentDate.getFullYear();
            } else if (selectedPeriod === 3) {
                return transaction.createdAt[0] === currentDate.getFullYear();
            } else if (selectedPeriod === 4) {
                const periodDate = new Date(transaction.createdAt[0], transaction.createdAt[1] - 1, transaction.createdAt[2]);
                const fromDate = new Date(dateFrom.split("-").reverse().join("-"));
                const toDate = new Date(dateTo.split("-").reverse().join("-"));
                return periodDate >= fromDate && periodDate <= toDate;
            }
            return true;
        };

        const filterByWallet = (transaction) => {
            return parseInt(this.state.walletValue) !== 0 ? transaction.walletName === this.state.wallets.find((wallet) => wallet.id === parseInt(this.state.walletValue)).name : true;
        };

        const filterByCategory = (transaction) => {
            return parseInt(this.state.categoryValue) !== 0 ? transaction.categoryName === this.state.categories.find((category) => category.id === parseInt(this.state.categoryValue)).name : true;
        };

        transactions.map((transaction) => {
            if (filterByPeriod(transaction) && filterByWallet(transaction) && filterByCategory(transaction)) {
                if (transaction.type === "INCOME") {
                    info.profitsAmount += transaction.amount;
                    info.profitsTransactions.push(transaction);
                } else {
                    info.expensesAmount += transaction.amount;
                    info.expensesTransactions.push(transaction);
                }
                
                return true;
            }
        })

        return info;
    }
}

export default PersonInfo;