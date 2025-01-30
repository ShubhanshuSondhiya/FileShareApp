/* eslint-disable react/prop-types */
const UploadFile = ({handleSubmit, handleChange}) => {
  return (
    <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="file" name="file" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadFile;
