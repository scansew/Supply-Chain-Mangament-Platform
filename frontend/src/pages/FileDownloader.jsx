/**
 * S3Downloader Component
 * This component provides functionality to download files from an AWS S3 bucket.
 * It lists files in a specified folder and allows users to download them with progress tracking.
 */

import React, { useState } from "react";
import { list, getUrl } from "aws-amplify/storage";
import { Button } from "@aws-amplify/ui-react";

/**
 * Main component function
 * @param {Object} props - Component props
 * @param {string} props.filesFolder - Folder path in S3 to download files from
 */
const S3Downloader = ({ filesFolder }) => {
  // State to track downloading status
  const [downloading, setDownloading] = useState(false);
  // State to track download progress
  const [progress, setProgress] = useState(0);

  /**
   * Download files from S3
   */
  const downloadFiles = async () => {
    try {
      setDownloading(true);
      // List all files in Storage
      const fileList = await list({
        path: filesFolder,
        options: {
          accessLevel: "public",
          listAll: true,
        },
      });
      const totalFiles = fileList.items.length;
      console.log("Files Folder is", filesFolder, fileList);

      let downloadedFiles = 0;

      // Download each file
      for (const item of fileList.items) {
        try {
          if (!item.path.endsWith("/")) {
            // Skip folders
            // Get the signed URL for the file
            const { url } = await getUrl({
              path: item.path,
              options: {
                validateObjectExistence: true,
              },
            });
            // Download file using fetch
            const response = await fetch(url);
            const blob = await response.blob();

            // Create download link
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = item.path.split("/").pop(); // Extract filename from key
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
            document.body.removeChild(a);

            downloadedFiles++;
            setProgress((downloadedFiles / totalFiles) * 100);
          }
        } catch (error) {
          console.error(`Error downloading file ${item.path}:`, error);
        }
      }

      alert("Download completed successfully!");
    } catch (error) {
      console.error("Error downloading files:", error);
      alert("Error downloading files. Check console for details.");
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button
      size ="small"
        onClick={downloadFiles}
        isLoading={downloading}
        loadingText="Downloading..."
        variation="primary"
        isDisabled={downloading}
      >
        Download
      </Button>

      {downloading && (
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              width: "100%",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "20px",
                backgroundColor: "#007bff",
                transition: "width 0.3s ease-in-out",
              }}
            />
          </div>
          <p>{Math.round(progress)}% Complete</p>
        </div>
      )}
    </div>
  );
};

export default S3Downloader;
