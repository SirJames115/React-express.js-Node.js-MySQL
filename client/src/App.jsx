import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Read from "./pages/Read";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/read/:id" element={<Read />} />
    </Routes>
  );
}

export default App;
