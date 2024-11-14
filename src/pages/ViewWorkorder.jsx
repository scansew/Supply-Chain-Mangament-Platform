import React, { useState, useEffect } from "react";
import {
  Card,
  Heading,
  Grid,
  Flex,
  Text,
  Icon,
  Divider,
  Button,
  View,
} from "@aws-amplify/ui-react";
import {
  MdAssignment,
  MdBusiness,
  MdPerson,
  MdPhone,
  MdLocationOn,
  MdBuild,
  MdSettings,
  MdAttachFile,
  MdRefresh,
  MdInsertDriveFile,
  MdDownload,
  MdDelete,
  MdExpandMore,
  MdExpandLess,
  MdCloudDownload,
  MdDeleteSweep,
} from "react-icons/md";
import {} from "react-icons/md";
import CreateWorkOrderForm from "./CreateWorkOrderForm";
import { getWorkOrder } from "../graphql/queries";
import { list, remove, getUrl } from "aws-amplify/storage";
import styles from "./WOForm.module.css";
import { generateClient } from "aws-amplify/api";
import WorkflowTracking from "./OrderUpdate/WorkflowStageTracking";
import WorkflowStageUpdator from "./OrderUpdate/WorkflowStageUpdator";

const ViewEditWorkOrder = ({ workOrderItem, SSuser }) => {
  const [showFiles, setShowFiles] = useState(true);
  const [files, setFiles] = useState([]);
  const [displayedFiles, setDisplayedFiles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editedWorkOrder, setEditedWorkOrder] = useState(workOrderItem);
  const client = generateClient();

  if (!workOrderItem) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    if (workOrderItem && workOrderItem.id) {
      // setEditedWorkOrder(workOrderItem);
      fetchS3Files();
      console.log("Work order item Called:", workOrderItem);
    }
  }, [workOrderItem]);

  const fetchWorkOrder = async (id) => {
    try {
      const workOrderData = await client.graphql({
        query: getWorkOrder,
        variables: { id: id },
      });
      setEditedWorkOrder(workOrderData.data.getWorkOrder);
    } catch (error) {
      console.error("Error fetching work order:", error);
    }
  };

  const fetchS3Files = async () => {
    setFiles("");
    setIsLoading(true);
    setError(null);
    try {
      const key = editedWorkOrder.filesFolder;
      console.log("Key is", key);
      const fetchedFiles = await list({
        path: key,
        options: {
          accessLevel: "public",
          listAll: true,
        },
      });
      setFiles(fetchedFiles.items);
      // setFormState((prevState) => ({ ...prevState, files }));
      setDisplayedFiles(fetchedFiles.items);
      console.log("Updating table", fetchedFiles.items);
    } catch (error) {
      console.error("Error fetching files:", error);
      setError("Failed to fetch files. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  async function handleDelete(key) {
    try {
      await remove({
        path: key,
      });
      fetchS3Files();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }

  async function handleDownload(key) {
    try {
      const getUrlResult = await getUrl({
        path: key,
        options: {
          validateObjectExistence: true,
          expiresIn: 3600, // URL will be valid for 1 hour
        },
      });
      // Fetch the image as a blob
      const response = await fetch(getUrlResult.url);
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = key.split("/").pop(); // Set the download filename to the last part of the key
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      console.log("Download URL:", getUrlResult.url);
      console.log("URL expires at:", getUrlResult.expiresAt);
    } catch (error) {
      console.error("Error generating download URL:", error);
    }
  }

  const InfoItem = ({ icon, label, value }) => (
    <Flex alignItems="center" gap="small">
      <Icon as={icon} color="blue.60" />
      <Text>
        <strong>{label}:</strong> {value}
      </Text>
    </Flex>
  );

  const Section = ({ title, children }) => (
    <Card variation="outlined" padding="medium">
      <Heading level={3} marginBottom="medium">
        {title}
      </Heading>
      <Grid templateColumns="1fr 1fr" gap="medium">
        {children}
      </Grid>
    </Card>
  );

  const toggleFileList = () => {
    setShowFiles(!showFiles);
  };
  const getFileName = (fullPath) => {
    return fullPath.split("/").pop();
  };
  const handleViewSuccess = async () => {
    if (workOrderItem && workOrderItem.id) {
      await fetchWorkOrder(workOrderItem.id);
      await fetchS3Files(workOrderItem.id);
    }
  };
  return (
    <Flex>
      <Card variation="elevated" padding="large" width="40%">
        {/* <WorkflowTracking workOrderId={workOrderItem.id} /> */}
        Current stage : {editedWorkOrder.currentStage}
        <WorkflowStageUpdator
          SSuser={{ SSuser }}
          workOrderId={workOrderItem.id}
        />
      </Card>
      <Card variation="elevated" padding="large" width="60%">
        <Section title="Work Order Information">
          <InfoItem
            icon={MdAssignment}
            label="Work Order Number"
            value={editedWorkOrder.woNumber}
          />
          <InfoItem
            icon={MdSettings}
            label="Process"
            value={editedWorkOrder.process}
          />
          <InfoItem
            icon={MdAssignment}
            label="Status"
            value={editedWorkOrder.status}
          />
          <InfoItem
            icon={MdAssignment}
            label="Type"
            value={editedWorkOrder.type}
          />
          <InfoItem
            icon={MdAssignment}
            label="Details"
            value={editedWorkOrder.details}
          />
        </Section>

        <Divider marginy="medium" />

        <Section title="Vehicle Information">
          <InfoItem icon={MdBuild} label="Make" value={editedWorkOrder.make} />
          <InfoItem
            icon={MdBuild}
            label="Model"
            value={editedWorkOrder.model}
          />
          <InfoItem icon={MdBuild} label="Year" value={editedWorkOrder.year} />
        </Section>

        <Divider marginy="medium" />

        <Section title="Business Information">
          <InfoItem
            icon={MdBusiness}
            label="Business Name"
            value={editedWorkOrder.businessName}
          />
          <InfoItem
            icon={MdPerson}
            label="Attention Name"
            value={editedWorkOrder.attnName}
          />
          <InfoItem
            icon={MdPhone}
            label="Business Phone"
            value={editedWorkOrder.businessPhone}
          />
          <InfoItem
            icon={MdLocationOn}
            label="Business Shipping Address"
            value={editedWorkOrder.businessShippingAddress}
          />
        </Section>

        <Divider marginy="medium" />

        <Section title="Customer Information">
          <InfoItem
            icon={MdPerson}
            label="Customer Name"
            value={editedWorkOrder.customerName}
          />
          <InfoItem
            icon={MdLocationOn}
            label="Customer Drop Shipping Address"
            value={editedWorkOrder.customerDropShippingAddress}
          />
        </Section>

        <Divider marginy="medium" />

        <Section title="CNC Information">
          <InfoItem
            icon={MdBusiness}
            label="CNC Company"
            value={editedWorkOrder.CNCId}
          />
        </Section>
      </Card>

      <Card variation="elevated" style={{ margintop: "20px" }}>
        <Flex margintop="large">
          <CreateWorkOrderForm
            SSuser={SSuser}
            workOrderItem={editedWorkOrder}
            button="edit"
            handleViewSuccess={async () => {
              console.log("handleViewSuccess");
              await handleViewSuccess();
            }}
          />
        </Flex>
        <div className={styles.header}>
          <label>Uploaded Files</label>
          <div className={styles.headerActions}>
            <Button variation="primary" onClick={fetchS3Files} size="small">
              <MdRefresh className={styles.actionIcon} />
              Refresh
            </Button>
            <Button
              variation="primary"
              size="small"
              disabled={displayedFiles.length === 0}
            >
              <MdCloudDownload className={styles.actionIcon} />
              Download
            </Button>
            <Button
              variation="warning"
              size="small"
              disabled={displayedFiles.length === 0}
            >
              <MdDeleteSweep className={styles.actionIcon} />
              Delete
            </Button>
            <Button variation="info" onClick={toggleFileList} size="small">
              {showFiles ? <MdExpandLess /> : <MdExpandMore />}
              {showFiles ? "Hide" : "Show"}
            </Button>
          </div>
        </div>
        <p className={styles.totalFiles}>
          {displayedFiles.length} file(s) attached to work order
        </p>
        {showFiles && displayedFiles.length > 0 && (
          <div>
            <ul className={styles.fileList}>
              {displayedFiles.map((file, index) => (
                <li key={index} className={styles.fileItem}>
                  <MdInsertDriveFile className={styles.fileIcon} />
                  <span className={styles.fileName}>
                    {getFileName(file.path)}
                  </span>
                  <div className={styles.fileActions}>
                    <Button
                      className={styles.actionButton}
                      onClick={() => handleDownload(file.path)}
                      title="Download"
                    >
                      <MdDownload />
                    </Button>
                    <Button
                      className={styles.actionButton}
                      onClick={() => handleDelete(file.path)}
                      title="Delete"
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {showFiles && displayedFiles.length === 0 && (
          <div className={styles.noFiles}>No files uploaded yet</div>
        )}
      </Card>
    </Flex>
  );
};

export default ViewEditWorkOrder;
