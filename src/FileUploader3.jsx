import React, { useState, useCallback } from "react";
import {
  Button,
  Text,
  Flex,
  View,
  Alert,
  Card,
  Grid,
} from "@aws-amplify/ui-react";
import { uploadData } from "aws-amplify/storage";

const FileUploader3 = ({ onUploadSuccess }) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);
  const [failedUploads, setFailedUploads] = useState(false);

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
        .map((result) => result);
      setUploading(false);
      console.log("failedFiles", failedFiles);
      setFailedUploads(failedFiles);
      if (failedFiles.length === 0) {
        if (typeof onUploadSuccess === "function") {
          onUploadSuccess(results.map((result) => result.key));
        }
      }
      console.log("All uploads completed, failed ", results, failedUploads);
    },
    [uploadFile, files]
  );

  const reuploadFailedFiles = async () => {
    setUploading(true);
    const reuploadedFiles = [];
    const stillFailedFiles = [];

    for (const failedUpload of failedUploads) {
      const result = await uploadFile(failedUpload.file);
      if (result.success) {
        reuploadedFiles.push(result.key);
      } else {
        stillFailedFiles.push({ file: result.file, error: result.error });
      }
    }

    setUploading(false);
    setFailedUploads(stillFailedFiles);

    if (typeof onUploadSuccess === "function") {
      onUploadSuccess(reuploadedFiles);
    }
  };

  return (
    <View>
      <input type="file" multiple onChange={handleFileChange} />
      <Button
        onClick={() => uploadFiles(files)}
        disabled={uploading || files.length === 0}
      >
        Upload Files
      </Button>
      {failedUploads.length > 0 && (
        <View>
          <Alert variation="warning">
            {failedUploads.length} files have not been uploaded, click{" "}
            <span color="red">Retry Upload</span> below.
          </Alert>
          <Button onClick={reuploadFailedFiles} disabled={uploading}>
            Retry Upload
          </Button>
        </View>
      )}

      {uploading === true && (
        <View>
          <Alert variation="info">Uploading {files.length} files</Alert>
        </View>
      )}

      <Grid templateColumns="1fr 1fr" templateRows="1fr" gap="1rem">
        {files.map((file) => (
          <Card key={file.name} padding="0.5rem">
            <Text fontWeight="bold">{file.name}</Text>
            <Flex direction="column" gap="0.5rem">
              <View width="30%" height="10px" backgroundColor="lightgray">
                <View
                  backgroundColor="blue"
                  height="100%"
                  width={`${uploadProgress[file.name] || 0}%`}
                  style={{ transition: "width 0.3s ease-in-out" }}
                />
              </View>
              <Text>{`${Math.round(uploadProgress[file.name] || 0)}%`}</Text>
            </Flex>
          </Card>
        ))}
      </Grid>
    </View>
  );
};

export default FileUploader3;
