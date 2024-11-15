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

function Dashboard({ SSuser }) {
  const [companySecret, setCompanySecret] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const client = generateClient();

  const verifyAndUpdateProfile = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setError(null);

    try {
      // Update user profile with the company ID
      const result = await client.graphql({
        query: updateUserCompany,
        variables: {
          userId: SSuser.id,
          companySecret: companySecret,
        },
      });
      console.log(
        "Successfully updated user company:",
        result.data.updateUserCompany
      );
      // return result.data.updateUserCompany;

      if (result.data.updateUserCompany) {
        setUpdateSuccess(true);
        setError(null);
        // You might want to trigger a refresh of the user data here
        // Show success message briefly before refreshing
        setTimeout(() => {
          window.location.reload(); // Refresh the page
        }, 1500); // Wait 1.5 seconds before refreshing
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        err.message || "Failed to verify company secret. Please try again."
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
          {/* <Card variation="elevated">
            <Heading level={5}>Work Orders</Heading>
            <Text>Total: 25</Text>
            <Text>Pending: 10</Text>
            <Text>Completed: 15</Text>
          </Card>

          <Card variation="elevated">
            <Heading level={5}>Companies</Heading>
            <Text>Total: 5</Text>
            <Text>Active: 4</Text>
          </Card>

          <Card variation="elevated">
            <Heading level={5}>Users</Heading>
            <Text>Total: 20</Text>
            <Text>Active: 18</Text>
          </Card>

          <Card variation="elevated">
            <Heading level={5}>Recent Activity</Heading>
            <Text>New work order created - 2 hours ago</Text>
            <Text>Work order #1234 completed - 1 day ago</Text>
            <Text>New user added - 2 days ago</Text>
          </Card> */}
        </Flex>
      )}
    </div>
  );
}

export default Dashboard;
