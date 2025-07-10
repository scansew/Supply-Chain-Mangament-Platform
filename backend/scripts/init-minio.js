const { S3Client, CreateBucketCommand, HeadBucketCommand } = require('@aws-sdk/client-s3');
const { fromIni } = require('@aws-sdk/credential-providers');
require('dotenv').config();

// Configure S3 client
const s3Client = new S3Client({
  endpoint: `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`,
  region: 'us-east-1',
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
  },
});

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || 'scansew-files';

async function checkAndCreateBucket() {
  try {
    // Check if bucket exists
    await s3Client.send(new HeadBucketCommand({ Bucket: BUCKET_NAME }));
    console.log(`Bucket "${BUCKET_NAME}" already exists.`);
    return true;
  } catch (error) {
    if (error.name === 'NotFound') {
      // Bucket doesn't exist, create it
      try {
        await s3Client.send(
          new CreateBucketCommand({
            Bucket: BUCKET_NAME,
            CreateBucketConfiguration: {
              LocationConstraint: 'us-east-1',
            },
          })
        );
        console.log(`Successfully created bucket: ${BUCKET_NAME}`);
        return true;
      } catch (createError) {
        console.error('Error creating bucket:', createError);
        return false;
      }
    } else {
      console.error('Error checking bucket:', error);
      return false;
    }
  }
}

// Run the check and create if needed
checkAndCreateBucket()
  .then(success => {
    if (success) {
      console.log('MinIO bucket check/creation completed successfully');
      process.exit(0);
    } else {
      console.error('Failed to check/create MinIO bucket');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
