import { Request, Response } from "express";
import multer from "multer";
import AWS from "aws-sdk";

// Configure the AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Configure the multer storage settings
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const filesController = {
  uploadFile: (req: Request, res: Response): void => {
    upload.single("file")(req, res, (err: any) => {
      if (err) {
        console.error(err);
        return res.status(500).send("File upload to S3 failed");
      }
      const file = (req as any).file;

      if (!file) {
        return res.status(400).send("No file uploaded");
      }
      const params = {
        Bucket: "your-bucket-name",
        Key: file.originalname,
        Body: file.buffer,
      };
      s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
        if (err) {
          console.error(err);
          return res.status(500).send("File upload to S3 failed");
        }
        res.send("File uploaded to S3: " + data.Location);
      });
    });
  },
  getFile: async (req: Request, res: Response): Promise<void> => {
    try {
      //TODO
      res.status(200).json({});
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching messages");
    }
  },
};
