import React, { useEffect, useState } from "react";
import { getTaskById } from "../services/api";
import { useParams, useNavigate, Link } from "react-router-dom";

const TaskDetailsPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await getTaskById(id);
      setTask(response.data);
    };
    fetchTask();
  }, [id]);

  if (!task)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="card shadow-lg rounded-lg">
        <div
          className="card-header text-white"
          style={{
            background: "linear-gradient(90deg, #4a90e2, #007bff)",
          }}
        >
          <h2 className="mb-0 text-center">{task.title}</h2>
        </div>
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <h5 className="card-title text-muted bi bi-info-circle-fill"> Task Details</h5>
            <div className="mb-4">
            {task.isCompleted ? (
              <span className="badge bg-success fs-6">
                <i className="bi bi-check-circle-fill"></i> Completed
              </span>
            ) : (
              <span className="badge bg-warning text-dark fs-6">
                <i className="bi bi-clock-fill"></i> Pending
              </span>
            )}
          </div>
          </div>

          <div className="mb-3">
            <strong>Description:</strong>
            <p className="text-muted border rounded p-3">{task.description}</p>
          </div>

          <div className="mb-3">
            <strong>Category:</strong>{" "}
            <span className="badge bg-info text-dark fs-6">{task.category}</span>
          </div>

    
          <div className="text-center">
            <Link to={`/tasks/${id}/edit`} className="btn btn-outline-primary">
              <i className="bi bi-pencil"></i> Edit Task
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <Link to="/" className="btn btn-link text-decoration-none text-primary fs-5">
          <i className="bi bi-arrow-left-circle"></i> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
