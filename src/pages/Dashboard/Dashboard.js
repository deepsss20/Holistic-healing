import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import "./Dashboard.css";
import { useServiceDetailsApiQuery } from "../../services/services.services";
const Dashboard = () => {
  const { data } = useServiceDetailsApiQuery();

  const { user } = useSelector((state) => state.userSlice);
  console.log(user);
  return (
    <div className="div-container">
      <div className="event-header-div-contaier">
        <div className="event-header-text">
          <span>Events</span>
        </div>
        <div className="event-desc-text">
          <span>To A Healthy Lifestyle!</span>
        </div>
      </div>
      <div className="dashboard-card-container">
        {data.map((ele) => {
          return (
            <div id={ele._id}>
              <Card
                name={ele.name}
                details={ele.details}
                price={ele.price}
                location={ele.appointment.locationLink}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
