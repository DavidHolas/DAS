import React from "react";

import "./Modal.css";

const Modal = (props) => {

    return(
    <div className={props.visible ? "modal_visible" : "modal_hidden"}>
        <div className="modal-content">
            <p>{props.text}</p>
            <button onClick={props.close} >Zavřít</button>
        </div>
    </div>
    )}

export default Modal;