import React, { useState, useEffect } from "react";
import {
  Accordion,
  View,
  Text,
  Button,
  withAuthenticator,
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
import { createFile } from "../graphql/mutations";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

function CreateWOFiles({ onFilesChange, user }) {
  function getFileType(extension) {
    const mimeTypes = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      mp4: "video/mp4",
      mov: "video/quicktime",
      zip: "application/zip",
      rar: "application/x-rar-compressed",
      "7z": "application/x-7z-compressed",
      // Add more mappings as needed
    };
    return mimeTypes[extension] || "application/octet-stream";
  }

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  const handleFileChange = async (event) => {
    setFiles(event);

    console.log("Upload event:", event);

    if (event && event.key) {
      console.log("Uploaded file key:", event.key);

      // Extract file name and extension from the key
      const fileName = event.key.split("/").pop();
      const fileExtension = fileName.split(".").pop().toLowerCase();

      // Infer file type from extension
      const fileType = getFileType(fileExtension);
      console.log("Inferred file and file type:", event.key, fileExtension);

      // You can now use fileType in your createNewFile function or elsewhere
      await createNewFile(event, fileName, fileType);
      await fetchImages();
    }
  };

  async function createNewFile(event, fileName, fileType) {
    console.log("user is : ", user);
    try {
      const fileDetails = {
        workOrderId: "SOME_WORK_ORDER_ID", // You need to provide this
        fileType: fileType, // Use the file's MIME type
        url: event, // The S3 URL of the uploaded file
        uploadedBy: user.username, // You need to provide the current user's identifier
      };

      const input = {
        input: fileDetails,
      };

      const newFile = await client.graphql({
        query: createFile,
        variables: input,
      });

      console.log("New file created:", newFile.data.createFile);
      return newFile.data.createFile;
    } catch (error) {
      console.error("Error creating file:", error);
      throw error;
    }
  }

  async function fetchImages() {
    try {
      const imageList = await list({
        path: "public/",
        options: {
          listAll: true,
        },
      });
      setImages(imageList.items);
      onFilesChange(imageList.items);
      console.log(
        "Images:",
        imageList.items.map((file) => file)
      );
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
      <View>
        <FileUploader
          acceptedFileTypes={[
            "image/*",
            "videos/*",
            "application/zip",
            "application/x-rar-compressed",
            "application/x-7z-compressed",
          ]}
          path="public/"
          maxFileCount={100}
          onUploadSuccess={handleFileChange}
          isResumable
        />

        {files.length > 0 && <Text>Selected files: {files.length}</Text>}
      </View>

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
                {image.size ? `${(image.size / 1024).toFixed(2)} KB` : "N/A"}
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
  );
}

export default withAuthenticator(CreateWOFiles);
