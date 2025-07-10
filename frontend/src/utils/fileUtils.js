/**
 * Utility functions for file operations
 */

/**
 * Formats file size in a human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size (e.g., '2.5 MB')
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Gets the appropriate icon for a file based on its MIME type
 * @param {string} mimeType - The MIME type of the file
 * @returns {string} The name of the Material-UI icon to use
 */
export const getFileIcon = (mimeType) => {
  if (!mimeType) return 'InsertDriveFile';
  
  const type = mimeType.split('/')[0];
  
  switch (type) {
    case 'image':
      return 'Image';
    case 'video':
      return 'Videocam';
    case 'audio':
      return 'Audiotrack';
    case 'application':
      if (mimeType.includes('pdf')) return 'PictureAsPdf';
      if (mimeType.includes('word') || mimeType.includes('document')) return 'Description';
      if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'TableChart';
      if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return 'Slideshow';
      if (mimeType.includes('zip') || mimeType.includes('compressed')) return 'FolderZip';
      return 'InsertDriveFile';
    default:
      return 'InsertDriveFile';
  }
};

/**
 * Validates a file against size and type constraints
 * @param {File} file - The file to validate
 * @param {Object} options - Validation options
 * @param {number} [options.maxSize=10] - Maximum file size in MB
 * @param {string[]} [options.allowedTypes=[]] - Allowed MIME types
 * @returns {{valid: boolean, error: string|null}} Validation result
 */
export const validateFile = (file, { maxSize = 10, allowedTypes = [] } = {}) => {
  // Check file size
  const maxSizeBytes = maxSize * 1024 * 1024; // Convert MB to bytes
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File is too large. Maximum size is ${maxSize}MB.`
    };
  }

  // Check file type if allowedTypes are specified
  if (allowedTypes.length > 0 && !allowedTypes.some(type => file.type.match(type))) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
    };
  }

  return { valid: true, error: null };
};

/**
 * Converts a file to base64 string
 * @param {File} file - The file to convert
 * @returns {Promise<string>} A promise that resolves with the base64 string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

/**
 * Downloads a file from a URL
 * @param {string} url - The URL of the file to download
 * @param {string} filename - The name to give the downloaded file
 */
export const downloadFile = (url, filename) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

/**
 * Creates a preview URL for an image file
 * @param {File} file - The image file
 * @returns {string} A URL representing the file
 */
export const createImagePreview = (file) => {
  return URL.createObjectURL(file);
};

/**
 * Revokes an object URL to free up memory
 * @param {string} url - The URL to revoke
 */
export const revokeObjectURL = (url) => {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};
