import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME;
const publicDomain = process.env.R2_PUBLIC_DOMAIN;

if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
  console.warn("Cloudflare R2 credentials are not fully configured in .env.local");
}

// S3 Client initialized for Cloudflare R2
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: accessKeyId || "",
    secretAccessKey: secretAccessKey || "",
  },
});

/**
 * Uploads a file buffer directly to Cloudflare R2 bucket.
 * @returns Publicly accessible URL for the uploaded file
 */
export async function uploadToR2(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const uniqueKey = `mergeboost-${Date.now()}-${fileName.replace(/\s+/g, "-")}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: uniqueKey,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await r2Client.send(command);

  // Return the public image URL
  if (publicDomain) {
    const formattedDomain = publicDomain.startsWith("http")
      ? publicDomain
      : `https://${publicDomain}`;
    return `${formattedDomain}/${uniqueKey}`;
  }

  return `https://${bucketName}.${accountId}.r2.cloudflarestorage.com/${uniqueKey}`;
}