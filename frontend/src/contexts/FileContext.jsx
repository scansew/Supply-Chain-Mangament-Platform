import { createContext, useContext, useState, useCallback } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useSnackbar } from 'notistack';

// GraphQL mutations
const UPLOAD_FILE = gql`
  mutation SingleUpload($file: Upload!, $folder: String) {
    singleUpload(file: $file, folder: $folder) {
      id
      filename
      mimetype
      encoding
      url
      key
      size
      createdAt
    }
  }
`;

const DELETE_FILE = gql`
  mutation DeleteFile($key: String!) {
    deleteFile(key: $key)
  }
`;

const GET_FILE_URL = gql`
  query GetFileUrl($key: String!) {
    getFileUrl(key: $key)
  }
`;

const FileContext = createContext({});

export function FileProvider({ children }) {
  const { enqueueSnackbar } = useSnackbar();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Upload file mutation
  const [uploadFileMutation] = useMutation(UPLOAD_FILE, {
    onError: (error) => {
      console.error('Upload error:', error);
      enqueueSnackbar('Failed to upload file', { variant: 'error' });
    },
    onCompleted: (data) => {
      enqueueSnackbar('File uploaded successfully', { variant: 'success' });
    },
  });

  // Delete file mutation
  const [deleteFileMutation] = useMutation(DELETE_FILE, {
    onError: (error) => {
      console.error('Delete error:', error);
      enqueueSnackbar('Failed to delete file', { variant: 'error' });
    },
    onCompleted: () => {
      enqueueSnackbar('File deleted successfully', { variant: 'success' });
    },
  });

  /**
   * Upload a file to the server
   * @param {File} file - The file to upload
   * @param {string} [folder] - Optional folder to organize files
   * @returns {Promise<Object>} The uploaded file data
   */
  const uploadFile = useCallback(async (file, folder) => {
    if (!file) {
      throw new Error('No file provided');
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const result = await uploadFileMutation({
        variables: { file, folder },
        context: {
          headers: {
            'Apollo-Require-Preflight': 'true', // Required for file uploads
          },
        },
      });
      
      return result.data?.singleUpload;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [uploadFileMutation]);

  /**
   * Delete a file from the server
   * @param {string} key - The file key to delete
   * @returns {Promise<boolean>} True if deletion was successful
   */
  const deleteFile = useCallback(async (key) => {
    if (!key) {
      throw new Error('No file key provided');
    }

    try {
      const result = await deleteFileMutation({
        variables: { key },
      });
      
      return result.data?.deleteFile === true;
    } catch (error) {
      console.error('Delete failed:', error);
      throw error;
    }
  }, [deleteFileMutation]);

  /**
   * Download a file from the server
   * @param {string} key - The file key to download
   * @param {string} filename - The desired filename for the download
   */
  const downloadFile = useCallback(async (key, filename) => {
    if (!key) {
      throw new Error('No file key provided');
    }

    try {
      // Get the signed URL for the file
      const { data } = await client.query({
        query: GET_FILE_URL,
        variables: { key },
        fetchPolicy: 'network-only', // Always fetch fresh URL
      });

      const url = data?.getFileUrl;
      if (!url) {
        throw new Error('Failed to get file URL');
      }

      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      enqueueSnackbar('Failed to download file', { variant: 'error' });
      throw error;
    }
  }, []);

  return (
    <FileContext.Provider
      value={{
        uploadFile,
        deleteFile,
        downloadFile,
        uploadProgress,
        isUploading,
      }}
    >
      {children}
    </FileContext.Provider>
  );
}

export const useFile = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFile must be used within a FileProvider');
  }
  return context;
};

export default FileContext;
