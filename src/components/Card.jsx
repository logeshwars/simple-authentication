import React from "react";

const Card = ({ d, refer }) => {
  return (
    <div className="card" ref={refer}>
      <h1>{d.userName}</h1>
      <p>
        <span>ID</span>:{d.id}
      </p>
      <p>
        <span>EMAIL</span>
        {d.email}
      </p>
      <p>
        <span>DATE OF BIRTH</span>
        {d.dob}
      </p>
    </div>
  );
};

export default Card;
