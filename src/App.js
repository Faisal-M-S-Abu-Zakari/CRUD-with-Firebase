import { Route, Routes } from "react-router-dom";
import Write from "./components/Write";
import Read from "./components/Read";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Write />} />
        <Route path="/write" element={<Write />} />
        <Route path="/read" element={<Read />} />
      </Routes>
    </div>
  );
}

export default App;
