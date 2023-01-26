import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LogIn from "./components/Login/Login";
import Movements from "./components/Movements/Movements";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn/>} />
          <Route path="/movements" element={<Movements />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
