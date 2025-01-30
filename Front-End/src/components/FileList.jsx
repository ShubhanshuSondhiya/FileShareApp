/* eslint-disable react/prop-types */

const FileList = ({ savedFiles }) => {
  return (
    <div>
      <h1>Your Uploaded Files</h1>
      <ul>
        {savedFiles ? (
          savedFiles.map((file) => {
            return (
              <li key={file.uuid}>
                <a href={file.downloadLink}>{file.filename}</a>
              </li>
            );
          })
        ) : (
          <p>You dont have any files.</p>
        )}
      </ul>
    </div>
  );
};

export default FileList;
