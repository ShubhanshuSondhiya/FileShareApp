/* eslint-disable react/prop-types */
const SendByEmail = ({ handleEmailSubmit, email, uuid, setEmail, setuuid }) => {
  return (
    <form action="" onSubmit={handleEmailSubmit}>
      <input
        type="text"
        placeholder="Reciever's Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="File UUID"
        value={uuid}
        onChange={(e) => setuuid(e.target.value)}
      />
      <button type="submit">Send Email</button>
    </form>
  );
};

export default SendByEmail;
