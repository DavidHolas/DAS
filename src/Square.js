import React from "react";

import "./Board.css";

const Square = (props) => {
    return(
    <div onClick={props.operModal} className="Board_square">
        <div>
            {props.name}
            {props.isPlayer ? <p><b>Player 1</b></p> : null}
        </div>
    </div>
    )}

export default Square;