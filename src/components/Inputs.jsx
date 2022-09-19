import React from "react";
function Inputs(props) {
  return (
    <div className="form-input-container">
      <label>
        {props?.label}
        <span className="form-required">*</span>
      </label>
      <input {...props} className="form-input" />
      {props.istouched && <p className="input-error">{props.error}</p>}
    </div>
  );
}

export default Inputs;
