// CreateCompany.jsx
import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import {
  createCompany,
  updateCompany,
  createCompanyRole,
  deleteCompanyRole,
} from "../graphql/mutations";
import * as randomWords from "random-words";
import { getCompany, listCompanyRoles } from "../graphql/queries";

import {
  Button,
  TextField,
  Card,
  Flex,
  Alert,
  View,
  Text,
  CheckboxField,
} from "@aws-amplify/ui-react";

const client = generateClient();

function CreateCompany({ isOpen, onClose, onSuccess, initialData }) {
  // Function to generate readable word-based code
  const generateWordCode = () => {
    // Generate one word and capitalize it, then add 2 random numbers
    const words = randomWords
      .generate({ exactly: 2, maxLength: 5 })
      .map((word) => word.toUpperCase());
    const numbers = Math.floor(Math.random() * 90 + 10); // generates number between 10-99
    return `${words.join("-")}-${numbers}`;
  };
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    companySecret: generateWordCode(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [companyRoles, setCompanyRoles] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const companyTypes = [
    "CNC",
    "SCANNING",
    "MANUFACTURING",
    "CUSTOMER",
    "WHOLESALE",
    "DEALER",
    "RV_DEALER",
    "DESIGN",
  ];

  // Add this function to handle role deletion
  const handleDeleteUnselectedRoles = async () => {
    try {
      // Find roles that exist in companyRoles but not in selectedTypes
      const rolesToDelete = companyRoles.filter(
        (role) => !selectedTypes.includes(role.roleId)
      );

      // Delete each unselected role
      const deletePromises = rolesToDelete.map(async (role) => {
        await client.graphql({
          query: deleteCompanyRole,
          variables: {
            input: {
              id: role.id,
            },
          },
        });
      });

      // Wait for all deletions to complete
      await Promise.all(deletePromises);

      // Refresh the roles list
      await fetchCompanyTypes();

      console.log("Successfully deleted unselected roles");
    } catch (error) {
      console.error("Error deleting roles:", error);
      alert("Failed to delete roles. Please try again.");
    }
  };

  // Add this function to fetch company types
  const fetchCompanyTypes = async () => {
    console.log("ini", initialData);
    try {
      const response = await client.graphql({
        query: listCompanyRoles,
        variables: {
          filter: {
            companyId: { eq: initialData.id },
          },
        },
      });

      // Get the company types from the attributes
      const companyRoles1 = response.data.listCompanyRoles.items;
      if (companyRoles1) {
        setCompanyRoles(companyRoles1);
      }
      console.log(companyRoles);

      setSelectedTypes(companyRoles1.map((role) => role.roleId));

      setIsDataFetched(true);
    } catch (error) {
      console.error("Error fetching company types:", error);
      setIsDataFetched(false);
    }
  };

  const handleCreateRoles = async () => {
    try {
      // First, delete unselected roles
      await handleDeleteUnselectedRoles();
      // Then create new roles (your existing creation logic)
      const rolePromises = selectedTypes.map(async (type) => {
        // Check if role already exists to avoid duplicates
        const existingRole = companyRoles.find((role) => role.roleId === type);
        if (!existingRole) {
          const roleData = {
            companyId: initialData.id,
            roleId: type,
          };

          const response = await client.graphql({
            query: createCompanyRole,
            variables: {
              input: roleData,
            },
          });

          return response.data.createCompanyRole;
        }
      });

      // Wait for all roles to be created
      const createdRoles = (await Promise.all(rolePromises)).filter(Boolean);
      console.log("Created roles:", createdRoles);

      // Refresh the roles list
      fetchCompanyTypes();
    } catch (error) {
      console.error("Error creating roles:", error);
      alert("Failed to create roles. Please try again.");
    }
  };

  // Component to handle role selection and creation
  const handleCheckboxChange = (type) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handleUpdateCompany = async () => {
    await handleCreateRoles(selectedTypes);
    try {
      const updatedCompany = await client.graphql({
        query: updateCompany,
        variables: {
          input: {
            id: initialData.id,
          },
        },
      });

      // Show success message
      alert("Company roles and information updated successfully!");
    } catch (error) {
      console.error("Error updating company:", error);
      alert("Failed to update company information. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      companySecret: generateWordCode(),
    });
    setError(null);
  };

  const handleRegenerateCode = () => {
    setFormData((prev) => ({
      ...prev,
      companySecret: generateWordCode(),
    }));
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        address: initialData.address || "",
        companySecret: initialData.companySecret || generateWordCode(),
      });
      console.log(formData);
      fetchCompanyTypes();
    } else {
      resetForm();
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Company name is required";
    if (!formData.address.trim()) return "Email is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (selectedTypes.length === 0) {
      alert("Please select at least one role type");
      return;
    }
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const mutation = initialData ? updateCompany : createCompany;
      const input = {
        name: formData.name,
        address: formData.address,
        companySecret: formData.companySecret,
      };

      // Add ID if updating
      if (initialData) {
        input.id = initialData.id;
      }

      const result = await client.graphql({
        query: mutation,
        variables: { input },
      });
      try {
        await handleUpdateCompany();
      } catch {
        console.error("Error updating company:", err);
      }

      const resultData = initialData
        ? result.data.updateCompany
        : result.data.createCompany;
      onSuccess && onSuccess(resultData);
      handleClose();
    } catch (err) {
      console.error("Error saving company:", err);
      setError(err.message || "Failed to save company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      className="modal-overlay"
      onClick={handleClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <Card
        variation="elevated"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Flex direction="column" gap="medium" padding="medium">
          <h2>{initialData ? "Edit Company" : "Create New Company"}</h2>
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="medium">
              <TextField
                name="name"
                label="Company Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <TextField
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              <View>
                <Text>Company Types</Text>
                <Flex direction="column" gap="small">
                  {companyTypes.map((type) => (
                    <CheckboxField
                      key={type}
                      name={type}
                      value={type}
                      label={type.replace("_", " ")}
                      onChange={() => handleCheckboxChange(type)}
                      checked={selectedTypes.includes(type)}
                    />
                  ))}
                </Flex>
              </View>
              <Flex direction="row" gap="small" alignItems="flex-start">
                <TextField
                  label="Company Secret Code"
                  value={formData.companySecret}
                  readOnly={true}
                  helpertext="Unique company identifier"
                />
                <Button
                  onClick={handleRegenerateCode}
                  variation="info"
                  size="small"
                  style={{ marginTop: "35px" }}
                >
                  🔄
                </Button>
              </Flex>

              {error && (
                <Alert variation="error" isDismissible={true}>
                  {error}
                </Alert>
              )}

              <Flex justifyContent="flex-end" gap="medium">
                <Button onClick={handleClose} variation="link">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  variation="primary"
                  isLoading={loading}
                  loadingText={initialData ? "Updating..." : "Creating..."}
                >
                  {initialData ? "Update Company" : "Create Company"}
                </Button>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Card>
    </View>
  );
}

export default CreateCompany;
