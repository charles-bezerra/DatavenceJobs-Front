import React, { useState } from "react";
import "./input.css";

const outlineAction = {
    correct: "outlineGreen",
    incorrect: "outlineRed"
}

export function Submit (props) {
    return (
        <div className="mySubmit">
            <input type="submit" {...props}/>
        </div>
    );
} 

export default function Input ({ isCorrect: iscorrect, ...props}) {
    return (
        <div className={`contentInput ${ (iscorrect) ? outlineAction.correct : outlineAction.incorrect }`}>
            <div className="labelInput">
                { props.label }
            </div>

            <input {...props}/>
        </div>
    );
}