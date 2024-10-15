import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listCompanies } from './graphql/queries';
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Loader,
} from '@aws-amplify/ui-react';

const client = generateClient();

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    try {
      const companiesData = await client.graphql({
        query: listCompanies
      });
      setCompanies(companiesData.data.listCompanies.items);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('An error occurred while fetching companies.');
      setLoading(false);
    }
  }

  if (loading) return <Loader variation="linear" />;
  if (error) return <div>{error}</div>;

  return (
    <div className="companies-container">
      <h1>Companies</h1>
      <Table
        caption=""
        highlightOnHover={true}
        variation="striped"
      >
        <TableHead>
          <TableRow>
            <TableCell as="th">Name</TableCell>
            <TableCell as="th">Address</TableCell>
            <TableCell as="th">Phone</TableCell>
            <TableCell as="th">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.address}</TableCell>
              <TableCell>{company.phone}</TableCell>
              <TableCell>{company.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Companies;
