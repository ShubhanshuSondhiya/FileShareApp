/* eslint-disable react/prop-types */
const SendByEmail = ({ handleEmailSubmit, email, uuid, setEmail, setuuid }) => {
  return (
    <form className="flex gap-3" action="" onSubmit={handleEmailSubmit}>
      <input className="border"
        type="text"
        placeholder="Reciever's Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input className="border"
        type="text"
        placeholder="File UUID"
        value={uuid}
        onChange={(e) => setuuid(e.target.value)}
      />
      <button className="border rounded-md p-1" type="submit">Send Email</button>
    </form>
  );
};

export default SendByEmail;
