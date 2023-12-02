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
        let periods = this.props.person.periods;
        const currentDate = new Date();

        const dateFromParts = this.props.dateFrom.split("-");
        const dateFrom = new Date(dateFromParts[2], dateFromParts[1] - 1, dateFromParts[0]);

        const dateToParts = this.props.dateTo.split("-");
        const dateTo = new Date(dateToParts[2], dateToParts[1] - 1, dateToParts[0]);

        // currentDate like "1.1.1111"
        if (this.props.selectedPeriod === 1) {
            return periods.filter((period) => {
                const dateParts = period.date.split(".");
                if (parseInt(dateParts[0]) === currentDate.getDate() && parseInt(dateParts[1]) - 1 === currentDate.getMonth() && parseInt(dateParts[2]) === currentDate.getFullYear()) {
                    return true;
                }
                return false;
            })
        }
        else if (this.props.selectedPeriod === 2) {
            return periods.filter((period) => {
                const dateParts = period.date.split(".");
                if (parseInt(dateParts[1]) - 1 === currentDate.getMonth() && parseInt(dateParts[2]) === currentDate.getFullYear()) {
                    return true;
                }
                return false;
            })
        }
        else if (this.props.selectedPeriod === 3) {
            return periods.filter((period) => {
                const dateParts = period.date.split(".");
                if (parseInt(dateParts[2]) === currentDate.getFullYear()) {
                    return true;
                }
                return false;
            })
        }
        else if (this.props.selectedPeriod === 4) {
            return periods.filter((period) => {
                const dateParts = period.date.split(".");
                const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                
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
            return periods;
        }
        // else if (this.props.selectedPeriod === 2) {
        //     for (let i = 0; i < periods.length; i++) {
        //         const date = periods[i].date.split(".");
        //         if(periods[i].money >= 0 && parseInt(date[1]) - 1 === currentDate.getMonth() && parseInt(date[2]) === currentDate.getFullYear()) {
        //             count += periods[i].money;
        //         }
        //     }
        // }
        // else if (this.props.selectedPeriod === 3) {
        //     for (let i = 0; i < periods.length; i++) {
        //         const date = periods[i].date.split(".");
        //         if(periods[i].money >= 0 && parseInt(date[2]) === currentDate.getFullYear()) {
        //             count += periods[i].money;
        //         }
        //     }
        // }
        // else if (this.props.selectedPeriod === 4) {
        //     const elementsForPeriod = periods.filter((period) => {

        //         const periodDateParts = period.date.split(".")
        //         const periodDate = new Date(periodDateParts[2], periodDateParts[1] - 1, periodDateParts[0]);

        //         if (dateFrom > dateTo) {
        //             return (
        //                 periodDate <= dateFrom &&
        //                 periodDate >= dateTo
        //             );
        //         }
        //         return (
        //             periodDate >= dateFrom &&
        //             periodDate <= dateTo
        //         );
        //     });
        
        //     for (let i = 0; i < elementsForPeriod.length; i++) {
        //         if (elementsForPeriod[i].money >= 0) {
        //             count += elementsForPeriod[i].money;
        //         }
        //     }
        // }
        // else {
        //     for (let i = 0; i < periods.length; i++) {
        //         if(periods[i].money >= 0) {
        //             count += periods[i].money;
        //         }
        //     }
        // }
    }
}

export default PersonHistory;