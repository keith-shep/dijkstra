import React from "react";

const RouteInput = ({ setRoute }) => {
  const handleChange = e => {
    setRoute(e.target.value);
  };

  return (
    <div className="routes mb-2">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="">
            Routes and Distances
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="AB5, EC2, DA7, etc"
          name="routes"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default RouteInput;
