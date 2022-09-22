import React from "react";
import "./PrimaryButton.css"
const PrimaryButton =  (props)=>{
    const disabledClass = props.disabled && 'disabled'
    return(
        <div>
        <button
        disabled={props.disabled}
        onClick={props.onSubmitHandler}
        className={`submit-button-handler ${disabledClass}`}>
        {props.name}
      </button>
        </div>
    )
}

export default PrimaryButton