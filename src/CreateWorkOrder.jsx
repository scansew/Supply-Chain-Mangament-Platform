import React, { useState, useEffect } from "react";
import {
  Accordion,
  Card,
  Grid,
  Collection,
  View,
  Flex,
  Badge,
  Divider,
  Heading,
  Text,
  Button,
  Image,
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

import {
  Frame1171275594 
 } from './ui-components';
// import './WO.css';

function WorkOrder({}) {
  const [files, setFiles] = useState([]);

  const handleFileChange = async (e) => {
    // setFiles(e.target.files);
    await fetchImages();
  };

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  console.log(images);
  async function fetchImages() {
    try {
      console.log("here");
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
      title: "Milford - Room #2",
      badges: ["Mountain", "Verified"],
    },
    {
      title: "Milford - Room #2",
      badges: ["Mountain", "Verified"],
    },
    {
      title: "Milford - Room #2",
      badges: ["Mountain", "Verified"],
    },
    {
      title: "Milford - Room #2",
      badges: ["Mountain", "Verified"],
    },
    {
      title: "Milford - Room #2",
      badges: ["Mountain", "Verified"],
    },
  ];

  return (
    <div>
      <Grid templateColumns="1fr 4fr" columnGap="0.5rem">
        <Card columnStart="1" columnEnd="2" variation="outlined">
          <Collection
            items={items}
            type="list"
            direction="column"
            gap="20px"
            wrap="nowrap"
          >
            {(item, index) => (
               
               <Frame1171275594 />
            )}
          </Collection>
        </Card>
        <Card columnStart="2" columnEnd="-1">
          <div className="accordion-container">
            <Accordion
              items={[
                {
                  trigger: "Original Videos/Images",
                  content: (
                    <View>
                      <FileUploader
                        acceptedFileTypes={["image/*", "videos/*"]}
                        path="public/"
                        maxFileCount={2000}
                        onUploadSuccess={handleFileChange}
                        isResumable
                      />

                      {files.length > 0 && (
                        <Text>Selected files: {files.length}</Text>
                      )}
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
                                <View
                                  width="100px"
                                  height="100px"
                                  overflow="hidden"
                                >
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
                                  ? new Date(
                                      image.lastModified
                                    ).toLocaleString()
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
                    </View>
                  ),
                },
                {
                  trigger: "Main 2D Pattern",
                  content: (
                    <View>
                      <FileUploader
                        acceptedFileTypes={["image/*",'application/pdf']}
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
                  trigger: "CNC 2D Pattern",
                  content: (
                    <View>
                      <FileUploader
                        acceptedFileTypes={["*.project","*.dxf"]}
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
          </div>
        </Card>
      </Grid>
    </div>
  );
}
export default WorkOrder;
