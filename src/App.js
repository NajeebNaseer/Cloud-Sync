import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appointment from "./pages/Appointment";
import NotFound from "./404";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/90days" element={<Appointment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
