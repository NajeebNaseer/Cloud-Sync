import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appointment from "./Appointment.jsx"; // Ensure this is the correct path
import Header from "./Header";
import Footer from "./Footer";
import NotFound from "./404"; // Include the NotFound component

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* <Header userName="Mian Razzaq" userImage="" /> */}

        <Routes>
          {/* <Route path="/" element={<Appointment />} /> */}
          <Route
            path="/90days/:first_name/:last_name/:dob"
            element={<Appointment />}
          />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
