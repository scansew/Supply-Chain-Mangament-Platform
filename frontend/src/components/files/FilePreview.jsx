import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import {
  InsertDriveFile as FileIcon,
  GetApp as DownloadIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
  TableChart as XlsIcon,
  FolderZip as ZipIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useFile } from '../../contexts/FileContext';
import { formatFileSize } from '../../utils/fileUtils';

const FileIconComponent = ({ mimeType }) => {
  if (!mimeType) return <FileIcon />;
  
  const type = mimeType.split('/')[0];
  
  switch (type) {
    case 'image':
      return <ImageIcon />;
    case 'application':
      if (mimeType.includes('pdf')) return <PdfIcon />;
      if (mimeType.includes('word') || mimeType.includes('document')) return <DocIcon />;
      if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return <XlsIcon />;
      if (mimeType.includes('zip') || mimeType.includes('compressed')) return <ZipIcon />;
      return <FileIcon />;
    default:
      return <FileIcon />;
  }
};

FileIconComponent.propTypes = {
  mimeType: PropTypes.string,
};

const FilePreview = ({
  file,
  onDelete,
  onDownload,
  showActions = true,
  showSize = true,
  dense = false,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);
  const { downloadFile: downloadFileUtil } = useFile();

  const handleDownload = async () => {
    if (!onDownload && !downloadFileUtil) return;
    
    try {
      setIsDownloading(true);
      setError(null);
      
      if (onDownload) {
        await onDownload(file);
      } else {
        await downloadFileUtil(file.key, file.filename);
      }
    } catch (err) {
      console.error('Download failed:', err);
      setError('Failed to download file');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    
    try {
      setIsDeleting(true);
      setError(null);
      await onDelete(file);
    } catch (err) {
      console.error('Delete failed:', err);
      setError('Failed to delete file');
      setIsDeleting(false);
    }
  };

  const secondaryText = [];
  if (showSize && file.size) {
    secondaryText.push(formatFileSize(file.size));
  }
  if (file.createdAt) {
    secondaryText.push(new Date(file.createdAt).toLocaleDateString());
  }

  return (
    <Paper variant="outlined" sx={{ width: '100%', mb: 1 }}>
      <List dense={dense}>
        <ListItem
          secondaryAction={
            showActions && (
              <Box>
                <Tooltip title="Download">
                  <span>
                    <IconButton
                      edge="end"
                      aria-label="download"
                      onClick={handleDownload}
                      disabled={isDownloading || isDeleting}
                      size="small"
                    >
                      {isDownloading ? <CircularProgress size={24} /> : <DownloadIcon />}
                    </IconButton>
                  </span>
                </Tooltip>
                {onDelete && (
                  <Tooltip title="Delete">
                    <span>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={handleDelete}
                        disabled={isDeleting || isDownloading}
                        size="small"
                        color="error"
                      >
                        {isDeleting ? <CircularProgress size={24} /> : <DeleteIcon />}
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
              </Box>
            )
          }
        >
          <ListItemIcon>
            <FileIconComponent mimeType={file.mimetype} />
          </ListItemIcon>
          <ListItemText
            primary={file.filename || 'Untitled File'}
            secondary={secondaryText.join(' • ')}
            primaryTypographyProps={{
              noWrap: true,
              style: {
                maxWidth: '300px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
          />
        </ListItem>
        {error && (
          <Box sx={{ px: 2, pb: 1 }}>
            <Typography variant="caption" color="error">
              <ErrorIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
              {error}
            </Typography>
          </Box>
        )}
      </List>
    </Paper>
  );
};

FilePreview.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    filename: PropTypes.string,
    mimetype: PropTypes.string,
    size: PropTypes.number,
    key: PropTypes.string,
    url: PropTypes.string,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  }).isRequired,
  onDelete: PropTypes.func,
  onDownload: PropTypes.func,
  showActions: PropTypes.bool,
  showSize: PropTypes.bool,
  dense: PropTypes.bool,
};

export default FilePreview;
