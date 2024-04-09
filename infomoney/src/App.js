import React from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import PersonInfo from './components/PersonInfo';
import AddPerson from './components/AddPerson';
import AddHistory from './components/AddHistory';
import EditPerson from './components/EditPerson';
import EditHistory from './components/EditHistory';
import RemovePerson from './components/RemovePerson';
import FirstPage from './components/FirstPage';
import SameName from './components/SameName';
import AddWallet from './components/AddWallet';
import EditWallet from './components/EditWallet';
import AddCategory from './components/AddCategory';
import EditCategory from './components/EditCategory';

import { BiPlus } from "react-icons/bi";
import { BsBoxes } from "react-icons/bs";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

const API_URL = "apiurl";
const LOCAL_URL = "localhost";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            wallets: [],
            categories: [],
            selectedPersonId: 0,
            selectedWalletId: 0,
            selectedCategoryId: 0,
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
        this.setPersonIdSelector = this.setPersonIdSelector.bind(this);
        this.setWalletIdSelector = this.setWalletIdSelector.bind(this);
        this.setCategoryIdSelector = this.setCategoryIdSelector.bind(this);
        this.setPeriodIdSelector = this.setPeriodIdSelector.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
        this.setBoolUpdatePI = this.setBoolUpdatePI.bind(this);
        this.addWallet = this.addWallet.bind(this);
        this.editWallet = this.editWallet.bind(this);
        this.removeWallet = this.removeWallet.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.editCategory = this.editCategory.bind(this);
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

                    <Persons persons={this.state.persons} setIdSelector={this.setPersonIdSelector} edit={this.editPerson}/>
                    <button className="btn" onClick={() => {
                        document.querySelector(".app-modal").classList.remove("d-none");
                    }}><BiPlus className="icon-plus"/> Add Person</button>

                </div>
                <PersonInfo
                    setBoolUpdatePI={this.setBoolUpdatePI}
                    updatesetInitialState={this.state.updatesetInitialStatePI}
                    setInitialStateApp={this.setInitialState}
                    persons={this.state.persons}
                    selectPerson={this.selectPerson}
                    setIdSelector={this.setPersonIdSelector}
                    setWalletIdSelector={this.setWalletIdSelector}
                    setCategoryIdSelector={this.setCategoryIdSelector}
                    setPeriodIdSelector={this.setPeriodIdSelector}
                    removeWallet={this.removeWallet}
                    removeCategory={this.removeCategory}
                    removeHistory={this.removeHistory}
                />

                <AddPerson addPerson={this.addPerson}/>
                <AddHistory addHistory={this.addHistory} wallets={this.state.wallets} categories={this.state.categories}/>
                <EditPerson editPerson={this.editPerson}/>
                <EditHistory editHistory={this.editHistory} wallets={this.state.wallets} categories={this.state.categories}/>
                <RemovePerson selectPerson={this.selectPerson} remove={this.removePerson}/>
                <SameName message={this.state.errorMessage}/>
                <AddWallet addWallet={this.addWallet}/>
                <EditWallet editWallet={this.editWallet}/>
                <AddCategory addCategory={this.addCategory}/>
                <EditCategory editCategory={this.editCategory}/>
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
        const result = await axios.get(`http://${API_URL}:8080/api/v1/protected/transaction`);
        const wallets = await axios.get(`http://${API_URL}:8080/api/v1/protected/wallet`);
        const categories = await axios.get(`http://${API_URL}:8080/api/v1/protected/category`)
        const info = { persons: result.data.profiles, wallets: wallets.data, categories: categories.data };
        this.setState({ persons: info.persons, wallets: info.wallets, categories: info.categories });
        return info;
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
        await axios.post(`http://${API_URL}:8080/api/v1/protected/profile`, { name: nick });
        await this.setInitialState();
    }

    async editPerson(nick) {
        await axios.patch(`http://${API_URL}:8080/api/v1/protected/profile/${this.state.selectedPersonId}`, {name: nick});
        await this.setInitialState();
    }

    async removePerson() {
        await axios.delete(`http://${API_URL}:8080/api/v1/protected/profile/${this.state.selectedPersonId}`);
        this.setState({ updatesetInitialStatePI: true });
    }

    async addWallet(walletName) {
        await axios.post(`http://${API_URL}:8080/api/v1/protected/wallet`, { profileId: this.state.selectedPersonId, name: walletName, description: "" });
        this.setState({ updatesetInitialStatePI: true });
    }

    async editWallet(walletName) {
        await axios.put(`http://${API_URL}:8080/api/v1/protected/wallet/${this.state.selectedWalletId}`, { profileId: this.state.selectedPersonId, name: walletName, description: "" });
        this.setState({ updatesetInitialStatePI: true });
    }

    async removeWallet() {
        await axios.delete(`http://${API_URL}:8080/api/v1/protected/wallet/${this.state.selectedWalletId}`);
        this.setState({ updatesetInitialStatePI: true });
    }

    async addCategory(categoryName) {
        await axios.post(`http://${API_URL}:8080/api/v1/protected/category`, { profileId: this.state.selectedPersonId, name: categoryName, description: "" });
        this.setState({ updatesetInitialStatePI: true });
    }

    async editCategory(categoryName) {
        await axios.put(`http://${API_URL}:8080/api/v1/protected/category/${this.state.selectedCategoryId}`, { profileId: this.state.selectedPersonId, name: categoryName, description: "" });
        this.setState({ updatesetInitialStatePI: true });
    }

    async removeCategory() {
        await axios.delete(`http://${API_URL}:8080/api/v1/protected/category/${this.state.selectedCategoryId}`);
        this.setState({ updatesetInitialStatePI: true });
    }

    async addHistory(money, type, date, desc, walletId, categoryId) {
        await axios.post(`http://${API_URL}:8080/api/v1/protected/transaction/${this.state.selectedPersonId}`, {
            description: desc,
            amount: money,
            type,
            createdAt: date,
            walletId,
            categoryId
        });
        this.setState({ updatesetInitialStatePI: true });
    }

    async editHistory(money, type, date, desc, walletId, categoryId) {
        await axios.put(`http://${API_URL}:8080/api/v1/protected/transaction/${this.state.selectedPersonId}/update/${this.state.selectedPeriodId}`, {
            description: desc,
            amount: money,
            type,
            createdAt: date,
            walletId,
            categoryId
        });
        this.setState({ updatesetInitialStatePI: true });
    }

    async removeHistory(id) {
        await axios.delete(`http://${API_URL}:8080/api/v1/protected/transaction/${this.state.selectedPersonId}/delete/${id}`);
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

    setPersonIdSelector(id) {
        this.setState({
            selectedPersonId: id,
            updatesetInitialStatePI: true
        })
    }

    setWalletIdSelector(id) {
        this.setState({
            selectedWalletId: id,
            updatesetInitialStatePI: true
        })
    }

    setCategoryIdSelector(id) {
        this.setState({
            selectedCategoryId: id,
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