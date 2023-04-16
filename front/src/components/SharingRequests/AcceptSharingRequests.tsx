import { HTTPClientPOSTappJson } from "../../clientsHTTP/HTTPClient";
import { SharingRequest } from "../../infrastructure/types";

const AcceptSharingRequest = (props: SharingRequest) => {
  const acceptRequest = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await HTTPClientPOSTappJson(
      { sharingRequestId: props.id },
      "accept-sharing"
    );
  };
  return (
    <button className="secondary-button" onClick={acceptRequest}>
      Accepter
    </button>
  );
};

export default AcceptSharingRequest;
