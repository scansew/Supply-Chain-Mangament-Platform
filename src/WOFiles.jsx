import React, { useState, useEffect } from "react";
import {
  Accordion,
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

function WOFiles() {
      //files
  const [files, setFiles] = useState([]);

  const handleFileChange = async (e) => {
    setFiles(e.target.files);
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
    return (
        <div>
            <h1>WO Files</h1>
          <Accordion
            items={[
              {
                key: "original-videos-images",
                trigger: "Original Videos/Images",
                content: (
                  <View>
                    <FileUploader
                      acceptedFileTypes={["image/*", "videos/*",'application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed']}
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
                      maxFileCount={2000}
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
        </div>
    )
}

export default WOFiles;