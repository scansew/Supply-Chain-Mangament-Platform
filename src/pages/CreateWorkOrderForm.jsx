import React, { useState, useEffect } from "react";

import { generateClient } from "aws-amplify/api";
import {
  createWorkOrder,
  incrementCounter,
  updateWorkOrder,
} from "../graphql/mutations";
import { listUsers, listCompanies } from "../graphql/queries";
import { list, remove, getUrl } from "aws-amplify/storage";

import FileUploader3 from "./FileUploader3";

import "./WOForm.css";
import {
  MdRefresh,
  MdInsertDriveFile,
  MdDownload,
  MdDelete,
  MdExpandMore,
  MdExpandLess,
  MdCloudDownload,
  MdDeleteSweep,
} from "react-icons/md";
import { Card, Heading } from "@aws-amplify/ui-react";
import styles from "./WOForm.module.css";
import { Button } from "@aws-amplify/ui-react";

const CreateWorkOrderForm = ({
  SSuser,
  button,
  workOrderItem,
  handleViewSuccess,
}) => {
  const client = generateClient();

  const [createButton, setCreateButton] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedFiles, setDisplayedFiles] = useState([]);
  const [showFiles, setShowFiles] = useState(true);
  const [formState, setFormState] = useState({
    woNumber: "N/A",
    createdById: "",
    assignedToId: "",
    companyId: "",
    CNCId: "",
    status: "PENDING",
    type: "",
    details: "",
    make: "",
    model: "",
    year: "",
    businessName: "",
    attnName: "",
    businessPhone: "",
    businessShippingAddress: "",
    customerName: "",
    customerDropShippingAddress: "",
    filesFolder: "",
  });
  const workOrderTypes = [
    "Ratchet_Mooring",
    "Ratchet_Travel",
    "Ratchet_Winter_Storage",
    "Snap_or_hardware_Full",
    "Snap_or_hardware_separate_bow_and_cockpit",
    "RV_Skirt",
    "Boat_Seat_Covers",
  ];

  useEffect(() => {
    // fetchUser();
    // console.log("SSuser is", SSuser);
    if (button === "create") setCreateButton(true);
    else if (button === "edit") setEditButton(true);
  }, []);

  const handleUploadSuccess = async (fileKeys) => {
    console.log("Files synced successfully:", fileKeys);
    await fetchS3Files();
    // setFormState((prevState) => ({ ...prevState, files }));
  };

  const fetchS3Files = async () => {
    setFiles("");
    setIsLoading(true);
    setError(null);
    try {
      const key = `public/companies/${SSuser.companyId}/${formState.woNumber}`;

      const fetchedFiles = await list({
        path: key,
        options: {
          accessLevel: "public",
          listAll: true,
        },
      });
      if (fetchedFiles.items.length > 0) {
        setFormState((prevState) => ({ ...prevState, filesFolder: key }));
        console.log("Key is", formState.filesFolder);
      }
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

  const toggleForm = async (event) => {
    if (event && event.target.className === "work-order-form-wrapper") {
      setFormState({
        woNumber: "N/A",
        createdById: "",
        assignedToId: "",
        companyId: "",
        CNCId: "",
        status: "PENDING",
        type: "",
        details: "",
        make: "",
        model: "",
        year: "",
        businessName: "",
        attnName: "",
        businessPhone: "",
        businessShippingAddress: "",
        customerName: "",
        customerDropShippingAddress: "",
        // files: [],
      });
      setShowForm(false);
    } else {
      if (showForm === false) {
        if (button == "create") {
          const newWorkOrderNumber = await generateWorkOrderNumber();
          setFormState((prevState) => ({
            ...prevState,
            woNumber: newWorkOrderNumber,
            createdById: SSuser.id,
            assignedToId: SSuser.id,
            companyId: SSuser.companyId,
          }));
        } else if (button == "edit") {
          setFormState(() => ({
            id: workOrderItem.id,
            createdById: SSuser.id,
            woNumber: workOrderItem.woNumber,
            assignedToId: workOrderItem.assignedToId,
            CNCId: workOrderItem.CNCId,
            status: workOrderItem.status,
            type: workOrderItem.type,
            details: workOrderItem.details,
            make: workOrderItem.make,
            model: workOrderItem.model,
            year: workOrderItem.year,
            businessName: workOrderItem.businessName,
            attnName: workOrderItem.attnName,
            businessPhone: workOrderItem.businessPhone,
            businessShippingAddress: workOrderItem.businessShippingAddress,
            customerName: workOrderItem.customerName,
            customerDropShippingAddress:
              workOrderItem.customerDropShippingAddres,
          }));
        }
        // fetchUsers();
        await fetchCompanies();
        await fetchS3Files();
      }
      setShowForm(!showForm);
    }
  };

  const fetchCompanies = async () => {
    try {
      const companyData = await client.graphql({
        query: listCompanies,
      });
      console.log("companies:", companyData.data.listCompanies.items);
      setCompanies(companyData.data.listCompanies.items);
    } catch (err) {
      console.log("error fetching companies", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const userData = await client.graphql({
        query: listUsers,
      });
      console.log("Users:", userData.data.listUsers.items);
      setUsers(userData.data.listUsers.items);
    } catch (err) {
      console.log("error fetching users", err);
    }
  };

  async function generateWorkOrderNumber() {
    try {
      const result = await client.graphql({
        query: incrementCounter,
        variables: { counterName: "workOrderNumber" },
      });

      const newWorkOrderNumber = result.data.incrementCounter;

      console.log("New work order number:", newWorkOrderNumber);
      return newWorkOrderNumber;
    } catch (error) {
      console.error("Error generating work order number:", error);
      throw error;
    }
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      // if (
      //   !formState.createdById ||
      //   !formState.assignedToId ||
      //   !formState.companyId ||
      //   !formState.type
      // ) {
      //   alert("Please fill in all required fields.");
      //   return;
      // }
      const input = {
        input: formState,
      };
      if (button === "create")
        await client.graphql({
          query: createWorkOrder,
          variables: input,
        });
      else if (button === "edit")
        await client.graphql({
          query: updateWorkOrder,
          variables: input,
        });

      setFormState({
        woNumber: "",
        createdById: "",
        assignedToId: "",
        companyId: "",
        status: "",
        type: "",
        details: "",
        make: "",
        model: "",
        year: "",
        businessName: "",
        attnName: "",
        businessPhone: "",
        businessShippingAddress: "",
        customerName: "",
        customerDropShippingAddress: "",
      });
      if (typeof handleViewSuccess === "function") {
        handleViewSuccess();
      }
      setShowForm(false);
      alert("Work order created successfully!");
    } catch (err) {
      console.log("error creating work order:", err);
      alert("Error creating work order. Please try again.");
    }
  }
  const toggleFileList = () => {
    setShowFiles(!showFiles);
  };
  const getFileName = (fullPath) => {
    return fullPath.split("/").pop();
  };

  return (
    <div className="work-order-container">
      {button === "create" ? (
        <Button
          onClick={() => toggleForm()}
          variation="primary"
          className="create-work-order-button"
        >
          Create New Work Order
        </Button>
      ) : (
        <Button onClick={() => toggleForm()} variation="info" size="medium">
          Edit Work Order
        </Button>
      )}
      {showForm && (
        <div className="work-order-form-wrapper" onClick={toggleForm}>
          <div className="work-order-form" onClick={(e) => e.stopPropagation()}>
            <div className="form-header">
              <h2>Create Work Order {formState.woNumber}</h2>
              <Button onClick={() => toggleForm()} className="close-button">
                &times;
              </Button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="work-order-form-columns">
                <div className="work-order-form-left">
                  <Card variation="elevated" style={{ marginBottom: "20px" }}>
                    <Heading level={5}>General Details</Heading>
                    <div className="form-group">
                      <label htmlFor="type">Work Order Type</label>
                      <select
                        id="type"
                        value={formState.type}
                        onChange={(e) => setInput("type", e.target.value)}
                        required
                      >
                        <option value="">Select Work Order Type</option>
                        {workOrderTypes.map((type) => (
                          <option key={type} value={type}>
                            {type.replace(/_/g, " ")}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="details">Details</label>
                      <textarea
                        id="details"
                        value={formState.details}
                        onChange={(e) => setInput("details", e.target.value)}
                        required
                      />
                    </div>
                  </Card>

                  {/* <div className="form-group">
                <label htmlFor="process">Process</label>
                <input
                  id="process"
                  type="text"
                  value={formState.process}
                  onChange={(e) => setInput("process", e.target.value)}
                  required
                />
              </div> */}
                  <Card variation="elevated" style={{ marginBottom: "20px" }}>
                    <Heading level={5}>Vehicle Information</Heading>
                    <div className="form-group">
                      <label htmlFor="make" className="required-field">
                        Make
                      </label>
                      <input
                        id="make"
                        type="text"
                        value={formState.make}
                        onChange={(e) => setInput("make", e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="model" className="required-field">
                        Model
                      </label>
                      <input
                        id="model"
                        type="text"
                        value={formState.model}
                        onChange={(e) => setInput("model", e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="year" className="required-field">
                        Year
                      </label>
                      <input
                        id="year"
                        type="number"
                        value={formState.year}
                        onChange={(e) =>
                          setInput("year", parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        value={formState.details}
                        onChange={(e) =>
                          setInput("description", e.target.value)
                        }
                        required
                      />
                    </div>
                  </Card>
                  <Card variation="elevated" style={{ marginBottom: "20px" }}>
                    <Heading level={5}>CNC/WCNC Information</Heading>
                    <div className="form-group">
                      <label htmlFor="CNCId" className="required-field">
                        CNC Company
                      </label>
                      <select
                        id="companyId"
                        value={formState.companyId}
                        onChange={(e) => setInput("CNCId", e.target.value)}
                      >
                        <option value="">Select CNC Company</option>
                        {companies.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </select>
                      <span className={styles.orText}>OR</span>
                      <label htmlFor="businessName">Business Name</label>
                      <input
                        id="businessName"
                        type="text"
                        value={formState.businessName}
                        onChange={(e) =>
                          setInput("businessName", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="attnName">Attention Name</label>
                      <input
                        id="attnName"
                        type="text"
                        value={formState.attnName}
                        onChange={(e) => setInput("attnName", e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="businessPhone">Business Phone</label>
                      <input
                        id="businessPhone"
                        type="tel"
                        value={formState.businessPhone}
                        onChange={(e) =>
                          setInput("businessPhone", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="businessShippingAddress">
                        Business Shipping Address
                      </label>
                      <textarea
                        id="businessShippingAddress"
                        value={formState.businessShippingAddress}
                        onChange={(e) =>
                          setInput("businessShippingAddress", e.target.value)
                        }
                      />
                    </div>
                  </Card>
                  <Card variation="elevated" style={{ marginBottom: "20px" }}>
                    <Heading level={5}>Customer Information</Heading>
                    <div className="form-group">
                      <label htmlFor="customerName" className="required-field">
                        Customer Name
                      </label>
                      <input
                        id="customerName"
                        type="text"
                        value={formState.customerName}
                        onChange={(e) =>
                          setInput("customerName", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="customerDropShippingAddress"
                        className="required-field"
                      >
                        Customer Drop Shipping Address
                      </label>
                      <textarea
                        id="customerDropShippingAddress"
                        value={formState.customerDropShippingAddress}
                        onChange={(e) =>
                          setInput(
                            "customerDropShippingAddress",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </Card>

                  <Button type="submit" variation="primary">
                    Submit
                  </Button>
                </div>

                <div className="work-order-form-right">
                  <div className="form-group">
                    <FileUploader3
                      onUploadSuccess={handleUploadSuccess}
                      workorderNumber={formState.woNumber}
                      SSuser={SSuser}
                    />

                    <Card variation="elevated" style={{ marginTop: "20px" }}>
                      <div className={styles.header}>
                        <label>Uploaded Files</label>
                        <div className={styles.headerActions}>
                          <Button
                            variation="primary"
                            onClick={fetchS3Files}
                            size="small"
                          >
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
                          <Button
                            variation="info"
                            onClick={toggleFileList}
                            size="small"
                          >
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
                                <MdInsertDriveFile
                                  className={styles.fileIcon}
                                />
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
                        <div className={styles.noFiles}>
                          No files uploaded yet
                        </div>
                      )}
                    </Card>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateWorkOrderForm;
