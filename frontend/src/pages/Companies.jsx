/**
 * Companies Component
 * This component displays a list of companies and allows users to create or edit companies.
 * It fetches company data from AWS Amplify and provides a UI for managing company information.
 */

import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { listCompanies } from "../graphql/queries";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Loader,
  Button,
  Flex,
} from "@aws-amplify/ui-react";
import CreateCompany from "./createCompany";

const client = generateClient();

/**
 * Main component function
 * @param {Object} props - Component props
 * @param {Object} props.SSuser - Current authenticated user object
 */
function Companies({ SSuser }) {
  // State to store fetched companies
  const [companies, setCompanies] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to store error messages
  const [error, setError] = useState(null);
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to store selected company for editing
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  /**
   * Fetch companies from the server
   */
  async function fetchCompanies() {
    try {
      const companiesData = await client.graphql({
        query: listCompanies,
      });
      setCompanies(companiesData.data.listCompanies.items);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching companies:", err);
      setError("An error occurred while fetching companies.");
      setLoading(false);
    }
  }

  /**
   * Handle create button click
   */
  const handleCreateClick = () => {
    setSelectedCompany(null);
    setIsModalOpen(true);
  };

  /**
   * Handle edit button click
   * @param {Object} company - Company object to edit
   */
  const handleEditClick = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  /**
   * Handle success callback from CreateCompany component
   * @param {Object} updatedCompany - Updated company object
   */
  const handleSuccess = (updatedCompany) => {
    if (selectedCompany) {
      // Update existing company
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company.id === updatedCompany.id ? updatedCompany : company
        )
      );
    } else {
      // Add new company
      setCompanies((prevCompanies) => [...prevCompanies, updatedCompany]);
    }
  };

  if (loading) return <Loader variation="linear" />;
  if (error) return <div>{error}</div>;

  return (
    <div className="companies-container">
      <Flex direction="column" padding="medium">
        <Flex justifyContent="space-between" alignItems="center">
          <h1>Companies</h1>
          <Button variation="primary" onClick={handleCreateClick}>
            Add Company
          </Button>
        </Flex>

        <Table caption="" highlightOnHover={true} variation="striped">
          <TableHead>
            <TableRow>
              <TableCell as="th">Company Name</TableCell>
              <TableCell as="th">Address</TableCell>
              <TableCell as="th">Company Secret</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.address}</TableCell>
                <TableCell>{company.companySecret}</TableCell>

                <TableCell>
                  <Button
                    variation="link"
                    onClick={() => handleEditClick(company)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <CreateCompany
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCompany(null);
          }}
          onSuccess={handleSuccess}
          initialData={selectedCompany}
        />
      </Flex>
    </div>
  );
}

export default Companies;
