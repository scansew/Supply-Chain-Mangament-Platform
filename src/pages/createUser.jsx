// CreateUser.jsx
import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { createUser, updateUser } from "../graphql/mutations";
import {
  Button,
  TextField,
  SelectField,
  Card,
  Flex,
  Alert,
  View,
} from "@aws-amplify/ui-react";

const client = generateClient();

function CreateUser({ isOpen, onClose, onSuccess, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "employee",
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        role: initialData.role || "employee",
        companyId: initialData.companyId || "",
      });
    } else {
      // Reset form when not editing
      setFormData({
        name: "",
        email: "",
        role: "employee",
        companyId: "",
      });
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

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "employee",
      companyId: "",
    });
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return "Invalid email format";
    }
    if (!formData.companyId) return "Company is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const mutation = initialData ? updateUser : createUser;
      const input = {
        name: formData.name,
        email: formData.email.toLowerCase(),
        role: formData.role,
        companyId: formData.companyId,
      };

      // Add ID if updating
      if (initialData) {
        input.id = initialData.id;
      }

      const result = await client.graphql({
        query: mutation,
        variables: { input },
      });

      const resultData = initialData
        ? result.data.updateUser
        : result.data.createUser;
      onSuccess && onSuccess(resultData);
      handleClose();
    } catch (err) {
      console.error("Error saving user:", err);
      setError(err.message || "Failed to save user");
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
          <h2>{initialData ? "Edit User" : "Create New User"}</h2>
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="medium">
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <SelectField
                name="role"
                label="Role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </SelectField>

              <TextField
                name="companyId"
                label="Company ID"
                value={formData.companyId}
                onChange={handleInputChange}
                required
              />

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
                  type="submit"
                  variation="primary"
                  isLoading={loading}
                  loadingText={initialData ? "Updating..." : "Creating..."}
                >
                  {initialData ? "Update User" : "Create User"}
                </Button>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Card>
    </View>
  );
}

export default CreateUser;
