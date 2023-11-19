import React from 'react';
import Persons from './components/Persons';
import PersonInfo from './components/PersonInfo';
import AddPerson from './components/AddPerson';
import AddHistory from './components/AddHistory';
import EditPerson from './components/EditPerson';
import EditHistory from './components/EditHistory';

import { BiPlus } from "react-icons/bi";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            selectedPersonId: 0,
            selectedPeriodId: 0,
        }
        this.removePerson = this.removePerson.bind(this);
        this.removeHistory = this.removeHistory.bind(this);
        this.addPerson = this.addPerson.bind(this);
        this.editPerson = this.editPerson.bind(this);
        this.editHistory = this.editHistory.bind(this);
        this.addHistory = this.addHistory.bind(this);
        this.selectPerson = this.selectPerson.bind(this);
        this.setIdSelector = this.setIdSelector.bind(this);
        this.setPeriodIdSelector = this.setPeriodIdSelector.bind(this);
        this.totalProfits = this.totalProfits.bind(this);
        this.totalExpenses = this.totalExpenses.bind(this);
        this.personProfits = this.personProfits.bind(this);
        this.personExpenses = this.personExpenses.bind(this);
    }
    
    render() {

        return (<div className="App d-flex justify-content-evenly user-select-none">
            <div className="persons-list">

                <Persons persons={this.state.persons} setIdSelector={this.setIdSelector} edit={this.editPerson}/>
                <button className="btn" onClick={() => {
                    if (this.state.persons.length < 10) {
                        document.querySelector(".app-modal").classList.remove("d-none");
                    }
                    else {

                    }
                }}><BiPlus className="icon-plus"/> Add Person</button>

            </div>
            <PersonInfo personExpenses={this.personExpenses} personProfits={this.personProfits} totalProfits={this.totalProfits} totalExpenses={this.totalExpenses} selectPerson={this.selectPerson} setPeriodIdSelector={this.setPeriodIdSelector} remove={this.removePerson} removeHistory={this.removeHistory}/>

            <AddPerson addPerson={this.addPerson} edit={this.editPerson}/>
            <AddHistory addHistory={this.addHistory}/>
            <EditPerson editPerson={this.editPerson}/>
            <EditHistory editHistory={this.editHistory}/>
        </div>);
    }

    addPerson(id, nick) {
        this.setState({
            persons: [
                ...this.state.persons,
                {
                    id: id,
                    nick: nick,
                    periods: []
                }
            ],
            selectedPersonId: this.state.selectedPersonId,
            selectedPeriodId: this.state.selectedPeriodId
        });
    }

    editPerson(nick) {
        this.setState({
            persons: this.state.persons.map(el => {
                if (el.id === this.state.selectedPersonId) {
                    return {
                        id: el.id,
                        nick: nick,
                        periods: el.periods
                    }
                }
                return el;
            }),
            selectedPersonId: this.state.selectedPersonId,
            selectedPeriodId: this.state.selectedPeriodId
        })
    }

    editHistory(money, disc) {
        const person = this.selectPerson();
        const updatedPersons = this.state.persons.map(el => {
            if (el.id === person.id) {
                return {
                    ...el,
                    periods: person.periods.map(el2 => {
                        if (el2.id === this.state.selectedPeriodId) {
                            return {
                                id: this.state.selectedPeriodId,
                                money: money,
                                disc: disc
                            }
                        }
                        return el2;
                    })
                }
            }
            return el;
        })

        this.setState({
            persons: updatedPersons,
            selectedPersonId: this.state.selectedPersonId,
            selectedPeriodId: this.state.selectedPeriodId
        });
    }

    addHistory(id, money, disc) {
        const person = this.selectPerson();
        const updatedPersons = this.state.persons.map(el => {
            if (el.id === person.id) {
                return {
                    ...el,
                    periods: [
                        ...el.periods,
                        {
                            id: id,
                            money: money,
                            disc: disc
                        }
                    ]
                };
            }
            return el;
        });
    
        this.setState({
            persons: updatedPersons,
            selectedPersonId: this.state.selectedPersonId,
            selectedPeriodId: this.state.selectedPeriodId
        });
    }

    selectPerson() {
        let persons = this.state.persons;
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].id === this.state.selectedPersonId) {
                return persons[i];
            }
        }
        return {id: 0, nick: "InfoMoney"};
    }

    removePerson() {
        this.setState({
            persons: this.state.persons.filter((el) => el.id !== this.state.selectedPersonId),
            selectedPersonId: this.state.selectedPersonId,
            selectedPeriodId: this.state.selectedPeriodId
        })
    }

    removeHistory(id) {
        const person = this.selectPerson();
        const updatedPersons = this.state.persons.map(el => {
            if (el.id === person.id) {
                return {
                    ...el,
                    periods: el.periods.filter(el2 => el2.id !== id)
                };
            }
            return el;
        });

        this.setState({
            persons: updatedPersons,
            selectedPersonId: this.state.selectedPersonId,
            selectedPeriodId: this.state.selectedPeriodId
        })
    }

    setIdSelector(id) {
        this.setState({
            persons: this.state.persons,
            selectedPersonId: id,
            selectedPeriodId: this.state.selectedPeriodId
        })
    }

    setPeriodIdSelector(id) {
        this.setState({
            persons: this.state.persons,
            selectedPersonId: this.state.selectedPersonId,
            selectedPeriodId: id
        })
    }

    personProfits(id) {
        let periods = this.findPersonById(id).periods;
        let count = 0;
        for (let i = 0; i < periods.length; i++) {
            if(periods[i].money >= 0) {
                count += periods[i].money;
            }
        }
        return count;
    }

    personExpenses(id) {
        let periods = this.findPersonById(id).periods;
        let count = 0;
        for (let i = 0; i < periods.length; i++) {
            if(periods[i].money < 0) {
                count += periods[i].money;
            }
        }
        return count;
    }

    totalProfits() {
        let persons = this.state.persons;
        let count = 0;
        for (let i = 0; i < persons.length; i++) {
            count += this.personProfits(persons[i].id);
        }
        return count;
    }

    totalExpenses() {
        let persons = this.state.persons;
        let count = 0;
        for (let i = 0; i < persons.length; i++) {
            count += this.personExpenses(persons[i].id);
        }
        return count;
    }

    findPersonById(id) {
        for (let i = 0; i < this.state.persons.length; i++) {
            if (this.state.persons[i].id === id) {
                return this.state.persons[i];
            }
        }
    }
}

export default App;