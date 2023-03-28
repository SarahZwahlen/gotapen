import { SharingRequest } from "../../infrastructure/types";

const AcceptSharingRequest = (props: SharingRequest) => {
  const acceptRequest = async (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(props.id);
    const reqInit: RequestInit = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sharingRequestId: props.id,
      }),
    };

    fetch("http://localhost:3001/accept-sharing", reqInit)
      .then((response) => response.json())
      .then((datas) => console.log(datas))
      .catch((error) => console.log(error));
  };
  return (
    <button className="secondary-button" onClick={acceptRequest}>
      Accepter
    </button>
  );
};

export default AcceptSharingRequest;
