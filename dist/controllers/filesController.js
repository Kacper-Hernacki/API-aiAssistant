"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesController = void 0;
const multer_1 = __importDefault(require("multer"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
exports.filesController = {
    uploadFile: (req, res) => {
        upload.single("file")(req, res, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("File upload to S3 failed");
            }
            const file = req.file;
            if (!file) {
                return res.status(400).send("No file uploaded");
            }
            const params = {
                Bucket: "your-bucket-name",
                Key: file.originalname,
                Body: file.buffer,
            };
            s3.upload(params, (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("File upload to S3 failed");
                }
                res.send("File uploaded to S3: " + data.Location);
            });
        });
    },
    getFile: async (req, res) => {
        try {
            res.status(200).json({});
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Error fetching messages");
        }
    },
};
//# sourceMappingURL=filesController.js.map