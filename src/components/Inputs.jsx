import React from "react";

function Inputs(props) {
  return (
    <div className="form-input-container">
      <label>{props?.label}</label>
      <input {...props} />
    </div>
  );
}

export default Inputs;
