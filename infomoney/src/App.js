import React from 'react';
import Persons from './components/Persons';
import PersonInfo from './components/PersonInfo';
import AddPerson from './components/AddPerson';
import AddHistory from './components/AddHistory';
import EditPerson from './components/EditPerson';
import EditHistory from './components/EditHistory';
import Remove from './components/Remove';
import FirstPage from './components/FirstPage';

import { BiPlus } from "react-icons/bi";
import { BsBoxes } from "react-icons/bs";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            selectedPersonId: 0,
            selectedPeriodId: 0,
            boxes: true
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
    }
    
    render() {

        return (<div className="App user-select-none">
            
            <div className="d-flex justify-content-evenly app-fun d-none">
                <BsBoxes className="bs-boxes" onClick={() => {
                    let el = document.querySelector(".persons-list");
                    this.state.boxes ? el.style.display = "block" : el.style.display = "none";
                    this.setState({boxes: !this.state.boxes});
                }}/>

                <div className="persons-list">

                    <Persons persons={this.state.persons} setIdSelector={this.setIdSelector} edit={this.editPerson}/>
                    <button className="btn" onClick={() => {
                        document.querySelector(".app-modal").classList.remove("d-none");
                    }}><BiPlus className="icon-plus"/> Add Person</button>

                </div>
                <PersonInfo persons={this.state.persons} selectPerson={this.selectPerson} setIdSelector={this.setIdSelector} setPeriodIdSelector={this.setPeriodIdSelector} removeHistory={this.removeHistory}/>

                <AddPerson addPerson={this.addPerson} edit={this.editPerson}/>
                <AddHistory addHistory={this.addHistory}/>
                <EditPerson editPerson={this.editPerson}/>
                <EditHistory editHistory={this.editHistory}/>
                <Remove selectPerson={this.selectPerson} remove={this.removePerson}/>
            </div>
            
            <FirstPage/>
            
        </div>);
    }

    componentDidMount() {
        this.checkWindowWidth();
        window.addEventListener('resize', this.checkWindowWidth);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.checkWindowWidth);
    }
    
    checkWindowWidth = () => {
        const el = document.querySelector(".persons-list");
        if (window.innerWidth > 1050) {
            el.style.display = "block";
            this.setState({ boxes: true });
        } else {
            this.setState({ boxes: false });
        }
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

    editHistory(money, date, disc) {
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
                                date: date,
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

    addHistory(id, money, date, disc) {
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
                            date: date,
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
}

export default App;