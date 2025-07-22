import { Route, Routes } from "react-router-dom";
import Write from "./components/Write";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Write />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </div>
  );
}

export default App;
