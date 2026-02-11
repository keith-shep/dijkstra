import React, { useState } from "react";
import axios from "axios";
import LocationInput from "./LocationInput";
import RouteInput from "./RouteInput";

const Form = ({ setPath, setDistance }) => {
  const [route, setRoute] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const content = { route: route, origin: origin, destination: destination };
    axios.post("http://localhost:8080/api/", content).then(response => {
      const { distance, path } = response.data;
      setDistance(distance);
      setPath(path);
    }).catch(error => {
      console.error("There was an error processing the request!", error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <RouteInput setRoute={setRoute} />
      <LocationInput setOrigin={setOrigin} setDestination={setDestination} />
      <div className="d-flex flex-row-reverse mt-2">
        <input type="submit" className="btn btn-primary" value="Generate" />
      </div>
    </form>
  );
};

export default Form;
