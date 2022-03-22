import { useState } from "react";
import Form from "./components/Form";
import Results from "./components/Results";

function App() {
  const [path, setPath] = useState("");
  const [distance, setDistance] = useState(0);

  return (
    <div className="App">
      <div className="background vw-100 vh-100 d-flex align-items-center justify-content-center bg-secondary">
        <div className="container w-50 ">
          <div className="card p-4 shadow-sm">
            <h4 className="text-muted">Logistics Calculator</h4>
            <Form setPath={setPath} setDistance={setDistance} />
          </div>
          <div className="card p-4 mt-2 shadow-sm">
            <Results path={path} distance={distance} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
