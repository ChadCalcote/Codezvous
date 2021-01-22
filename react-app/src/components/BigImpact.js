import React from "react";
import "./BigImpact.css"
const BigImpact = (props) => {
    return <h1 id="big-impact" style={{ color: props.color}}>{props.text}</h1>;
}

export default BigImpact;