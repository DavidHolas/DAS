import React from "react";

import "./Board.css";

const Square = (props) => {
    return(
    <div className="Board_square">
        <div>
            {props.name}
            {props.isPlayer ? <p>Player 1</p> : null}
        </div>
    </div>
    )}

export default Square;