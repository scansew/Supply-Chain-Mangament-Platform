// Users.jsx
import React, { useState, useEffect, useCallback } from "react";
import { generateClient } from "aws-amplify/api";
import { listUsers, getCompany, listCompanyRoles } from "../graphql/queries";
import {
  createCompanyRole,
  updateCompany,
  deleteCompanyRole,
} from "../graphql/mutations";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Loader,
  Button,
  Flex,
  TextField,
  View,
  Heading,
  Card,
  Link,
  Text,
  CheckboxField,
} from "@aws-amplify/ui-react";
import CreateUser from "./createUser";

const client = generateClient();

function Users({ SSuser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [company, setCompany] = useState(null);
  const [editedCompany, setEditedCompany] = useState(null);
  const [showSecret, setShowSecret] = useState(false);
  const [isEditCompanyModalOpen, setIsEditCompanyModalOpen] = useState(false);
  const [companyRoles, setCompanyRoles] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

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

  useEffect(() => {
    fetchUsers();
    fetchCompanyDetails();
  }, []);

  const toggleSecretVisibility = () => {
    setShowSecret(!showSecret);
  };

  const maskCompanySecret = (secret) => {
    if (!secret) return "Not available";
    return showSecret
      ? secret
      : secret.substring(0, 4) + "*".repeat(secret.length - 4);
  };

  async function fetchCompanyDetails() {
    if (!SSuser.companyId) {
      console.log("No company ID available");
      return;
    }
    try {
      const companyData = await client.graphql({
        query: getCompany,
        variables: { id: SSuser.companyId },
      });
      setCompany(companyData.data.getCompany);
    } catch (err) {
      console.error("Error fetching company details:", err);
      setError("An error occurred while fetching company details.");
    }
  }

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
    try {
      const response = await client.graphql({
        query: listCompanyRoles,
        variables: {
          filter: {
            companyId: { eq: SSuser.companyId },
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
            companyId: SSuser.companyId,
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

  // Add useEffect to fetch company types when component mounts
  useEffect(() => {
    fetchCompanyTypes();
  }, []);

  async function fetchUsers() {
    try {
      if (SSuser.role === "sAdmin") {
        const usersData = await client.graphql({
          query: listUsers,
        });
        setUsers(usersData.data.listUsers.items);
      } else if (SSuser.role === "cAdmin") {
        const usersData = await client.graphql({
          query: listUsers,
          variables: {
            filter: {
              companyId: {
                eq: SSuser.companyId,
              },
            },
          },
        });
        setUsers(usersData.data.listUsers.items);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("An error occurred while fetching users.");
      setLoading(false);
    }
  }

  const handleMailtoClick = useCallback(() => {
    const companyName = company?.name || "Our Company";
    const inviteUrl = "https://main.scansew.com"; // Replace with your actual signup URL
    const companySecret = company?.companySecret || "Not available";

    const subject = encodeURIComponent(
      `Invitation to join ${companyName} on the Scan and Sew platform platform`
    );
    const body = encodeURIComponent(
      `
  Hello!
  
  You've been invited to join ${companyName} on the Scan and Sew platform.
  
  To get started, please follow these steps:
  1. Visit the signup page: ${inviteUrl}
  2. After you finish the sign-up process, log in to the portal and enter the following secret in the text box provided to gain access.
  3. Use the following Company Secret: ${companySecret}
  
  IMPORTANT: Keep this Company Secret confidential. Do not share it with anyone outside your organization.
  
  If you have any questions, please don't hesitate to reach out.
  
  Best regards,
  ${companyName} Team
    `.trim()
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [SSuser.companyId, company]);

  const copyInviteCredentials = useCallback(() => {
    const companyName = company?.name || "Our Company";
    const inviteUrl = "https://main.scansew.com"; // Replace with your actual signup URL
    const companySecret = company?.companySecret || "Not available";

    const inviteText = `
  Hello!
  
  You've been invited to join ${companyName} on the Scan and Sew platform platform.
  
  To get started, please follow these steps:
  1. Visit the signup page: ${inviteUrl}
  2. After you finish the sign-up process, log in to the portal and enter the following secret in the text box provided to gain access.
  3. Use the following Company Secret: ${companySecret}
  
  IMPORTANT: Keep this Company Secret confidential. Do not share it with anyone outside your organization.
  
  If you have any questions, please don't hesitate to reach out.
  
  Best regards,
  ${companyName} Team
    `.trim();

    navigator.clipboard.writeText(inviteText).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  }, [SSuser.companyId, company]);

  const handleInviteClick = () => {
    setIsInviteModalOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    alert("User updated successfully!");
  };

  const handleEditCompany = () => {
    // Add your company editing logic here
    // For example, you could open a modal similar to the invite modal
    setIsEditCompanyModalOpen(true);
  };

  const handleUpdateCompany = async (e) => {
    e.preventDefault();
    if (selectedTypes.length === 0) {
      alert("Please select at least one role type");
      return;
    }
    await handleCreateRoles(selectedTypes);
    try {
      const updatedCompany = await client.graphql({
        query: updateCompany,
        variables: {
          input: {
            id: company.id,
            ...editedCompany,
          },
        },
      });

      // Update local state
      setCompany({ ...editedCompany });

      // Close modal
      setIsEditCompanyModalOpen(false);

      // Show success message
      alert("Company roles and information updated successfully!");
    } catch (error) {
      console.error("Error updating company:", error);
      alert("Failed to update company information. Please try again.");
    }
  };

  if (loading) return <Loader variation="linear" />;
  if (error) return <div>{error}</div>;

  return (
    <div className="users-container">
      <Flex direction="column" padding="medium">
        <Flex justifyContent="space-between" alignItems="center">
          <h1>Users</h1>
          <Flex gap="small">
            <Button variation="primary" onClick={handleInviteClick}>
              Invite User
            </Button>
          </Flex>
        </Flex>

        <Table caption="" highlightOnHover={true} variation="striped">
          <TableHead>
            <TableRow>
              <TableCell as="th">Name</TableCell>
              <TableCell as="th">Email</TableCell>
              <TableCell as="th">Role</TableCell>
              <TableCell as="th">Company</TableCell>
              <TableCell as="th">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.given_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.companyName ? user.companyName : "N/A"}
                </TableCell>
                <TableCell>
                  <Button
                    variation="link"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <CreateUser
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          onSuccess={handleEditSuccess}
          initialData={selectedUser}
        />
        {/* Edit Company Modal */}
        {isEditCompanyModalOpen && (
          <View
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            zindex={1000}
          >
            <Card
              variation="elevated"
              width="600px"
              padding="large"
              backgroundColor="white"
            >
              <View position="relative">
                <Button
                  onClick={() => setIsEditCompanyModalOpen(false)}
                  size="small"
                  variation="link"
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                >
                  &times;
                </Button>
                <Heading level={3}>Edit Company Information</Heading>

                <form onSubmit={handleUpdateCompany}>
                  <Flex direction="column" gap="medium">
                    <TextField
                      label="Company Name"
                      name="companyName"
                      value={company.name || ""}
                      onChange={(e) =>
                        setEditedCompany({
                          ...editedCompany,
                          name: e.target.value,
                        })
                      }
                      required
                    />

                    <TextField
                      label="Company Address"
                      name="address"
                      value={company.address || ""}
                      onChange={(e) =>
                        setEditedCompany({
                          ...editedCompany,
                          address: e.target.value,
                        })
                      }
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

                    <Flex gap="small" justifyContent="flex-end">
                      <Button
                        onClick={() => setIsEditCompanyModalOpen(false)}
                        variation="destructive"
                        type="button"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" variation="primary">
                        Update Company
                      </Button>
                    </Flex>
                  </Flex>
                </form>
              </View>
            </Card>
          </View>
        )}

        {/* Invite User Modal */}
        {isInviteModalOpen && (
          <View
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            zindex={1000}
          >
            <Card
              variation="elevated"
              width="600px"
              padding="large"
              backgroundColor="white"
            >
              <View position="relative">
                <Button
                  onClick={() => setIsInviteModalOpen(false)}
                  size="small"
                  variation="link"
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                >
                  &times;
                </Button>

                <Heading level={3}>Invite Credentials</Heading>
                <Flex direction="column" gap="medium">
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                  ></Flex>
                  <Text>Company Name: {company?.name || "Not available"}</Text>
                  <Text>
                    Company Secret: {maskCompanySecret(company?.companySecret)}{" "}
                    <Button size="small" onClick={toggleSecretVisibility}>
                      {showSecret ? "Hide" : "Reveal"}
                    </Button>
                  </Text>
                  <Text>
                    Login Portal :{" "}
                    <Link href="https://main.scansew.com" isExternal>
                      https://main.scansew.com
                    </Link>
                  </Text>
                  <Flex direction="column" alignItems="center" gap="medium">
                    <Flex gap="small">
                      <Button
                        onClick={copyInviteCredentials}
                        size="small"
                        variation={copySuccess ? "primary" : "default"}
                      >
                        {copySuccess ? "Copied!" : "Copy Invite"}
                      </Button>
                      <Button onClick={handleMailtoClick} size="small">
                        Email Invite
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              </View>
            </Card>
          </View>
        )}
      </Flex>
    </div>
  );
}

export default Users;
