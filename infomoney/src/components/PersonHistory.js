import React from "react";
import Period from "./Period";

class PersonHistory extends React.Component {
    render () {
        if (this.props.periods.length > 0) {
            return (<ul className="scroll-0">
                {this.props.periods.map((el) => (
                    <Period key={el.id} period={el} setPeriodIdSelector={this.props.setPeriodIdSelector} remove={this.props.remove}/>
                ))}
            </ul>)
        }
        else {
            return (<ul className="d-flex justify-content-center align-items-center user-select-none scroll-0">
                <h3>History is empty</h3>
            </ul>)
        }
    }
}

export default PersonHistory;