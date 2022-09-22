import React from "react";
import { Link } from "react-router-dom";
import "./Card.css"
const Card = (props)=>{
    return(
        <div>
            <div className="service-inner-card-container">
          <div className="service-time-card-container">
            <span>Mon,Oct 3 . 12:30 AM IST</span>
          </div>
          <div className="service-name-card-container">
            <span>{props.name}</span>
          </div>
          <div className="service-desc-card-container">
            <span>{props.details}</span>
          </div>
          <div className="service-price-card-container">
            <span>
              Price:<strong style={{ color: "#28231e" }}>&#8377;{props.price} </strong>
            </span>
          </div>
          <div className="service-location-card-container">
            <span>
              Location:
              <Link to={props.location} className="link-style">
                Location
              </Link>
            </span>
          </div>
        </div>
        </div>
    )
}

export default Card