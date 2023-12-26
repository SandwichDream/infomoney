import React from "react";
import Period from "./Period";

class PersonHistory extends React.Component {
    render () {
        const periods = this.selectedPeriods();

        if (periods.length > 0) {
            return (<ul className="scroll-0">
                {periods.map((el) => (
                    <Period key={el.id} period={el} setPeriodIdSelector={this.props.setPeriodIdSelector} remove={this.props.remove}/>
                ))}
            </ul>)
        }
        else {
            return (<ul className="d-flex justify-content-center align-items-center scroll-0">
                <h3>History is empty</h3>
            </ul>)
        }
    }

    selectedPeriods() {
        const transactions = this.props.transactions;
        const currentDate = new Date();

        const dateFromParts = this.props.dateFrom.split("-");
        const dateFrom = new Date(dateFromParts[2], dateFromParts[1] - 1, dateFromParts[0]);

        const dateToParts = this.props.dateTo.split("-");
        const dateTo = new Date(dateToParts[2], dateToParts[1] - 1, dateToParts[0]);

        if (this.props.selectedPeriod === 1) {
            return transactions.filter((transaction) => {
                const [year, month, day] = transaction.createdAt;
                if(parseInt(day) === currentDate.getDate() && parseInt(month) - 1 === currentDate.getMonth() && parseInt(year) === currentDate.getFullYear()) {
                    return true;
                }
                return false;
            })
        }
        else if (this.props.selectedPeriod === 2) {
            return transactions.filter((transaction) => {
                const [year, month] = transaction.createdAt
                if (parseInt(month) - 1 === currentDate.getMonth() && parseInt(year) === currentDate.getFullYear()) {
                    return true;
                }
                return false;
            })
        }
        else if (this.props.selectedPeriod === 3) {
            return transactions.filter((transaction) => {
                const [year] = transaction.createdAt
                if (parseInt(year) === currentDate.getFullYear()) {
                    return true;
                }
                return false;
            })
        }
        else if (this.props.selectedPeriod === 4) {
            return transactions.filter((transaction) => {
                const [year, month, day] = transaction.createdAt;
                const date = new Date(year, month - 1, day);
                
                if (dateFrom > dateTo) {
                    if (date <= dateFrom && date >= dateTo) {
                        return true;
                    }
                }
                else if (date >= dateFrom && date <= dateTo) {
                    return true;
                }
                return false;
            })
        }
        else {
            return transactions;
        }
    }
}

export default PersonHistory;