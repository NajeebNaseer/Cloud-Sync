import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appointment from "./Appointment.jsx"; // Ensure this is the correct path
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <div className="flex   flex-col min-h-screen">
        {/* <Header userName="Mian Razzaq" userImage="" /> */}

        <Routes>
          {/* <Route path="/" element={<Appointment />} /> */}
          <Route
            path="/90days/:first_name/:last_name/:dob"
            element={<Appointment />}
          />
          {/* Define other routes as needed */}
        </Routes>

        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
