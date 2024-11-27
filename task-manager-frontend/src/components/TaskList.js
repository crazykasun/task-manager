import React from "react";
import { Link } from "react-router-dom";

const TaskList = ({ tasks, onDelete, userRole }) => {
  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <Link
              to={`/tasks/${task.id}`}
              className="text-decoration-none fw-bold"
            >
              {task.title}
            </Link>
            <p className="text-muted mb-0">{task.category}</p>
          </div>
          {userRole === "Admin" && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(task.id)}
            >
              <i className="bi bi-trash"></i> Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
