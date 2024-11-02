// Companies.jsx
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

function Companies({ SSuser }) {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

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

  const handleCreateClick = () => {
    setSelectedCompany(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

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
