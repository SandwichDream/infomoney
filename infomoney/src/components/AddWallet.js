import React from "react";

import { BiX } from "react-icons/bi";

class AddWallet extends React.Component {
    render() {
        return (<div className="app-modal add-wallet modal-fullscreen d-none">
            <div>
                <header className="d-flex justify-content-between mb-4">
                    <h5>Add Wallet</h5>
                    <BiX className="bix" onClick={() => {
                        let walletName = document.querySelector(".add-wallet main input");
                        walletName.value = "";
                        walletName.placeholder = "Wallet Name";
                        walletName.classList.remove("red-placeholder");
                        document.querySelector(".add-wallet").classList.add("d-none");
                    }}/>
                </header>
                <main className="d-flex flex-column justify-content-center">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Wallet Name" maxLength="32"/>
                    </div>
                </main>
                <footer className="d-flex justify-content-end">
                    <button className="btn" onClick={() => {
                        let walletName = document.querySelector(".add-wallet main input");

                        if (walletName.value !== "") {
                            
                            this.props.addWallet(walletName.value);

                            walletName.placeholder = "Wallet Name";
                            walletName.classList.remove("red-placeholder");
                            document.querySelector(".add-wallet").classList.add("d-none");
                        }
                        else {
                            walletName.placeholder = "Enter a wallet name, please";
                            walletName.classList.add("red-placeholder");
                        }

                        walletName.value = "";
                    
                    }}>Add</button>
                </footer>
            </div>
        </div>)
    }
}

export default AddWallet;