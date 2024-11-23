/**
 * FileUploader3 Component
 * This component provides functionality to upload files to an AWS S3 bucket.
 * It allows users to select files and upload them with progress tracking.
 */

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

/**
 * Main component function
 * @param {Object} props - Component props
 * @param {Function} props.onUploadSuccess - Callback function to handle successful uploads
 * @param {string} props.workorderNumber - Work order number for file categorization
 * @param {Object} props.SSuser - Current authenticated user object
 * @param {string} props.type - File type for categorization
 */
const FileUploader3 = ({ onUploadSuccess, workorderNumber, SSuser, type }) => {
  // State to track selected files
  const [files, setFiles] = useState([]);
  // State to track upload progress for each file
  const [uploadProgress, setUploadProgress] = useState({});
  // State to track uploading status
  const [uploading, setUploading] = useState(false);
  // State to track failed uploads
  const [failedUploads, setFailedUploads] = useState(false);
  // State to track successful uploads
  const [successUploads, setSuccessUploads] = useState(false);
  // State to track if all uploads are complete
  const [allUploadsComplete, setAllUploadsComplete] = useState(false);
  // State to track drag-and-drop status
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log("Work Order Number is", workorderNumber);
  }, []);

  /**
   * Handle progress of file upload
   * @param {string} fileName - Name of the file being uploaded
   * @param {Object} progress - Progress object containing transferred and total bytes
   */
  const handleProgress = useCallback((fileName, progress) => {
    const percent = (progress.transferredBytes / progress.totalBytes) * 100;
    setUploadProgress((prev) => ({
      ...prev,
      [fileName]: isNaN(percent) ? 0 : Math.round(percent),
    }));
  }, []);

  /**
   * Handle file selection
   * @param {Event} event - File input change event
   */
  const handleFileChange = (event) => {
    if (event.target.files.length > 2000) {
      alert("You can only upload 2000 files at a time");
      return;
    }
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    const initialProgress = selectedFiles.reduce((acc, file) => {
      acc[file.name] = 0;
      return acc;
    }, {});
    setUploadProgress(initialProgress);
    setSuccessUploads([]);
  };

  /**
   * Handle drag enter event
   * @param {Event} e - Drag event
   */
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  /**
   * Handle drag leave event
   * @param {Event} e - Drag event
   */
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  /**
   * Handle drag over event
   * @param {Event} e - Drag event
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Handle drop event
   * @param {Event} e - Drop event
   */
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

  /**
   * Upload a single file to S3
   * @param {File} file - File object to upload
   * @returns {Promise<Object>} - Promise resolving to upload result
   */
  const uploadFile = useCallback(
    (file) => {
      return new Promise(async (resolve, reject) => {
        try {
          const key = `companies/${
            SSuser.companyId
          }/${workorderNumber}/${type}/${Date.now()}_${file.name}`;
          const upload = uploadData({
            key: key,
            data: file,
            options: {
              accessLevel: "public",
              contentType: file.type,
              useAccelerateEndpoint: true, // Enable transfer acceleration
              onProgress: (progress) => handleProgress(file.name, progress),
              metadata: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*", // Be cautious with this in production
                companyId: SSuser.companyId,
                uploaderId: SSuser.username,
              },
              // customPrefix: {
              //   public: "",
              // },
              headers: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*", // Be cautious with this in production
              },
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

  /**
   * Upload multiple files to S3
   * @param {Array<File>} files - Array of File objects to upload
   */
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

  /**
   * Re-upload failed files
   */
  const reuploadFailedFiles = async () => {
    await uploadFiles(failedUploads);
  };

  /**
   * Calculate total upload progress
   * @returns {number} - Total upload progress percentage
   */
  const calculateTotalProgress = () => {
    const totalBytes = files.reduce((acc, file) => acc + file.size, 0);
    const uploadedBytes = files.reduce((acc, file) => {
      const fileProgress = uploadProgress[file.name] || 0;
      return acc + (file.size * fileProgress) / 100;
    }, 0);

    if (totalBytes === 0) return 0;
    return Math.round((uploadedBytes / totalBytes) * 100);
  };

  return (
    <Flex direction="column" gap="1rem">
      <View
        as="div"
        padding="3rem"
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
        {failedUploads.length > 0 && (
          <Button
            onClick={() => reuploadFailedFiles()}
            disabled={uploading}
            variation="warning"
          >
            Retry Failed Uploads
          </Button>
        )}

        {failedUploads.length === 0 &&
          successUploads.length === files.length && (
            <Badge variation="success">
              All files have been successfully uploaded!
            </Badge>
          )}
        {uploading && (
          <div>
            <Badge variation="info">Uploading file(s).</Badge>
          </div>
        )}
      </Flex>
      {successUploads.length < files.length && files.length > 0 && (
        <Card>
          <p>{files.length} file(s) selected for upload </p>
          <View height="4px" backgroundColor="lightgray">
            <View
              backgroundColor="#00a8cc"
              height="100%"
              width={`${calculateTotalProgress()}%`}
              style={{ transition: "width 0.3s ease-in-out" }}
            />
          </View>
          {files.length > 0 && calculateTotalProgress()}% done
        </Card>
      )}
      <Button
        onClick={() => uploadFiles(files)}
        disabled={uploading || files.length === 0}
        variation="primary"
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </Button>
    </Flex>
  );
};

export default FileUploader3;
