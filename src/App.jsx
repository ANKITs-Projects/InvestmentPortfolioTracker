import "./App.css";
import { useAuth } from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import { Dashboard } from "./pages/Dashboard/Dashboard"
import PopUpformater from "./components/PopUpformater";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        
          <Route path="/login" element={<PopUpformater><Login /></PopUpformater>} />
          <Route path="/signup" element={<PopUpformater><Signup /></PopUpformater>} />
          <Route path="/dashboard" element={<Dashboard/>} />

      </Routes>
    </>
  );
}

export default App;
