import React, { useState } from "react";
import { updateWorkflowStage, updateWorkOrder } from "../../graphql/mutations";
import { generateClient } from "aws-amplify/api";
import {
  listStageUpdates,
  listWorkflowStages,
  getWorkOrder,
} from "../../graphql/queries";

const StageStatusUpdater = ({ SSuser, workOrderId }) => {
  const [formData, setFormData] = useState({
    stageId: "",
    status: "",
    notes: "",
    qualityCheck: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const client = generateClient();

  const stageSequence = [
    "SCANNING",
    "DESIGN",
    "CNC_CUTTING",
    "MANUFACTURING",
    "WAREHOUSE",
    "CUSTOMER_DELIVERY",
  ];

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  const moveToNextStage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Get current work order
      const workOrder = await client.graphql({
        query: getWorkOrder,
        variables: {
          id: workOrderId,
        },
      });
      const currentStage = workOrder.data.getWorkOrder.currentStage;
      const currentIndex = stageSequence.indexOf(currentStage);

      if (currentIndex < stageSequence.length - 1) {
        const nextStage = stageSequence[currentIndex + 1];

        // Get next stage information
        const stages = await client.graphql({
          query: listWorkflowStages,
          variables: {
            filter: {
              workOrderId: { eq: workOrderId },
              stage: { eq: nextStage },
            },
          },
        });

        // const nextStageId = stages.data.listWorkflowStages.items[0].id;

        await client.graphql({
          query: updateWorkOrder,
          variables: {
            input: {
              id: workOrderId,
              currentStage: nextStage,
              // currentStageId: nextStageId,
            },
          },
        });
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error moving to next stage:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // const updateStageStatus = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);
  //   setSuccess(false);

  //   try {
  //     // Update the workflow stage
  //     const stageUpdate = await client.graphql({
  //       query: updateWorkflowStage,
  //       variables: {
  //         input: {
  //           id: formData.stageId,
  //           status: formData.status,
  //           ...(formData.status === "COMPLETED" ,
  //           }),
  //           ...(formData.status === "IN_PROGRESS" && {
  //             startDate: new Date().toISOString(),
  //           }),
  //           ...(formData.qualityCheck !== undefined && {
  //             qualityCheck: formData.qualityCheck,
  //           }),
  //         },
  //       },
  //     });

  //     // // Create a stage update record
  //     // await client.graphql({
  //     //   query: createStageUpdate,
  //     //   variables: {
  //     //     input: {
  //     //       workflowStageId: formData.stageId,
  //     //       status: formData.status,
  //     //       notes: formData.notes,
  //     //       timestamp: new Date().toISOString(),
  //     //       updatedById: SSuser.id,
  //     //     },
  //     //   },
  //     // });

  //     // If completed, move to next stage
  //     if (formData.status === "COMPLETED") {
  //       await moveToNextStage(stageUpdate.data.updateWorkflowStage.workOrderId);
  //     }

  //     setSuccess(true);
  //     // Reset form
  //     setFormData({
  //       stageId: "",
  //       status: "",
  //       notes: "",
  //       qualityCheck: false,
  //     });
  //   } catch (error) {
  //     console.error("Error updating stage status:", error);
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="stage-status-updater">
      <h2>Update Stage Status</h2>

      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">
          Stage status updated successfully!
        </div>
      )}

      <form onSubmit={moveToNextStage}>
        {/* <div className="form-group">
          <label htmlFor="stageId">Stage ID:</label>
          <input
            type="text"
            id="stageId"
            name="stageId"
            value={formData.stageId}
            onChange={handleInputChange}
            required
          />
        </div> */}

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Status</option>
            <option value="QUEUED">Queued</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="ON_HOLD">On Hold</option>
          </select>
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

        <div className="form-group">
          <label htmlFor="qualityCheck">
            <input
              type="checkbox"
              id="qualityCheck"
              name="qualityCheck"
              checked={formData.qualityCheck}
              onChange={handleInputChange}
            />
            Quality Check Passed
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Stage Status"}
        </button>
      </form>

      <style jsx>{`
        .stage-status-updater {
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

        input[type="text"],
        select,
        textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        input[type="checkbox"] {
          margin-right: 8px;
        }

        textarea {
          height: 100px;
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
      `}</style>
    </div>
  );
};

export default StageStatusUpdater;
