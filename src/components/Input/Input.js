import React, { useState } from "react";
import "./Input.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEyeSlash, faEye} from "@fortawesome/free-solid-svg-icons"

const Input = (props) => {
  const[show, setShow] = useState(false)

  const showPasswordHandler = ()=>{
    setShow(true)
    setTimeout(()=>{
      setShow(false)
    }, 2000)
  }

  return (
    <div className="input-wrappper">
      <div>
        <label>{props.name}</label>
      </div>
      <div className="text-field-div">
       <input className="input-div"
          type={!show && props.type}
          value={props.value}
          onChange={(e)=>props.onChange(e, props.id)}
          placeholder={props.placeholder}
          onBlur={props.onBlur}
          disabled={props.disabled}
        />
        {props.type==="password" && !show?<i onClick={showPasswordHandler}>
          <FontAwesomeIcon icon={faEyeSlash}/></i>:props.type==="password"&&<i><FontAwesomeIcon icon={faEye}/></i>}
      </div>
      <div>
        <span className="error-message">{props.errorMessage}</span>
      </div>
    </div>
  );
};

export default Input;
