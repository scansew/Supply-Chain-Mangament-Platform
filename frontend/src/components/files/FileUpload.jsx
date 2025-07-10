import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFile } from '../../contexts/FileContext';
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  InsertDriveFile as FileIcon,
  Delete as DeleteIcon,
  GetApp as DownloadIcon,
} from '@mui/icons-material';

const FileUpload = ({ onUploadComplete, folder, accept, maxSize = 10, multiple = false }) => {
  const { uploadFile, uploadProgress, isUploading } = useFile();
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    setIsDragging(false);
    if (!acceptedFiles.length) return;

    const uploadedFiles = [];
    for (const file of acceptedFiles) {
      try {
        const result = await uploadFile(file, folder);
        if (result) {
          uploadedFiles.push(result);
          if (onUploadComplete) {
            onUploadComplete(result);
          }
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
    setFiles(prev => [...prev, ...uploadedFiles]);
  }, [uploadFile, folder, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    accept,
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
    multiple,
  });

  const handleDelete = async (fileKey, index) => {
    try {
      await deleteFile(fileKey);
      setFiles(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleDownload = (file) => {
    downloadFile(file.key, file.filename);
  };

  return (
    <Box>
      <Paper
        variant="outlined"
        {...getRootProps()}
        sx={{
          p: 4,
          border: `2px dashed ${isDragging ? 'primary.main' : 'divider'}`,
          backgroundColor: isDragging ? 'action.hover' : 'background.paper',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover',
          },
        }}
      >
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <UploadIcon color="action" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h6" gutterBottom>
            {isDragActive ? 'Drop the files here' : 'Drag & drop files here, or click to select'}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {`Supported formats: ${accept || 'All files'}`}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {`Max size: ${maxSize}MB`}
          </Typography>
        </Box>
      </Paper>

      {isUploading && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="caption" display="block" textAlign="center" mt={1}>
            Uploading... {Math.round(uploadProgress)}%
          </Typography>
        </Box>
      )}

      {files.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Uploaded Files:
          </Typography>
          <List>
            {files.map((file, index) => (
              <ListItem
                key={file.key}
                secondaryAction={
                  <Box>
                    <Tooltip title="Download">
                      <IconButton
                        edge="end"
                        onClick={() => handleDownload(file)}
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        edge="end"
                        onClick={() => handleDelete(file.key, index)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              >
                <ListItemIcon>
                  <FileIcon />
                </ListItemIcon>
                <ListItemText
                  primary={file.filename}
                  secondary={`${(file.size / 1024).toFixed(1)} KB`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;