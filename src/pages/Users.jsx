// Users.jsx
import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { listUsers } from "../graphql/queries";
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

  useEffect(() => {
    fetchUsers();
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
              role: {
                eq: "emp",
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
  };

  const handleSearchUser = async (e) => {
    e.preventDefault();
    if (!inviteEmail || !inviteEmail.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      // Add your user search logic here
      console.log("Searching for user with email:", inviteEmail);
      // Example API call:
      // const response = await searchUserByEmail(inviteEmail);
      // if (response.exists) {
      //   // Handle existing user
      // } else {
      //   // Handle new user invitation
      // }
    } catch (error) {
      console.error("Error searching user:", error);
      alert("Error searching for user");
    }
  };

  if (loading) return <Loader variation="linear" />;
  if (error) return <div>{error}</div>;

  return (
    <div className="users-container">
      <Flex direction="column" padding="medium">
        <Flex justifyContent="space-between" alignItems="center">
          <h1>Users</h1>
          <Button variation="primary" onClick={handleInviteClick}>
            Invite User
          </Button>
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
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.companyId ? user.companyId : "N/A"}
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
              width="400px"
              padding="large"
              backgroundColor="white"
            >
              <Flex direction="column" gap="medium">
                <Heading level={3}>Invite User</Heading>
                <form onSubmit={handleSearchUser}>
                  <Flex direction="column" gap="medium">
                    <TextField
                      label="Email Address"
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="Enter email address"
                      required
                    />
                    <Flex gap="medium" justifyContent="flex-end">
                      <Button
                        onClick={() => {
                          setIsInviteModalOpen(false);
                          setInviteEmail("");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button variation="primary" type="submit">
                        Search
                      </Button>
                    </Flex>
                  </Flex>
                </form>
              </Flex>
            </Card>
          </View>
        )}
      </Flex>
    </div>
  );
}

export default Users;
