import React, { useState, useEffect } from "react";

import { generateClient } from "aws-amplify/api";
import {
  createWorkOrder,
  incrementCounter,
  updateWorkOrder,
  createWorkflowStage,
} from "../graphql/mutations";
import { listUsers, listCompanies, listCompanyRoles } from "../graphql/queries";
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
  const [showFiles, setShowFiles] = useState(false);
  // State to store company roles
  const [companyRoles, setCompanyRoles] = useState([]);
  const [CNCCompanies, setCNCCompanies] = useState([]);
  const [ManCompanies, setManCompanies] = useState([]);
  const [formState, setFormState] = useState({
    woNumber: "N/A",
    createdById: "",
    assignedToId: "",
    companyId: "",
    CNCId: "",
    status: "PENDING",
    type: "",
    description: "",
    make: "",
    model: "",
    year: "",
    attnName: "",
    customerName: "",
    customerDropShippingAddress: "",
    filesFolder: "",
    currentStage: "SCANNING",
  });
  const workOrderTypes = [
    "Ratchet_Mooring",
    "Ratchet_Travel",
    "Ratchet_Winter_Storage",
    "Snap_or_hardware_Full",
    "Snap_or_hardware_separate_bow_and_cockpit",
    "OTHER",
    "Boat_Seat_Covers",
  ];
  const companyTypes = [
    "CNC",
    "SCAN",
    "MANUFACTURE",
    "CUSTOMER",
    "WAREHOUSE",
    "DEALER",
    "RV_DEALER",
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
        manId: "",
        status: "PENDING",
        type: "",
        description: "",
        make: "",
        model: "",
        year: "",
        attnName: "",
        customerName: "",
        customerDropShippingAddress: "",
        currentStage: "SCANNING",
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
            currentStage: "SCANNING",
            attnName: `SCAN AND SEW, ${newWorkOrderNumber}`,
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
            attnName: workOrderItem.attnName,
            customerName: workOrderItem.customerName,
            customerDropShippingAddress:
              workOrderItem.customerDropShippingAddres,
            description: workOrderItem.description,
            manId: workOrderItem.manId,
          }));
        }
        // fetchUsers();
        await fetchCompanies();
        await fetchCompanyTypes();
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

  const fetchCompanyTypes = async () => {
    try {
      const response = await client.graphql({
        query: listCompanyRoles,
      });

      // Get the company types from the attributes
      const companyRoles1 = response.data.listCompanyRoles.items;
      if (companyRoles1) {
        setCompanyRoles(companyRoles1);
        // Filter companyRoles to get the company IDs with the role 'cnc'
        const cncCompanyIds = companyRoles1
          .filter((companyRole) => companyRole.roleId === "CNC")
          .map((companyRole) => companyRole.companyId); // Get the company details from the companies array using the filtered company IDs
        const cncCompanies1 = companies.filter((company) =>
          cncCompanyIds.includes(company.id)
        );
        setCNCCompanies(cncCompanies1);

        // Filter companyRoles to get the company IDs with the role 'cnc'
        const ManCompanyIds = companyRoles1
          .filter((companyRole) => companyRole.roleId === "MANUFACTURING")
          .map((companyRole) => companyRole.companyId); // Get the company details from the companies array using the filtered company IDs
        const ManCompanies1 = companies.filter((company) =>
          ManCompanyIds.includes(company.id)
        );
        setManCompanies(ManCompanies1);
      }
      // setIsDataFetched(true);
    } catch (error) {
      console.error("Error fetching company types:", error);
      setIsDataFetched(false);
    }
  };

  // const fetchUsers = async () => {
  //   try {
  //     const userData = await client.graphql({
  //       query: listUsers,
  //     });
  //     console.log("Users:", userData.data.listUsers.items);
  //     setUsers(userData.data.listUsers.items);
  //   } catch (err) {
  //     console.log("error fetching users", err);
  //   }
  // };

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
      const input = {
        input: formState,
      };
      console.log("input is", input);
      if (button === "create") {
        //Create work order stage
        const workOrder = await client.graphql({
          query: createWorkOrder,
          variables: input,
        });

        const workflowStage = await client.graphql({
          query: createWorkflowStage,
          variables: {
            input: {
              workOrderId: workOrder.data.createWorkOrder.id,
              stage: "SCANNING",
              companyId: formState.companyId,
              status: "QUEUED",
              notes: "Testing",
            },
          },
        });
      } else if (button === "edit")
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
        description: "",
        make: "",
        model: "",
        year: "",
        attnName: "",
        customerName: "",
        customerDropShippingAddress: "",
        manId: "",
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
              <h2>Work Order {formState.woNumber}</h2>
              <Button onClick={() => toggleForm()} className="close-button">
                &times;
              </Button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="work-order-form-columns">
                <div className="work-order-form-left">
                  <Card variation="elevated" style={{ marginBottom: "20px" }}>
                    <Heading level={5} style={{ marginBottom: "10px" }}>
                      General Details
                    </Heading>
                    <div className="form-group">
                      <label htmlFor="type" className="required-field">
                        Work Order Type
                      </label>
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
                  </Card>
                  <Card variation="elevated" style={{ marginBottom: "20px" }}>
                    <Heading level={5} style={{ marginBottom: "10px" }}>
                      Vehicle Information
                    </Heading>
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
                      <label htmlFor="description" className="required-field">
                        Description
                      </label>
                      <textarea
                        id="description"
                        className="required-field"
                        value={formState.details}
                        onChange={(e) =>
                          setInput("description", e.target.value)
                        }
                        required
                      />
                    </div>
                  </Card>
                  <Card variation="elevated" style={{ marginBottom: "20px" }}>
                    <Heading level={5} style={{ marginBottom: "10px" }}>
                      Customer Information
                    </Heading>
                    <div className="form-group">
                      <label htmlFor="customerName">Customer Name</label>
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
                      <label htmlFor="customerDropShippingAddress">
                        Customer Shipping Address
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
                  <Card variation="elevated" style={{ marginBottom: "20px" }}>
                    <Heading level={5} style={{ marginBottom: "10px" }}>
                      Process Information
                    </Heading>
                    <div className="form-group">
                      <label htmlFor="attnName">Attention</label>
                      <input
                        id="attnName"
                        value={formState.attnName}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="CNCId" className="required-field">
                        CNC Company
                      </label>
                      <select
                        id="CNCId"
                        value={formState.CNCId}
                        onChange={(e) => setInput("CNCId", e.target.value)}
                      >
                        <option value="">Select CNC Company</option>
                        {CNCCompanies.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="ManId" className="required-field">
                        Select Manufacturing Company
                      </label>
                      <select
                        id="ManId"
                        value={formState.manId}
                        onChange={(e) => setInput("manId", e.target.value)}
                      >
                        <option value=""> Select Manufacturing Company</option>
                        {ManCompanies.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Card>
                </div>

                <div className="work-order-form-right">
                  <div className="form-group">
                    <Card variation="elevated" padding="1.5rem">
                      <label>Upload Image Files</label>
                      <FileUploader3
                        onUploadSuccess={handleUploadSuccess}
                        workorderNumber={formState.woNumber}
                        SSuser={SSuser}
                        type="images"
                      />

                      {/* <Card
                      variation="elevated"
                      style={{ marginTop: "20px", marginBottom: "20px" }}
                    > */}
                      <div
                        className={styles.header}
                        style={{ marginTop: "20px", marginBottom: "20px" }}
                      >
                        <label>Uploaded Image Files</label>
                        <div className={styles.headerActions}>
                          <Button
                            variation="info"
                            onClick={fetchS3Files}
                            size="small"
                          >
                            <MdRefresh className={styles.actionIcon} />
                            Refresh
                          </Button>
                          <Button
                            variation="info"
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
                    {button === "edit" &&
                      workOrderItem.currentStage === "DESIGN" && (
                        <div>
                          <Card
                            variation="elevated"
                            padding="1.5rem"
                            style={{ marginTop: "20px", marginBottom: "20px" }}
                          >
                            <label>Upload Design Files</label>
                            <FileUploader3
                              onUploadSuccess={handleUploadSuccess}
                              workorderNumber={formState.woNumber}
                              SSuser={SSuser}
                              type="designs"
                            />
                            <div
                              className={styles.header}
                              style={{ marginTop: "20px" }}
                            >
                              <label>Uploaded Design Files</label>
                              <div className={styles.headerActions}>
                                <Button
                                  variation="info"
                                  onClick={fetchS3Files}
                                  size="small"
                                >
                                  <MdRefresh className={styles.actionIcon} />
                                  Refresh
                                </Button>
                                <Button
                                  variation="info"
                                  size="small"
                                  disabled={displayedFiles.length === 0}
                                >
                                  <MdCloudDownload
                                    className={styles.actionIcon}
                                  />
                                  Download
                                </Button>
                                <Button
                                  variation="warning"
                                  size="small"
                                  disabled={displayedFiles.length === 0}
                                >
                                  <MdDeleteSweep
                                    className={styles.actionIcon}
                                  />
                                  Delete
                                </Button>
                                <Button
                                  variation="info"
                                  onClick={toggleFileList}
                                  size="small"
                                >
                                  {showFiles ? (
                                    <MdExpandLess />
                                  ) : (
                                    <MdExpandMore />
                                  )}
                                  {showFiles ? "Hide" : "Show"}
                                </Button>
                              </div>
                            </div>
                            <p className={styles.totalFiles}>
                              {displayedFiles.length} file(s) attached to work
                              order
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
                                          onClick={() =>
                                            handleDownload(file.path)
                                          }
                                          title="Download"
                                        >
                                          <MdDownload />
                                        </Button>
                                        <Button
                                          className={styles.actionButton}
                                          onClick={() =>
                                            handleDelete(file.path)
                                          }
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
                          <Card
                            variation="elevated"
                            padding="1.5rem"
                            style={{ marginTop: "20px", marginBottom: "20px" }}
                          >
                            <label>Upload Manufacturer Files</label>
                            <FileUploader3
                              onUploadSuccess={handleUploadSuccess}
                              workorderNumber={formState.woNumber}
                              SSuser={SSuser}
                              type="manufacturing"
                            />
                            <div
                              className={styles.header}
                              style={{ marginTop: "20px" }}
                            >
                              <label>Uploaded Manufacturer Files</label>
                              <div className={styles.headerActions}>
                                <Button
                                  variation="info"
                                  onClick={fetchS3Files}
                                  size="small"
                                >
                                  <MdRefresh className={styles.actionIcon} />
                                  Refresh
                                </Button>
                                <Button
                                  variation="info"
                                  size="small"
                                  disabled={displayedFiles.length === 0}
                                >
                                  <MdCloudDownload
                                    className={styles.actionIcon}
                                  />
                                  Download
                                </Button>
                                <Button
                                  variation="warning"
                                  size="small"
                                  disabled={displayedFiles.length === 0}
                                >
                                  <MdDeleteSweep
                                    className={styles.actionIcon}
                                  />
                                  Delete
                                </Button>
                                <Button
                                  variation="info"
                                  onClick={toggleFileList}
                                  size="small"
                                >
                                  {showFiles ? (
                                    <MdExpandLess />
                                  ) : (
                                    <MdExpandMore />
                                  )}
                                  {showFiles ? "Hide" : "Show"}
                                </Button>
                              </div>
                            </div>
                            <p className={styles.totalFiles}>
                              {displayedFiles.length} file(s) attached to work
                              order
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
                                          onClick={() =>
                                            handleDownload(file.path)
                                          }
                                          title="Download"
                                        >
                                          <MdDownload />
                                        </Button>
                                        <Button
                                          className={styles.actionButton}
                                          onClick={() =>
                                            handleDelete(file.path)
                                          }
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
                      )}
                    <Card variation="elevated" style={{ marginTop: "20px" }}>
                      <Button type="submit" variation="primary">
                        {button === "create" ? "Create Draft" : "Save Draft"}
                      </Button>
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
