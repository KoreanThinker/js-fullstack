import AWS from "aws-sdk";
import { PassThrough } from "stream";
import { ApolloServerFileUploads } from "../contstants/types";

type S3UploadConfig = {
    accessKeyId?: string;
    secretAccessKey?: string;
    region?: string;
    destinationBucketName: string;
};

type S3UploadStream = {
    writeStream: PassThrough;
    promise: Promise<AWS.S3.ManagedUpload.SendData>;
};

export class AWSS3Uploader implements ApolloServerFileUploads.IUploader {
    private s3: AWS.S3;
    public config: S3UploadConfig;

    constructor(config: S3UploadConfig) {
        AWS.config = new AWS.Config();
        AWS.config.update({
            region: config.region || "ca-central-1",
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey
        });

        this.s3 = new AWS.S3();
        this.config = config;
    }

    private createUploadStream(key: string, mimeType: string): S3UploadStream {
        const pass = new PassThrough();
        return {
            writeStream: pass,
            promise: this.s3
                .upload({
                    Bucket: this.config.destinationBucketName,
                    Key: key,
                    Body: pass,
                    ContentType: mimeType || 'application/octet-stream'
                })
                .promise()
        };
    }

    private createDestinationFilePath(
        fileName: string,
        mimetype: string,
        encoding: string
    ): string {
        const ext = fileName.split('.').pop();
        const random = Math.floor(Math.random() * 900000000000000000);
        return random + '.' + ext;;
    }

    async singleFileUploadResolver(file: ApolloServerFileUploads.File): Promise<ApolloServerFileUploads.UploadedFileResponse> {
        const { stream, filename, mimetype, encoding } = await file;
        const filePath = this.createDestinationFilePath(
            filename,
            mimetype,
            encoding
        );
        const uploadStream = this.createUploadStream(filePath, mimetype);

        stream.pipe(uploadStream.writeStream);
        const result = await uploadStream.promise;

        return { filename, mimetype, encoding, url: result.Location };
    }

    async multipleUploadsResolver(files: ApolloServerFileUploads.File[]): Promise<ApolloServerFileUploads.UploadedFileResponse[]> {
        return Promise.all(
            files.map(file => this.singleFileUploadResolver(file))
        );
    }
}