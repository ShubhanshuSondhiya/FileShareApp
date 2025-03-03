import "./App.css";
import axios from "axios";
import FileList from "./components/FileList";
import UploadFile from "./components/UploadFile";
import { useEffect, useState } from "react";
import SendByEmail from "./components/SendByEmail";

function App() {
  const [files, setFiles] = useState(null);
  const [savedFiles, setSavedFiles] = useState(null);
  const [email, setEmail] = useState("");
  const [uuid, setuuid] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    try {
      const response = await axios.get("http://localhost:5969/api");
      setSavedFiles(response.data);
      console.log();
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setFiles(e.target.files[0]);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("file", files);
      const response = await axios.post(
        "http://localhost:5969/api/uploadFiles",
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEmailSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5969/api/files/send",
        { email, uuid }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[100vw] h-[100vh] -translate-y-14 flex flex-col justify-center items-center gap-10">
      <h1 className="text-5xl font-bold underline">File Share Application</h1>
      <UploadFile
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setFile={setFiles}
        files={files}
      />
      <FileList savedFiles={savedFiles} />
      <h1 className="text-3xl font-bold underline">Send By Email</h1>
      <SendByEmail
        handleEmailSubmit={handleEmailSubmit}
        email={email}
        uuid={uuid}
        setEmail={setEmail}
        setuuid={setuuid}
      />
    </div>
  );
}

export default App;
