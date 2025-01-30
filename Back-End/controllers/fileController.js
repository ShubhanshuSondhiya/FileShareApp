import { generateUniqueID } from "../utils/generateUniqueID.js";
import Fileupload from "../models/fileUpload.js";
import { sendEmail } from "../services/emailService.js";

export async function uploadFile(req, res) {
  try {
    const { filename, size, path } = req.file;
    const uuid = generateUniqueID();
    const dataToSave = new Fileupload({ filename, size, path, uuid });
    await dataToSave.save();
    res.status(201).json({
      messsage: "File upload Successfully",
      uuid,
      downloadLink: `${req.protocol}://${req.get("host")}/api/files/${uuid}`,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
export async function getAllFiles(req, res) {
  try {
    const data = await Fileupload.find({}, "filename uuid createdAt");
    const dataToSend = data.map((file) => {
      return {
        ...file._doc,
        downloadLink: `${req.protocol}://${req.get(
          "host"
        )}/api/files/downloads/${file.uuid}`,
      };
    });
    res.json(dataToSend);
  } catch (error) {
    console.log(error);
    res.status(500).json("There is a problem. Contact Server Admin");
  }
}

export async function downloadFile(req, res) {
  try {
    const file = await Fileupload.findOne({ uuid: req.params.uuid });
    if (!file)
      res.status(404).json({ error: "Resqested File Doesen't Exist." });
    res.download(file.path, file.filename);
  } catch (error) {
    res.status(500).json({ error: "Could not download file." });
  }
}
export async function sendEmailWithLink(req, res) {
  try {
    const { email, uuid } = req.body;
    if (!email || !uuid)
      return res.status(400).json({ error: "Email & UUID are required" });

    const file = await Fileupload.findOne({ uuid });
    if (!file)
      return res.status(404).json({ error: "File with given UUID not found" });

    const downloadLink = `${req.protocol}://${req.get(
      "host"
    )}/api/files/downloads/${file.uuid}`;

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Email Download Link",
      text: "Here's your download Link :" + downloadLink,
      html: `<h3>Here's your download Link :<a href='${downloadLink}'>Download File</a></h3>`,
    };

    await sendEmail(mailOptions);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
