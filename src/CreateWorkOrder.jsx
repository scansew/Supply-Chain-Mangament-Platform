import React, { useState, useEffect } from "react";
import {
  Accordion,
  Card,
  Grid,
  Collection,
  View,
  Text,
  Button,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { FileUploader, StorageImage } from "@aws-amplify/ui-react-storage";
import { list, remove, getUrl } from "aws-amplify/storage";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from "@aws-amplify/ui-react";

import { Frame1171275594 } from "./ui-components";
// import './WO.css';
import { generateClient } from "aws-amplify/api";
import { listCompanies } from "./graphql/queries";
import { createCompany,createUser,createWorkOrder, createWorkOrderCounter,incrementCounter } from './graphql/mutations';

function WorkOrder({}) {
  const client = generateClient();
  useEffect(() => {
    generateWorkOrderNumber();
    // createNewCompany();
    // fetchCompanies();
    // createNewWOCounter();
    // createNewWorkOrder();
    // fetchWorkOrders();

    // createNewUser();
    // fetchUsers();
  }, []);

  const fetchCompanies = async () => {
    try {
      const companyData = await client.graphql({
        query: listCompanies,
      });
      console.log("companies:", companyData.data.listCompanies.items);
      return companyData.data.listCompanies.items;
    } catch (err) {
      console.log("error fetching companies", err);
    }
  };
  async function createNewWOCounter() {
    try {
      const counterDetails = {
        counterName: "workOrderNumber",
        currentValue: 1100,
      };
      const input = {
        input: counterDetails,
        // Add condition if needed
        // condition: { /* ... */ }
      };

      const newCounter = await client.graphql({
        query: createWorkOrderCounter,
        variables: input,
      });
    } catch (error) {
      console.error("Error creating WO Counter:", error);
    }
  }
  async function createNewCompany() {
    try {
      const companyDetails = {
        name: "Acme Inc.",
        address: "123 Main St, Anytown USA",
        stripeConnectId: "acct_123456789",
      };
      const input = {
        input: companyDetails,
        // Add condition if needed
        // condition: { /* ... */ }
      };

      const newCompany = await client.graphql({
        query: createCompany,
        variables: input,
      });
    } catch (error) {
      console.error("Error creating company:", error);
    }
  }
  async function generateWorkOrderNumber() {
    try {
      const result = await client.graphql({
        query: incrementCounter,
        variables: { counterName: "workOrderNumber" }
      });
      
      const newWorkOrderNumber = result.data.incrementCounter;
      console.log('New work order number:', newWorkOrderNumber);
      return newWorkOrderNumber;
    } catch (error) {
      console.error('Error generating work order number:', error);
      throw error;
    }
  }
  async function createNewWorkOrder() {
    const updWONumber = await generateWorkOrderNumber();
    try {
      const workOrderDetails = {
        type: "Boat",
        status: "PENDING",
        woNumber: updWONumber,
        createdById: "d2c63597-621c-4ee6-9ed3-02dd82a5feda",
        assignedToId: "d2c63597-621c-4ee6-9ed3-02dd82a5feda",
        companyId: "c76be88d-e565-40b5-9ffa-31c686d8fc98",
        process: "true",
        // Add other fields as per your schema
      };
  
      const input = {
        input: workOrderDetails,
        // Add condition if needed
        // condition: { /* ... */ }
      };
  
      const newWorkOrder = await client.graphql({
        query: createWorkOrder,
        variables: input,
      });
  
      console.log("New work order created:", newWorkOrder.data.createWorkOrder);
      return newWorkOrder.data.createWorkOrder;
    } catch (error) {
      console.error("Error creating work order:", error);
      throw error;
    }
  }

  async function createNewUser() {
    try {
      const userDetails = {
        username: "johndoe",
        email: "john.doe@example.com",
        passwordHash: "John",
      };
  
      const input = {
        input: userDetails,
        // Add condition if needed
        // condition: { /* ... */ }
      };
  
      const newUser = await client.graphql({
        query: createUser,
        variables: input,
      });
  
      console.log("New user created:", newUser.data.createUser);
      return newUser.data.createUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  //files
  const [files, setFiles] = useState([]);

  const handleFileChange = async (e) => {
    // setFiles(e.target.files);
    await fetchImages();
  };

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const imageList = await list({
        path: "public/",
        options: {
          listAll: true,
        },
      });
      setImages(imageList.items);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }

  async function handleDelete(key) {
    try {
      await remove({
        path: key,
      });
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }

  async function handleDownload(key) {
    try {
      const getUrlResult = await getUrl({
        path: key,
        options: {
          validateObjectExistence: true,
          expiresIn: 3600, // URL will be valid for 1 hour
        },
      });
      // Fetch the image as a blob
      const response = await fetch(getUrlResult.url);
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = key.split("/").pop(); // Set the download filename to the last part of the key
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      console.log("Download URL:", getUrlResult.url);
      console.log("URL expires at:", getUrlResult.expiresAt);
    } catch (error) {
      console.error("Error generating download URL:", error);
    }
  }

  const items = [
    {
      title: "Milford - Room #1",
      badges: ["Waterfront", "Verified"],
    },
    {
      title: "Milford - Room #21",
      badges: ["Mountain", "Verified"],
    },
    {
      title: "Milford - Room #22",
      badges: ["Mountain", "Verified"],
    },
    {
      title: "Milford - Room #23",
      badges: ["Mountain", "Verified"],
    },
    {
      title: "Milford - Room #42",
      badges: ["Mountain", "Verified"],
    },
    {
      title: "Milford - Room #52",
      badges: ["Mountain", "Verified"],
    },
  ];

  return (
    <>
      {/* {fetchCompanies} */}
      <Grid templateColumns="1fr 4fr" columnGap="1rem">
        <Card columnStart="1" columnEnd="2" variation="outlined">
          <Collection
            items={items}
            type="list"
            direction="column"
            gap="20px"
            wrap="nowrap"
          >
            {(item, index) => <Frame1171275594 key={item.title || index} />}
          </Collection>
        </Card>
        <Card columnStart="2" columnEnd="-1">
          <Accordion
            items={[
              {
                key: "original-videos-images",
                trigger: "Original Videos/Images",
                content: (
                  <View>
                    <FileUploader
                      acceptedFileTypes={["image/*", "videos/*"]}
                      path="public/"
                      maxFileCount={100}
                      onUploadSuccess={handleFileChange}
                      isResumable
                    />

                    {files.length > 0 && (
                      <Text>Selected files: {files.length}</Text>
                    )}
                  </View>
                ),
              },
              {
                key: "main-2d-pattern",
                trigger: "Main 2D Pattern",
                content: (
                  <View>
                    <FileUploader
                      acceptedFileTypes={["image/*", "application/pdf"]}
                      path="public/"
                      maxFileCount={100}
                      onUploadSuccess={handleFileChange}
                      isResumable
                    />

                    {files.length > 0 && (
                      <Text>Selected files: {files.length}</Text>
                    )}
                  </View>
                ),
              },
              {
                key: "cnc-2d-pattern",
                trigger: "CNC 2D Pattern",
                content: (
                  <View>
                    <FileUploader
                      acceptedFileTypes={["*.project", "*.dxf"]}
                      path="public/"
                      maxFileCount={100}
                      onUploadSuccess={handleFileChange}
                      isResumable
                    />

                    {files.length > 0 && (
                      <Text>Selected files: {files.length}</Text>
                    )}
                  </View>
                ),
              },
            ]}
          />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell as="th">Preview</TableCell>
                <TableCell as="th">File Name</TableCell>
                <TableCell as="th">Size</TableCell>
                <TableCell as="th">Last Modified</TableCell>
                <TableCell as="th">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {images.map((image) => (
                <TableRow key={image.path}>
                  <TableCell>
                    <View width="100px" height="100px" overflow="hidden">
                      <StorageImage
                        path={image.path}
                        alt={image.path}
                        width="100%"
                        height="100%"
                      />
                    </View>
                  </TableCell>
                  <TableCell>{image.path}</TableCell>
                  <TableCell>
                    {image.size
                      ? `${(image.size / 1024).toFixed(2)} KB`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {image.lastModified
                      ? new Date(image.lastModified).toLocaleString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(image.path)}
                      marginRight="5px"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleDownload(image.path)}
                      variation="primary"
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Grid>
    </>
  );
}
export default WorkOrder;
