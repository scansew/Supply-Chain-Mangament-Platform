import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { listWorkflowStages, listStageUpdates } from "../../graphql/queries";

const WorkflowTracking = ({ workOrderId }) => {
  const [workflowData, setWorkflowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const client = generateClient();
  useEffect(() => {
    const fetchWorkflowTracking = async () => {
      try {
        // Get all workflow stages using the generated client
        const stages = await client.graphql({
          query: listWorkflowStages,
          variables: {
            filter: {
              workOrderId: { eq: workOrderId },
            },
            sort: {
              field: "stage",
              direction: "ASC",
            },
          },
        });

        // Get updates for each stage
        // const stagesWithUpdates = await Promise.all(
        //   stages.data.listWorkflowStages.items.map(async (stage) => {
        //     const updates = await client.graphql({
        //       query: listStageUpdates,
        //       variables: {
        //         filter: {
        //           workflowStageId: { eq: stage.id },
        //         },
        //         sort: {
        //           field: "timestamp",
        //           direction: "DESC",
        //         },
        //       },
        //     });

        //     return {
        //       ...stage,
        //       updates: updates.data.listStageUpdates.items,
        //     };
        //   })
        // );

        setWorkflowData(stages.data.listWorkflowStages.items[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching workflow tracking:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchWorkflowTracking();
  }, [workOrderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>{workflowData.stage}</div>;
};

export default WorkflowTracking;
