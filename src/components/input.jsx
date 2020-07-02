import React from "react";
import "./input.css";

const outlineAction = {
    correct: "outlineGreen",
    incorrect: "outlineRed"
}


export function Submit (props) {
    return (
        <div className="mySubmit shadow-sm" style={{ borderRadius: "24px" }}>
            <input type="submit" {...props}/>
        </div>
    );
} 


export function Textarea (props) {
    return (
        <div className={`shadow-sm rounded-lg contentInput ${ (true) ? outlineAction.correct : outlineAction.incorrect }`}>
            <div className="labelInput">
                { props.label }
            </div>

            <textarea {...props}/>
        </div>
    );
}

export function Select ({children: Children, ...props}) {
    return (
        <div className={`shadow-sm rounded-lg contentInput ${ (true) ? outlineAction.correct : outlineAction.incorrect }`}>
            <div className="labelInput">
                { props.label }
            </div>

            <select {...props}>
                { Children }
            </select>
        </div>
    );
}



export function Input (props) {
    return (
        <div className={`shadow-sm rounded-lg contentInput ${ (true) ? outlineAction.correct : outlineAction.incorrect }`}>
            <div className="labelInput">
                { props.label }
            </div>

            <input {...props}/>
        </div>
    );
}