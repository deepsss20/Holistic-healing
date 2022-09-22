import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard, Login, SignIn } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Login />} />

        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/login" exact element={<SignIn/>}/>
      </Routes>
    </div>
  );
}

export default App;
