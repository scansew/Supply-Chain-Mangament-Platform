import React, { useState } from "react";
import { generateClient } from "aws-amplify/api";
import { createWorkflowStage, updateWorkOrder } from "./graphql/mutations";

const WorkflowStageCreator = () => {
  const [formData, setFormData] = useState({
    workOrderId: "",
    stage: "",
    companyId: "",
    assignedToId: "",
    estimatedCompletionDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitWorkflowStage = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Using the generated client instead of API.graphql
      const workflowStage = await client.graphql({
        query: createWorkflowStage,
        variables: {
          input: {
            workOrderId: formData.workOrderId,
            stage: formData.stage,
            companyId: formData.companyId,
            status: "QUEUED",
            assignedToId: formData.assignedToId,
            estimatedCompletionDate: formData.estimatedCompletionDate,
            notes: formData.notes,
          },
        },
      });

      // Update work order if it's scanning stage
      if (formData.stage === "SCANNING") {
        await client.graphql({
          query: updateWorkOrder,
          variables: {
            input: {
              id: formData.workOrderId,
              currentStage: "SCANNING",
              currentStageId: workflowStage.data.createWorkflowStage.id,
            },
          },
        });
      }

      setSuccess(true);
      // Optionally reset the form
      setFormData({
        workOrderId: "",
        stage: "",
        companyId: "",
        assignedToId: "",
        estimatedCompletionDate: "",
        notes: "",
      });

      return workflowStage.data.createWorkflowStage;
    } catch (error) {
      console.error("Error creating workflow stage:", error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitWorkflowStage();
  };

  return (
    <div className="workflow-stage-creator">
      <h2>Create Workflow Stage</h2>

      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">
          Workflow stage created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="workOrderId">Work Order ID:</label>
          <input
            type="text"
            id="workOrderId"
            name="workOrderId"
            value={formData.workOrderId}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stage">Stage:</label>
          <select
            id="stage"
            name="stage"
            value={formData.stage}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Stage</option>
            <option value="SCANNING">Scanning</option>
            {/* Add other stage options as needed */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="companyId">Company ID:</label>
          <input
            type="text"
            id="companyId"
            name="companyId"
            value={formData.companyId}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="assignedToId">Assigned To ID:</label>
          <input
            type="text"
            id="assignedToId"
            name="assignedToId"
            value={formData.assignedToId}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="estimatedCompletionDate">
            Estimated Completion Date:
          </label>
          <input
            type="date"
            id="estimatedCompletionDate"
            name="estimatedCompletionDate"
            value={formData.estimatedCompletionDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Workflow Stage"}
        </button>
      </form>
    </div>
  );
};

// Optional: Add some basic styles
const styles = `
  .workflow-stage-creator {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input, select, textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #cccccc;
  }

  .error-message {
    color: red;
    margin-bottom: 10px;
  }

  .success-message {
    color: green;
    margin-bottom: 10px;
  }
`;

export default WorkflowStageCreator;
