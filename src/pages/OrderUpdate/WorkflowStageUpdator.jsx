import React, { useState } from "react";
import { updateWorkflowStage, updateWorkOrder } from "../../graphql/mutations";
import { generateClient } from "aws-amplify/api";
import {
  listStageUpdates,
  listWorkflowStages,
  getWorkOrder,
} from "../../graphql/queries";
import { Button } from "@aws-amplify/ui-react";
import FileDownloader from "./FileDownloader";
const StageStatusUpdater = ({
  SSuser,
  workOrderId,
  currentRole,
  filesFolder,
}) => {
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

  return (
    <div className="stage-status-updater">
      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">
          Stage status updated successfully!
        </div>
      )}
      <Button
        type="submit"
        variation="primary"
        disabled={loading}
        onClick={moveToNextStage}
      >
        {loading ? "Updating..." : "Complete Work Order"}
      </Button>
      <div>
        <FileDownloader filesFolder={filesFolder} />
      </div>

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
