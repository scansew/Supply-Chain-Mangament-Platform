import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Button,
  Text,
  Flex,
  View,
  Card,
  Badge,
  Heading,
  Icon,
} from "@aws-amplify/ui-react";
import { uploadData } from "aws-amplify/storage";
import { MdCloudUpload, MdCheckCircle, MdError } from "react-icons/md";

const FileUploader3 = ({ onUploadSuccess }) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);
  const [failedUploads, setFailedUploads] = useState(false);
  const [successUploads, setSuccessUploads] = useState(false);
  const [allUploadsComplete, setAllUploadsComplete] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // useEffect(() => {
  //   if (files.length > 0 && successUploads.length === files.length) {
  //     setAllUploadsComplete(true);
  //     if (allUploadsComplete) {
  //       onUploadSuccess(successUploads);
  //     }
  //   } else {
  //     setAllUploadsComplete(false);
  //   }
  // }, [files, successUploads]);

  const handleProgress = useCallback((fileName, progress) => {
    const percent = (progress.transferredBytes / progress.totalBytes) * 100;
    setUploadProgress((prev) => ({
      ...prev,
      [fileName]: isNaN(percent) ? 0 : Math.round(percent),
    }));
  }, []);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    const initialProgress = selectedFiles.reduce((acc, file) => {
      acc[file.name] = 0;
      return acc;
    }, {});
    setUploadProgress(initialProgress);
    setSuccessUploads([]);
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    const initialProgress = droppedFiles.reduce((acc, file) => {
      acc[file.name] = 0;
      return acc;
    }, {});
    setUploadProgress(initialProgress);
    setSuccessUploads([]);
  };
  const uploadFile = useCallback(
    (file) => {
      return new Promise(async (resolve, reject) => {
        try {
          const key = `${Date.now()}_${file.name}`;

          const upload = uploadData({
            key: key,
            data: file,
            options: {
              accessLevel: "public",
              contentType: file.type,
              useAccelerateEndpoint: true, // Enable transfer acceleration
              onProgress: (progress) => handleProgress(file.name, progress),
            },
          });

          const result = await upload.result;
          console.log(`File upload completed: ${file.name}`);
          resolve({ success: true, key, file, result });
        } catch (error) {
          console.error(`Upload failed for file ${file.name}:`, error);
          resolve({ success: false, file, error: error.message });
        }
      });
    },
    [handleProgress]
  );

  const uploadFiles = useCallback(
    async (files) => {
      setFailedUploads([]); // Reset the failedUploads state
      setUploading(true);
      const uploadPromises = files.map((file) => uploadFile(file));
      const results = await Promise.all(uploadPromises);

      // Update the failedUploads state with the files that failed to upload
      const failedFiles = await results
        .filter((result) => !result.success)
        .map((result) => result.file);

      const successFiles = await results
        .filter((result) => result.success)
        .map((result) => result);

      setUploading(false);
      setFailedUploads(failedFiles);
      setSuccessUploads(successFiles);

      if (failedFiles.length === 0) {
        if (typeof onUploadSuccess === "function") {
          onUploadSuccess(results.map((result) => result.key));
        }
      }
      console.log("All uploads completed, failed ", results);
    },
    [uploadFile, files]
  );

  const reuploadFailedFiles = async () => {
    await uploadFiles(failedUploads);
  };

  return (
    <Card variation="elevated" padding="1.5rem">
      <Flex direction="column" gap="1rem">
        <View
          as="div"
          padding="2rem"
          backgroundColor={
            isDragging ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.05)"
          }
          borderRadius="8px"
          border={isDragging ? "2px dashed #007bff" : "2px dashed #ccc"}
          textAlign="center"
          cursor="pointer"
          onClick={() => fileInputRef.current.click()}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Icon as={MdCloudUpload} fontSize="3rem" color="#666" />
          <Text>
            {isDragging
              ? "Drop files here"
              : "Drag and drop files here or click to select files"}
          </Text>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </View>

        <Flex justifyContent="space-between" alignItems="center">
          <Button
            onClick={() => uploadFiles(files)}
            disabled={uploading || files.length === 0}
            variation="primary"
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </Button>

          {failedUploads.length > 0 && (
            <Button
              onClick={() => reuploadFailedFiles()}
              disabled={uploading}
              variation="warning"
            >
              Retry Failed Uploads
            </Button>
          )}
          {uploading && <Badge variation="info">Uploading file(s)</Badge>}

          {failedUploads.length === 0 &&
            successUploads.length === files.length && (
              <Badge variation="success">
                All files have been successfully uploaded!
              </Badge>
            )}
        </Flex>
        {files.length > 0 && (
          <Card>
            <Heading level={5}>Selected Files</Heading>
            <View className="file-grid">
              {files.map((file) => (
                <Card key={file.name} padding="1rem" className="file-card">
                  <Flex direction="column" gap="0.5rem">
                    <Text fontWeight="bold" fontSize="0.9rem">
                      {file.name}
                    </Text>
                    <View height="4px" backgroundColor="lightgray">
                      <View
                        backgroundColor="blue"
                        height="100%"
                        width={`${uploadProgress[file.name] || 0}%`}
                        style={{ transition: "width 0.3s ease-in-out" }}
                      />
                    </View>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Text fontSize="0.8rem">{`${Math.round(
                        uploadProgress[file.name] || 0
                      )}%`}</Text>
                      {uploadProgress[file.name] === 100 ? (
                        <Icon as={MdCheckCircle} color="green" />
                      ) : failedUploads.length > 0 &&
                        successUploads.length < files.length ? (
                        <Icon as={MdError} color="red" />
                      ) : null}
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </View>
          </Card>
        )}
      </Flex>
    </Card>
  );
};

export default FileUploader3;
