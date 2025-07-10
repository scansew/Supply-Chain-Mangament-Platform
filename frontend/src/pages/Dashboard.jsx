/**
 * Dashboard Component
 * This component serves as the main user dashboard, providing a welcome message and profile completion form.
 * It allows users to verify their company secret and update their profile information.
 */

import React, { useState } from "react";
import {
  Card,
  Heading,
  Text,
  Flex,
  Button,
  TextField,
  View,
  Alert,
} from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { updateUserCompany } from "../graphql/mutations";

/**
 * Main component function
 * @param {Object} props - Component props
 * @param {Object} props.SSuser - Current authenticated user object
 */
function Dashboard({ SSuser }) {
  // State to store company secret input
  const [companySecret, setCompanySecret] = useState("");
  // State to track verification status
  const [isVerifying, setIsVerifying] = useState(false);
  // State to store error messages
  const [error, setError] = useState(null);
  // State to track update success
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const client = generateClient();

  /**
   * Retry a promise-based function
   * @param {Function} fn - The function to retry
   * @param {number} retriesLeft - Number of retries
   * @param {number} interval - Retry interval in milliseconds
   */
  const retry = async (fn, retriesLeft = 3, interval = 1000) => {
    try {
      return await fn();
    } catch (error) {
      if (retriesLeft === 0) throw error;
      await new Promise((resolve) => setTimeout(resolve, interval));
      return retry(fn, retriesLeft - 1, interval);
    }
  };

  /**
   * Verify company secret and update user profile
   * @param {Event} e - Form submit event
   */
  const verifyAndUpdateProfile = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setError(null);

    try {
      // Retry the GraphQL request up to 3 times
      const result = await retry(() =>
        client.graphql({
          query: updateUserCompany,
          variables: {
            userId: SSuser.id,
            companySecret: companySecret,
          },
        })
      );

      if (result.data.updateUserCompany) {
        setUpdateSuccess(true);
        setError(null);
        setTimeout(() => {
          window.location.reload(); // Refresh the page
        }, 1500); // Wait 1.5 seconds before refreshing
      }
    } catch (err) {
      console.error("Error during verification:", err);
      setError(
        err.message || "Failed to verify company secret. Please try again later."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="dash-content">
      <Heading level={2}>
        Welcome to Your Dashboard, {SSuser.given_name}
      </Heading>
      {SSuser.role === "new" ? (
        <View as="form" onSubmit={verifyAndUpdateProfile} margin="1rem 0">
          <Heading level={4}>Complete Your Profile</Heading>

          {error && (
            <Alert variation="error" margin="1rem 0">
              {error}
            </Alert>
          )}

          {updateSuccess && (
            <Alert variation="success" margin="1rem 0">
              Profile updated successfully! You now have access to features.
              Redirecting you to your Dashboard...
            </Alert>
          )}

          <TextField
            label="Company Secret"
            placeholder="Enter your company secret"
            value={companySecret}
            onChange={(e) => setCompanySecret(e.target.value.toUpperCase())}
            type="text"
            required
            isDisabled={isVerifying}
            errorMessage="Please enter a valid company secret"
          />

          <Button
            type="submit"
            isLoading={isVerifying}
            loadingText="Verifying..."
            variation="primary"
            margin="1rem 0"
          >
            Verify and Update Profile
          </Button>
        </View>
      ) : (
        <Flex direction="row" wrap="wrap" gap="1rem">
          {/* Additional dashboard content can be added here */}
        </Flex>
      )}
    </div>
  );
}

export default Dashboard;
