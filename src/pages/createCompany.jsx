// CreateCompany.jsx
import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { createCompany, updateCompany } from "../graphql/mutations";
import * as randomWords from "random-words";

import {
  Button,
  TextField,
  Card,
  Flex,
  Alert,
  View,
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
