/* eslint-disable prettier/prettier */
import { S3 } from 'aws-sdk';

function GetFileKey(path) {
  const key_path = path.substring(path.lastIndexOf("/") + 1);
  return key_path;
}

export async function GetAWSSignedUrl(url) {
  try {
    if (url) {
      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1',
      });
      const key = GetFileKey(url)
      const param = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key.replace(/^\/+/g, ""),
        Expires: 86400*60,
      };
      const getSignedUrl = await s3.getSignedUrl("getObject", param);
      return getSignedUrl;
    }
    return null;
  } catch (e) {
    console.log("Cannot find file on aws");
  }
}


