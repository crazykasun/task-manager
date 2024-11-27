import React, { useState, useEffect } from "react";

const TaskForm = ({ initialData, onSubmit, userRole }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    isCompleted: false,
    role: userRole || "User",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialData) setTask({ ...initialData, role: userRole || "User" });
  }, [initialData, userRole]);

  const validate = () => {
    const errors = {};
    if (!task.title.trim()) {
      errors.title = "Title is required.";
    } else if (task.title.length < 3) {
      errors.title = "Title must be at least 3 characters long.";
    }

    if (!task.description.trim()) {
      errors.description = "Description is required.";
    } else if (task.description.length < 10) {
      errors.description = "Description must be at least 10 characters long.";
    }

    if (!task.category.trim()) {
      errors.category = "Category is required.";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(task);
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 shadow rounded"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <h3 className="text-center text-primary mb-4">
        {initialData ? "Edit Task" : "Create New Task"}
      </h3>
      <div className="mb-3">
        <label className="form-label text-secondary">Title</label>
        <input
          type="text"
          name="title"
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
          value={task.title}
          onChange={handleChange}
        />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label text-secondary">Description</label>
        <textarea
          name="description"
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
          value={task.description}
          onChange={handleChange}
          rows="4"
        />
        {errors.description && (
          <div className="invalid-feedback">{errors.description}</div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label text-secondary">Category</label>
        <input
          type="text"
          name="category"
          className={`form-control ${errors.category ? "is-invalid" : ""}`}
          value={task.category}
          onChange={handleChange}
        />
        {errors.category && (
          <div className="invalid-feedback">{errors.category}</div>
        )}
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          name="isCompleted"
          className="form-check-input"
          checked={task.isCompleted}
          onChange={handleChange}
        />
        <label className="form-check-label text-secondary">
          Mark as Completed
        </label>
      </div>
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary btn-block"
          style={{ fontWeight: "bold" }}
        >
          {initialData ? "Update Task" : "Create Task"}
        </button>
      </div>
      {submitted && (
        <div
          className="alert alert-success mt-3 text-center"
          role="alert"
          style={{ fontWeight: "bold" }}
        >
          Task {initialData ? "updated" : "created"} successfully!
        </div>
      )}
    </form>
  );
};

export default TaskForm;
