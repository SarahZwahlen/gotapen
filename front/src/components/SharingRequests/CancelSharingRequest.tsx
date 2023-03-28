import { SharingRequest } from "../../infrastructure/types";

const CancelSharingRequest = (props: SharingRequest) => {
  const cancelRequest = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const reqInit: RequestInit = {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sharingRequestId: props.id,
      }),
    };

    fetch(`${process.env.REACT_APP_URL_BACK}/denied-sharing`, reqInit)
      .then((response) => response.json())
      .then((datas) => console.log(datas))
      .catch((error) => console.log(error));
  };
  return (
    <button className="secondary-button" onClick={cancelRequest}>
      Annuler
    </button>
  );
};

export default CancelSharingRequest;
