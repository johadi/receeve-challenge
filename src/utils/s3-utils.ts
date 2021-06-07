import { S3Client, S3ClientConfig, PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput } from "@aws-sdk/client-s3";

import config from '../config';

/**
 * Util function that stores data in AWS S3 bucket
 *
 * @param {String} data - the data to be stored in the S3
 * @param {String} filename - the name of the file from which the data will be stored
 * @return {Object} - result of the stored data from S3
 */
export const saveJSONToS3 = async (data: string, filename: string): Promise<PutObjectCommandOutput> => {
    const s3Config: S3ClientConfig = {};
    const params: PutObjectCommandInput = {
        Bucket: config.s3Bucket,
        Key: filename,
        Body: data
    }

    if(config.s3Region) {
        s3Config.region = config.s3Region;
    }

    const client = new S3Client(s3Config);
    const command = new PutObjectCommand(params);
    const result = await client.send(command);

    return result;
}
