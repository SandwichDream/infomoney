import React from "react";
import Period from "./Period";

class PersonHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "INCOME"
        };
    }

    handleTypeChange = (event) => {
        this.setState({ type: event.target.value });
    };

    render () {
        const { transactions } = this.props;
        const { type } = this.state;

        const periods = type === "INCOME" ? transactions.profits : transactions.expenses;

        return (
            <div>
                <div className="check-transaction-type">
                    <label className="p-2">
                        <input
                            type="radio"
                            value="INCOME"
                            checked={type === "INCOME"}
                            onChange={this.handleTypeChange}
                        />
                        Profits
                    </label>
                    <label className="p-2">
                        <input
                            type="radio"
                            value="OUTCOME"
                            checked={type === "OUTCOME"}
                            onChange={this.handleTypeChange}
                        />
                        Expences
                    </label>
                </div>
                {periods.length > 0 ? (
                    <ul className="scroll-0">
                        {periods.map((el) => (
                            <Period key={el.id} period={el} setPeriodIdSelector={this.props.setPeriodIdSelector} remove={this.props.remove}/>
                        ))}
                    </ul>
                ) : (
                    <ul className="d-flex justify-content-center align-items-center scroll-0">
                        <h3>History is empty</h3>
                    </ul>
                )}
            </div>
        );
    }
}

export default PersonHistory;