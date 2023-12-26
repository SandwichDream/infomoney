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

        return(<li className="d-flex justify-content-evenly period">
            <div className="d-flex align-items-center p-2 app-border-right money">{period.amount}</div>
            <div className="d-flex align-items-center p-2 app-border-right date">{formattedDate}</div>
            <div className="p-2 app-border-right disc">{period.description}</div>
            <div className="d-flex flex-column justify-content-evenly m-2 control-bnts">
                <BsTrashFill className="icon m-1" onClick={() => this.props.remove(period.id)}/>
                <BsFillPencilFill className="icon m-1" onClick={() => {
                    this.props.setPeriodIdSelector(period.id);
                    document.querySelector(".app-modal-history-edit main input").value = period.money;

                    const parts = period.date.split(".");
                    document.querySelector(".app-modal-history-edit main .select-date").value = parts[0];
                    document.querySelector(".app-modal-history-edit main .select-month").value = parseInt(parts[1]) - 1;
                    document.querySelector(".app-modal-history-edit main .select-year").value = parts[2];

                    document.querySelector(".app-modal-history-edit main textarea").value = period.disc;
                    document.querySelector(".app-modal-history-edit").classList.remove("d-none");
                }}/>
            </div>
        </li>)
    }
}

export default Period;