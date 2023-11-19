import React from "react";

import { BsFillXCircleFill, BsFillPencilFill } from "react-icons/bs";

class Period extends React.Component {
    render() {

        const period = this.props.period;

        return(<li className="d-flex justify-content-evenly period">
            <div className="d-flex align-items-center p-2 app-border-right money">{period.money}</div>
            <div className="p-2 app-border-right disc">{period.disc}</div>
            <div className="d-flex flex-column justify-content-evenly m-2 control-bnts">
                <BsFillXCircleFill className="icon m-1" onClick={() => this.props.remove(period.id)}/>
                <BsFillPencilFill className="icon m-1" onClick={() => {
                    this.props.setPeriodIdSelector(period.id);
                    document.querySelector(".app-modal-history-edit main input").value = period.money;
                    document.querySelector(".app-modal-history-edit main textarea").value = period.disc;
                    document.querySelector(".app-modal-history-edit").classList.remove("d-none");
                }}/>
            </div>
        </li>)
    }
}

export default Period;