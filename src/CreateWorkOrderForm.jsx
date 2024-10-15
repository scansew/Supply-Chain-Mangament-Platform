import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { createWorkOrder } from "./graphql/mutations";
import { listUsers, listCompanies } from "./graphql/queries";
import { incrementCounter } from "./graphql/mutations";
import "./WOForm.css";
import CreateWOFiles from "./UploadImages";

const CreateWorkOrderForm = () => {
  const client = generateClient();

  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [formState, setFormState] = useState({
    woNumber: "",
    createdById: "",
    assignedToId: "",
    companyId: "",
    status: "PENDING",
    type: "",
    details: "",
    process: "",
    make: "",
    model: "",
    year: "",
    businessName: "",
    attnName: "",
    businessPhone: "",
    businessShippingAddress: "",
    customerName: "",
    customerDropShippingAddress: "",
    files: [],
  });

  const toggleForm = (event) => {
    if (event && event.target.className === "work-order-form-wrapper") {
      setShowForm(false);
    } else {
      setShowForm(!showForm);
    }
  };

  const handleFilesChange = (files) => {
    setFormState((prevState) => ({ ...prevState, files }));
  };

  useEffect(() => {
    fetchUsers();
    fetchCompanies();
  }, []);

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
      if (
        !formState.createdById ||
        !formState.assignedToId ||
        !formState.companyId ||
        !formState.type ||
        !formState.process
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      const woNumber = await generateWorkOrderNumber();
      const workOrder = {
        ...formState,
        woNumber,
        files: formState.files.map((file) => file.path),
      };
      const input = {
        input: workOrder
      };
      await client.graphql({
        query: createWorkOrder,
        variables: input,
      });

      setFormState({
        woNumber: "",
        createdById: "",
        assignedToId: "",
        companyId: "",
        status: "PENDING",
        type: "",
        details: "",
        process: "",
        make: "",
        model: "",
        year: "",
        businessName: "",
        attnName: "",
        businessPhone: "",
        businessShippingAddress: "",
        customerName: "",
        customerDropShippingAddress: "",
        files: [],
      });
      setShowForm(false);
      alert("Work order created successfully!");
    } catch (err) {
      console.log("error creating work order:", err);
      alert("Error creating work order. Please try again.");
    }
  }

  return (
    <div className="work-order-container">
      <button onClick={() => toggleForm()} className="create-work-order-button">
        Create New Work Order
      </button>

      {showForm && (
        <div className="work-order-form-wrapper" onClick={toggleForm}>
          <div className="work-order-form" onClick={(e) => e.stopPropagation()}>
            <div className="form-header">
              <h2>Create New Work Order</h2>
              <button onClick={() => toggleForm()} className="close-button">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="files">Upload Image Files</label>

                <CreateWOFiles onFilesChange={handleFilesChange} />
              </div>

              <div className="form-group">
                <label htmlFor="createdById">Created By</label>
                <select
                  id="createdById"
                  value={formState.createdById}
                  onChange={(e) => setInput("createdById", e.target.value)}
                  required
                >
                  <option value="">Select Creator</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="assignedToId">Assigned To</label>
                <select
                  id="assignedToId"
                  value={formState.assignedToId}
                  onChange={(e) => setInput("assignedToId", e.target.value)}
                  required
                >
                  <option value="">Select Assignee</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="companyId">Company</label>
                <select
                  id="companyId"
                  value={formState.companyId}
                  onChange={(e) => setInput("companyId", e.target.value)}
                  required
                >
                  <option value="">Select Company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={formState.status}
                  onChange={(e) => setInput("status", e.target.value)}
                  required
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <input
                  id="type"
                  type="text"
                  value={formState.type}
                  onChange={(e) => setInput("type", e.target.value)}
                  required
                />
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
              <div className="form-group">
                <label htmlFor="process">Process</label>
                <input
                  id="process"
                  type="text"
                  value={formState.process}
                  onChange={(e) => setInput("process", e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="make">Make</label>
                <input
                  id="make"
                  type="text"
                  value={formState.make}
                  onChange={(e) => setInput("make", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="model">Model</label>
                <input
                  id="model"
                  type="text"
                  value={formState.model}
                  onChange={(e) => setInput("model", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="year">Year</label>
                <input
                  id="year"
                  type="number"
                  value={formState.year}
                  onChange={(e) => setInput("year", parseInt(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="businessName">Business Name</label>
                <input
                  id="businessName"
                  type="text"
                  value={formState.businessName}
                  onChange={(e) => setInput("businessName", e.target.value)}
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
                  onChange={(e) => setInput("businessPhone", e.target.value)}
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
              <div className="form-group">
                <label htmlFor="customerName">Customer Name</label>
                <input
                  id="customerName"
                  type="text"
                  value={formState.customerName}
                  onChange={(e) => setInput("customerName", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerDropShippingAddress">
                  Customer Drop Shipping Address
                </label>
                <textarea
                  id="customerDropShippingAddress"
                  value={formState.customerDropShippingAddress}
                  onChange={(e) =>
                    setInput("customerDropShippingAddress", e.target.value)
                  }
                />
              </div>

              <button type="submit" className="submit-button">
                Create Work Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateWorkOrderForm;
