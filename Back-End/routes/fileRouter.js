import express from "express";
import upload from "../middleware/upload.js";
import {
  downloadFile,
  getAllFiles,
  sendEmailWithLink,
  uploadFile,
} from "../controllers/fileController.js";

const FileRouter = express.Router();

FileRouter.post("/uploadFiles", upload.single("file"), uploadFile);
FileRouter.get("/", getAllFiles);
FileRouter.get("/files/downloads/:uuid", downloadFile);
FileRouter.post("/files/send", sendEmailWithLink);

export default FileRouter;
