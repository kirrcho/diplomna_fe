import * as React from "react";
import "./modal.css";

const Modal = (props) => {
    return <div id="myModal" onClick={(e) => {
        if (e.target.id === 'myModal') {
            props.setShow(false);
        }
    }} className={`modal ${props.show && 'show'}`}>
        <div className="modal-content">
        <span className="close" onClick={() => props.setShow(false)}>&times;</span>
        {props.children}
        </div>
    </div>
}

export default Modal;