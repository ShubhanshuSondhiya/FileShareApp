import mongoose from "mongoose";

const fileUploadSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    uuid: { type: String, required: true },
  },
  { timestamps: true }
);

const Fileupload = mongoose.model("fileUpload", fileUploadSchema);
export default Fileupload;
