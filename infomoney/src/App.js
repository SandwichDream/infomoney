import React from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import PersonInfo from './components/PersonInfo';
import AddPerson from './components/AddPerson';
import AddHistory from './components/AddHistory';
import EditPerson from './components/EditPerson';
import EditHistory from './components/EditHistory';
import Remove from './components/Remove';
import FirstPage from './components/FirstPage';
import SameName from './components/SameName';

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
            boxes: true,
            updatesetInitialStatePI: false,
            errorMessage: ""
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
        this.setInitialState = this.setInitialState.bind(this);
        this.setBoolUpdatePI = this.setBoolUpdatePI.bind(this);
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
                <PersonInfo setBoolUpdatePI={this.setBoolUpdatePI} updatesetInitialState={this.state.updatesetInitialStatePI} setInitialStateApp={this.setInitialState} persons={this.state.persons} selectPerson={this.selectPerson} setIdSelector={this.setIdSelector} setPeriodIdSelector={this.setPeriodIdSelector} removeHistory={this.removeHistory}/>

                <AddPerson addPerson={this.addPerson} edit={this.editPerson}/>
                <AddHistory addHistory={this.addHistory}/>
                <EditPerson editPerson={this.editPerson}/>
                <EditHistory editHistory={this.editHistory}/>
                <Remove selectPerson={this.selectPerson} remove={this.removePerson}/>
                <SameName message={this.state.errorMessage}/>
            </div>
            
            <FirstPage/>
            
        </div>);
    }

    async componentDidMount() {
        this.checkWindowWidth();
        window.addEventListener('resize', this.checkWindowWidth);
        await this.setInitialState();
    }

    async setInitialState() {
        const result = await axios.get("http://localhost:8080/api/v1/protected/transaction");
        const persons = result.data.profiles;
        this.setState({ persons });
        return persons;
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

    async addPerson(nick) {
        try {
            await axios.post("http://localhost:8080/api/v1/protected/profile", { name: nick });
            await this.setInitialState();
        } catch (error) {
            if (error.response) {
                console.error('Server Error:', error.response.data);
                this.setState({ errorMessage: error.response.data });
                document.querySelector(".app-same-name").classList.remove("d-none");
            } else if (error.request) {
                console.error('No response from server:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    }

    async editPerson(nick) {
        await axios.patch(`http://localhost:8080/api/v1/protected/profile/${this.state.selectedPersonId}`, {name: nick});
        await this.setInitialState();
    }

    async removePerson() {
        await axios.delete(`http://localhost:8080/api/v1/protected/profile/${this.state.selectedPersonId}`);
        this.setState({ updatesetInitialStatePI: true });
    }

    async addHistory(money, type, date, desc) {
        await axios.post(`http://localhost:8080/api/v1/protected/transaction/${this.state.selectedPersonId}`, {
            description: desc,
            amount: money,
            type,
            createdAt: date
        });
        this.setState({ updatesetInitialStatePI: true });
    }

    async editHistory(money, type, date, desc) {
        await axios.put(`http://localhost:8080/api/v1/protected/transaction/${this.state.selectedPersonId}/update/${this.state.selectedPeriodId}`, {
            description: desc,
            amount: money,
            type,
            createdAt: date
        });
        this.setState({ updatesetInitialStatePI: true });
    }

    async removeHistory(id) {
        await axios.delete(`http://localhost:8080/api/v1/protected/transaction/${this.state.selectedPersonId}/delete/${id}`);
        this.setState({ updatesetInitialStatePI: true });
    }

    selectPerson() {
        let persons = this.state.persons;
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].id === this.state.selectedPersonId) {
                return persons[i];
            }
        }
        return {id: 0, name: "InfoMoney"};
    }

    setIdSelector(id) {
        this.setState({
            selectedPersonId: id,
            updatesetInitialStatePI: true
        })
    }

    setPeriodIdSelector(id) {
        this.setState({
            selectedPeriodId: id
        })
    }

    setBoolUpdatePI(bool) {
        if (typeof bool === "boolean") {
            this.setState({ updatesetInitialStatePI: bool });
        }
    }
}

export default App;