import React from "react";
import { FaUserCircle } from "react-icons/fa";
const Card = ({ d, refer }) => {
  const formatDate = (date) => {
    date = new Date(date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-In", options);
  };
  // expected output (varies according to local timezone): Donnerstag, 20. Dezember 2012

  return (
    <div className="card" ref={refer}>
      <h1 className="card-title">
        <FaUserCircle className="text-blue-400 text-xl" />
        {d.userName}
      </h1>
      <p>
        <span className="card-label">ID</span>:{d.id}
      </p>
      <p>
        <span className="card-label">EMAIL</span>
        <span className="card-email">{d.email}</span>
      </p>
      <p>
        <span className="card-label">DATE OF BIRTH</span>
        {formatDate(d.dob)}
      </p>
    </div>
  );
};

export default Card;
