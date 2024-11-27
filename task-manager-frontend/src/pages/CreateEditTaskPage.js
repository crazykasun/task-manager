import React from "react";
import { createTask, updateTask, getTaskById } from "../services/api";
import TaskForm from "../components/TaskForm";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const CreateEditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = React.useState(null);
  const { userRole } = useUserContext();

  React.useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const response = await getTaskById(id);
        setInitialData(response.data);
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (task) => {
    try {
      if (id) {
        await updateTask(id, task);
      } else {
        await createTask(task);
      }
      navigate("/");
    } catch (error) {
      console.error(
        "Error saving task:",
        error.response?.data || error.message
      );
      alert("Failed to save task. Please check the input fields.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">{id ? "Edit Task" : "Create Task"}</h2>
        </div>
        <div className="card-body">
          <p className="text-muted">
            {id
              ? "Update the details of your task below."
              : "Fill in the details to create a new task."}
          </p>
          <TaskForm
            initialData={initialData}
            onSubmit={handleSubmit}
            userRole={userRole}
          />
        </div>
      </div>
      <button className="btn btn-link mt-4" onClick={() => navigate("/")}>
        <i className="bi bi-arrow-left"></i> Back to Home
      </button>
    </div>
  );
};

export default CreateEditTaskPage;
