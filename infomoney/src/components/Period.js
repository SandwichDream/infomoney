import React from "react";

import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";

class Period extends React.Component {
    render() {

        const period = this.props.period;

        const [yearP, monthP, dayP] = period.createdAt;
        const date = new Date(yearP, monthP - 1, dayP);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${day}-${month}-${year}`;

        const moneyStyle = {
            color: period.type === "OUTCOME" ? 'red' : 'green'
        };

        return(<li className="d-flex justify-content-evenly period">
            <div className="d-flex overflow-hidden align-items-center p-2 app-border-right money" style={moneyStyle}>{period.amount}</div>
            <div className="d-flex overflow-hidden align-items-center p-2 app-border-right date">{formattedDate}</div>
            <div className="d-flex overflow-hidden align-items-center p-2 app-border-right wallet">{period.walletName}</div>
            <div className="d-flex overflow-hidden align-items-center p-2 app-border-right category">{period.categoryName}</div>
            <div className="p-2 app-border-right desc">{period.description}</div>
            <div className="d-flex flex-column justify-content-evenly m-2 control-bnts">
                <BsTrashFill className="icon m-1" onClick={() => this.props.remove(period.id)}/>
                <BsFillPencilFill className="icon m-1" onClick={() => {
                    this.props.setPeriodIdSelector(period.id);
                    document.querySelector(".edit-history main input").value = period.amount;

                    const [year, month, day] = period.createdAt;
                    document.querySelector(".edit-history main .select-date").value = day;
                    document.querySelector(".edit-history main .select-month").value = month - 1;
                    document.querySelector(".edit-history main .select-year").value = year;

                    document.querySelector(".edit-history main textarea").value = period.description;
                    document.querySelector(".edit-history").classList.remove("d-none");
                }}/>
            </div>
        </li>)
    }
}

export default Period;