import React from "react";

class Person extends React.Component {

    render() {
        return (
            <li className="person d-flex justify-content-between" onClick={(el) => {
                this.props.setIdSelector(this.props.person.id);

                let nicks = document.querySelectorAll(".person");
                for (let i = 0; i < nicks.length; i++) {
                    nicks[i].classList.remove("chosen");
                }
                el.target.closest('.person').classList.add("chosen");

            }}><h3>{this.props.person.name}</h3></li>
        );
    }
}

export default Person;