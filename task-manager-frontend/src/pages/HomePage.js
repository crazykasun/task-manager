import React, { useState, useEffect } from "react";
import { getTasks, deleteTask } from "../services/api";
import TaskList from "../components/TaskList";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState("All");
  const [loading, setLoading] = useState(true); // Loading state

  const { userRole } = useUserContext();

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [searchQuery, selectedKeyword, tasks]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasks();
      setTasks(response.data);

      const allKeywords = response.data
        .flatMap((task) => task.category.split(/\s+/))
        .map((word) => word.toLowerCase())
        .filter((word, index, array) => array.indexOf(word) === index);
      setKeywords(["All", ...allKeywords]);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = tasks;

    if (selectedKeyword !== "All") {
      filtered = filtered.filter((task) =>
        task.category.toLowerCase().includes(selectedKeyword)
      );
    }

    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(lowerCaseQuery) ||
          task.description.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setFilteredTasks(filtered);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="display-4">Task Manager</h1>
          <span
            className={`badge ${
              userRole === "Admin" ? "bg-primary" : "bg-secondary"
            } fs-5`}
          >
            <i className="bi bi-person-circle"></i> {userRole}
          </span>
        </div>
        {userRole === "Admin" && (
          <Link to="/tasks/new" className="btn btn-primary">
            <i className="bi bi-plus-lg"></i> Create Task
          </Link>
        )}
      </div>

      {/* Search and Keyword Filters */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedKeyword}
            onChange={(e) => setSelectedKeyword(e.target.value)}
          >
            {keywords.map((keyword) => (
              <option key={keyword} value={keyword}>
                {keyword}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredTasks.length > 0 ? (
            <TaskList
              tasks={filteredTasks}
              onDelete={handleDelete}
              userRole={userRole}
            />
          ) : (
            <p className="text-muted">No tasks match your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
