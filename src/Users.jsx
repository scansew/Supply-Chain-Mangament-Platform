import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listUsers } from './graphql/queries';
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Loader,
} from '@aws-amplify/ui-react';

const client = generateClient();

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const usersData = await client.graphql({
        query: listUsers
      });
      setUsers(usersData.data.listUsers.items);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('An error occurred while fetching users.');
      setLoading(false);
    }
  }

  if (loading) return <Loader variation="linear" />;
  if (error) return <div>{error}</div>;

  return (
    <div className="users-container">
      <h1>Users</h1>
      <Table
        caption=""
        highlightOnHover={true}
        variation="striped"
      >
        <TableHead>
          <TableRow>
            <TableCell as="th">Name</TableCell>
            <TableCell as="th">Email</TableCell>
            <TableCell as="th">Role</TableCell>
            <TableCell as="th">Company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.company ? user.company.name : 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Users;
