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
import { getWorkOrder, getCompany } from "../graphql/queries";
import { list, remove, getUrl } from "aws-amplify/storage";
import styles from "./WOForm.module.css";
import { generateClient } from "aws-amplify/api";
import WorkflowStageUpdator from "./OrderUpdate/WorkflowStageUpdator";

const ViewEditWorkOrder = ({ workOrderItem, SSuser, currentRole }) => {
  const [showFiles, setShowFiles] = useState(true);
  const [files, setFiles] = useState([]);
  const [displayedFiles, setDisplayedFiles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editedWorkOrder, setEditedWorkOrder] = useState(workOrderItem);
  const client = generateClient();
  const [companyName, setCompanyName] = useState("");

  if (!workOrderItem) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    if (
      workOrderItem &&
      workOrderItem.id &&
      currentRole !== "CNC" &&
      currentRole !== "MANUFACTURE"
    ) {
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

  // Styled components
  const StyledSection = ({ title, children, ...props }) => (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        padding: "1.5rem",
        borderRadius: "8px",
        marginBottom: "1.5rem",
      }}
      {...props}
    >
      <Heading
        level={3}
        style={{
          marginBottom: "1.25rem",
          color: "#2c3e50",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        {title}
      </Heading>
      {children}
    </div>
  );

  const StyledInfoItem = ({ icon, label, value }) => (
    <Flex
      direction="row"
      alignItems="center"
      gap="medium"
      style={{
        padding: "0.75rem",
        borderRadius: "6px",
        transition: "background-color 0.2s ease",
        ":hover": {
          backgroundColor: "rgba(0, 0, 0, 0.02)",
        },
      }}
    >
      <div style={{ color: "#2196f3", fontSize: "1.5rem" }}>{icon}</div>
      <div>
        <Text
          style={{
            fontWeight: "600",
            color: "#495057",
            fontSize: "0.9rem",
            marginBottom: "0.25rem",
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            color: "#212529",
            fontSize: "1.1rem",
          }}
        >
          {value || "N/A"}
        </Text>
      </div>
    </Flex>
  );

  const StyledDivider = () => (
    <Divider
      style={{
        margin: "1.5rem 0",
        height: "2px",
        backgroundColor: "#e9ecef",
      }}
    />
  );

  const fetchCompany = async (companyId) => {
    try {
      const response = await client.graphql({
        query: getCompany,
        variables: {
          id: companyId,
        },
      });

      return response.data.getCompany;
    } catch (error) {
      console.error("Error fetching company:", error);
      throw error;
    }
  };
  useEffect(() => {
    const getCompanyData = async () => {
      if (editedWorkOrder.CNCId) {
        try {
          const companyData = await fetchCompany(editedWorkOrder.CNCId);
          setCompanyName(companyData.name); // or whatever field you want to display
        } catch (error) {
          console.error("Error fetching company:", error);
          setCompanyName("Error loading company");
        }
      }
    };

    getCompanyData();
  }, [editedWorkOrder.CNCId]);
  return (
    <Flex>
      <Card variation="elevated" padding="large" width="40%">
        {/* <WorkflowTracking workOrderId={workOrderItem.id} /> */}
        {currentRole !== "CNC" && currentRole !== "MANUFACTURE" && (
          <CreateWorkOrderForm
            SSuser={SSuser}
            workOrderItem={editedWorkOrder}
            button="edit"
            handleViewSuccess={async () => {
              console.log("handleViewSuccess");
              await handleViewSuccess();
            }}
          />
        )}
        {/* <CreateWorkOrderForm
          SSuser={SSuser}
          workOrderItem={editedWorkOrder}
          button="edit"
          handleViewSuccess={async () => {
            console.log("handleViewSuccess");
            await handleViewSuccess();
          }}
        /> */}
        <WorkflowStageUpdator
          SSuser={{ SSuser }}
          workOrderId={workOrderItem.id}
        />
      </Card>
      <Card
        variation="elevated"
        style={{
          width: "60%",
          padding: "2rem",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          ":hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <StyledSection title="Work Order Information">
          <Grid templateColumns="1fr 1fr" gap="medium">
            <StyledInfoItem
              icon={<MdAssignment />}
              label="Work Order Number"
              value={editedWorkOrder.woNumber}
            />
            <StyledInfoItem
              icon={<MdAssignment />}
              label="Current Stage"
              value={editedWorkOrder.currentStage}
            />
            <StyledInfoItem
              icon={<MdAssignment />}
              label="Type"
              value={editedWorkOrder.type}
            />
            <StyledInfoItem
              icon={<MdAssignment />}
              label="Details"
              value={editedWorkOrder.details}
            />
          </Grid>
        </StyledSection>

        <StyledDivider />

        <StyledSection title="Vehicle Information">
          <Grid templateColumns="1fr 1fr 1fr" gap="medium">
            <StyledInfoItem
              icon={<MdBuild />}
              label="Make"
              value={editedWorkOrder.make}
            />
            <StyledInfoItem
              icon={<MdBuild />}
              label="Model"
              value={editedWorkOrder.model}
            />
            <StyledInfoItem
              icon={<MdBuild />}
              label="Year"
              value={editedWorkOrder.year}
            />
          </Grid>
        </StyledSection>

        <StyledDivider />

        <StyledSection title="CNC Information">
          <Grid templateColumns="1fr" gap="medium">
            <StyledInfoItem
              icon={<MdBusiness />}
              label="CNC Company"
              value={companyName || "Loading..."}
            />
          </Grid>
        </StyledSection>
        {currentRole !== "CNC" && (
          <>
            <StyledDivider />

            <StyledSection title="Customer Information">
              <Grid templateColumns="1fr 1fr" gap="medium">
                <StyledInfoItem
                  icon={<MdPerson />}
                  label="Customer Name"
                  value={editedWorkOrder.customerName}
                />
                <StyledInfoItem
                  icon={<MdLocationOn />}
                  label="Customer Shipping Address"
                  value={editedWorkOrder.customerDropShippingAddress}
                />
              </Grid>
            </StyledSection>
          </>
        )}
        <StyledDivider />

        <StyledSection title="Manufacturer Information">
          <Grid templateColumns="1fr 1fr" gap="medium">
            <StyledInfoItem
              icon={<MdBusiness />}
              label="Company Name"
              value={editedWorkOrder.businessName}
            />
            <StyledInfoItem
              icon={<MdPerson />}
              label="Attention"
              value={editedWorkOrder.attnName}
            />
            <StyledInfoItem
              icon={<MdLocationOn />}
              label="Company Shipping Address"
              value={editedWorkOrder.businessShippingAddress}
            />
          </Grid>
        </StyledSection>
      </Card>

      <Card variation="elevated" style={{ margintop: "20px" }}>
        <Flex margintop="large"></Flex>
        <div className={styles.header}>
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
