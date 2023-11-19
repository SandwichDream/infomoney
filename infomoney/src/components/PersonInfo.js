import React from "react";
import PersonHistory from "./PersonHistory";

import { BiPlus } from "react-icons/bi";
import { BsFillXCircleFill, BsFillPencilFill } from "react-icons/bs";

class PersonInfo extends React.Component {

    render() {

        const person = this.props.selectPerson();
        const profits = person.id !== 0 ? this.props.personProfits(person.id) : null;
        const expenses = person.id !== 0 ? this.props.personExpenses(person.id) : null;

        if (person.id === 0) {
            return (<main className="person-info scroll-0">
                <header className="d-flex align-items-center">
                    <div className="person-info-nick user-select-none">
                        <h3>{person.nick}</h3>
                    </div>
                </header>
                <main>
                    <h4>Total:</h4>
                    <div className="container info-money">
                        <div className="row row-cols-2">
                            <div className="col app-border-bottom app-border-right">number of profits:</div>
                            <div className="col text-success app-border-bottom">{this.props.totalProfits()}</div>

                            <div className="col app-border-bottom app-border-right">number of losses:</div>
                            <div className="col text-danger app-border-bottom">{this.props.totalExpenses()}</div>

                            <div className="col app-border-right">total:</div>
                            <div className="col">{this.props.totalProfits() + this.props.totalExpenses()}</div>
                        </div>
                    </div>
                </main>
            </main>)
        }
        return (<main className="person-info scroll-0">
            <header className="d-flex justify-content-between align-items-center">
                <div className="person-info-nick user-select-none app-border-right">
                    <h3>{person.nick}</h3>
                </div>
                <div className="d-flex flex-column justify-content-evenly m-2">
                    <BsFillXCircleFill className="icon" onClick={() => this.props.remove()}/>
                    <BsFillPencilFill className="icon" onClick={() => {
                        document.querySelector(".app-modal-edit main input").value = person.nick;
                        document.querySelector(".app-modal-edit").classList.remove("d-none");
                    }}/>
                </div>
            </header>
            <main>
                <h4>Total:</h4>
                <div className="container info-money">
                    <div className="row row-cols-2">
                        <div className="col app-border-bottom app-border-right">number of profits:</div>
                        <div className="col text-success app-border-bottom">{this.props.totalProfits()}</div>

                        <div className="col app-border-bottom app-border-right">number of losses:</div>
                        <div className="col text-danger app-border-bottom">{this.props.totalExpenses()}</div>

                        <div className="col app-border-right">total:</div>
                        <div className="col">{this.props.totalProfits() + this.props.totalExpenses()}</div>
                    </div>
                </div>
                <h4>{person.nick}'s info:</h4>
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
                    <h3>History</h3>
                    <PersonHistory periods={person.periods} setPeriodIdSelector={this.props.setPeriodIdSelector} remove={this.props.removeHistory}/>
                    <button className="btn" onClick={() => {
                        document.querySelector(".app-modal-history").classList.remove("d-none");
                    }}><BiPlus className="icon-plus"/> Add History</button>
                </div>
            </main>
            
        </main>)
    }
}

export default PersonInfo;