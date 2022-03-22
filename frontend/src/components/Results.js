import axios from "axios";
import React, { useState } from "react";

const Results = ({ path, distance }) => {
  const [number, setNumber] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const obj = { path, distance, number };
    console.log(obj);
    axios.post("http://localhost:3001/twilio", obj).then(response => {
      console.log(response.data);
    });
  };

  const handleChange = e => {
    let number = e.target.value;
    number = number.replace(/\s/g, "");
    setNumber(number);
  };
  return (
    <div>
      <h4 className="text-muted">Shortest Path</h4>
      <p>
        Path route: <span className="text-primary">{path}</span>
      </p>
      <p>
        Distance: <span className="text-primary">{distance}</span>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="input-group mt-5">
          <div className="input-group-prepend">
            <span className="input-group-text" id="">
              Optional: Send results to phone
            </span>
          </div>
        </div>
        <div className="d-flex mt-2">
          <input
            type="text"
            className="form-control"
            placeholder="e.g. +65 9876 5432"
            name="number"
            onChange={handleChange}
          />
          <input
            type="submit"
            className="btn btn-outline-primary"
            value="Send SMS"
          />
        </div>
      </form>
    </div>
  );
};

export default Results;
