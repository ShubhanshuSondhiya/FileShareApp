/* eslint-disable react/prop-types */
const UploadFile = ({handleSubmit, handleChange}) => {
  return (
    <form className="flex gap-3" action="" onSubmit={handleSubmit} encType="multipart/form-data">
      <input className="border" type="file" name="file" onChange={handleChange} />
      <button className="border p-1 rounded-md" type="submit">Upload</button>
    </form>
  );
};

export default UploadFile;
