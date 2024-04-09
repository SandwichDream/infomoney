import React from "react";

import { BiX } from "react-icons/bi";

class EditWallet extends React.Component {
    render() {
        return (<div className="app-modal edit-wallet modal-fullscreen d-none">
            <div>
                <header className="d-flex justify-content-between mb-4">
                    <h5>Edit Wallet</h5>
                    <BiX className="bix" onClick={() => {
                        let walletName = document.querySelector(".edit-wallet main input");
                        walletName.value = "";
                        walletName.placeholder = "Wallet Name";
                        walletName.classList.remove("red-placeholder");
                        document.querySelector(".edit-wallet").classList.add("d-none");
                    }}/>
                </header>
                <main className="d-flex flex-column justify-content-center">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Wallet Name" maxLength="32"/>
                    </div>
                </main>
                <footer className="d-flex justify-content-end">
                    <button className="btn" onClick={() => {
                        let walletName = document.querySelector(".edit-wallet main input");

                        if (walletName.value !== "") {
                            
                            this.props.editWallet(walletName.value);

                            walletName.placeholder = "Wallet Name";
                            walletName.classList.remove("red-placeholder");
                            document.querySelector(".edit-wallet").classList.add("d-none");
                        }
                        else {
                            walletName.placeholder = "Enter a wallet name, please";
                            walletName.classList.add("red-placeholder");
                        }

                        walletName.value = "";
                    
                    }}>Edit</button>
                </footer>
            </div>
        </div>)
    }
}

export default EditWallet;