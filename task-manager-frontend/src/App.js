import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import CreateEditTaskPage from "./pages/CreateEditTaskPage";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks/new" element={<CreateEditTaskPage />} />
          <Route path="/tasks/:id" element={<TaskDetailsPage />} />
          <Route path="/tasks/:id/edit" element={<CreateEditTaskPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
