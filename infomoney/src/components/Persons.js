import React from "react";
import Person from "./Person";

class Persons extends React.Component {

    render() {
        if (this.props.persons.length > 0) {
            return (<ul className="scroll-0">
                {this.props.persons.map((el) => (
                    <Person key={el.id} person={el} setIdSelector={this.props.setIdSelector} edit={this.props.edit} remove={this.props.remove}/>
                ))}
            </ul>)
        }
    
        else {
            return (<ul className="d-flex align-items-center justify-content-center scroll-0">
                <h3>Person list is empty</h3>
            </ul>)
        }
    }
}

export default Persons;