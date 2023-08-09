import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AppShell, Navbar, Header } from "@mantine/core";

import EditStudyPlanner from "./part/edit-planner";
// import Calender from "./part/calender";
import AddStudyPlanner from "./part/add-planner";
import ManagePlanner from "./part/manage-planner";
import Dashboard from "./part/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/edit-planner/:id" element={<EditStudyPlanner />} />
        <Route path="/add-planner" element={<AddStudyPlanner />} />
        {/* <Route path="/calender" element={<Calender />} /> */}
        <Route path="/manage-planner" element={<ManagePlanner />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
