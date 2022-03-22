import React from "react";

const LocationInput = ({ setOrigin, setDestination }) => {
  const handleOrigin = e => {
    setOrigin(e.target.value);
  };

  const handleDestination = e => {
    setDestination(e.target.value);
  };

  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text" id="">
          Origin and Destination
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="e.g. A"
        name="origin"
        onChange={handleOrigin}
      />
      <input
        type="text"
        className="form-control"
        placeholder="e.g. B"
        name="destination"
        onChange={handleDestination}
      />
    </div>
  );
};

export default LocationInput;
