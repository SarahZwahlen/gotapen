import { useEffect, useState } from "react";
import CancelSharingRequest from "./CancelSharingRequest";

type SentSharingRequestsType = {
  id: string;
  supplyName: string;
  supplyImage: string;
  sharerName: string;
};

const SentSharingRequests = () => {
  const [sharingRequests, setSharingRequests] = useState<
    SentSharingRequestsType[] | []
  >([]);

  const reqInit: RequestInit = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };
  useEffect(() => {
    fetch("http://localhost:3001/show-sent-sharing-requests", reqInit)
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas.requests);
        setSharingRequests(datas.requests);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="sharing-requests">
      <h2>Demande de partage envoyées</h2>
      {sharingRequests.map((element) => (
        <div className="sharing-request">
          <img src={element.supplyImage} alt={element.supplyName} />
          <p>{element.supplyName}</p>
          <p>{element.sharerName}</p>
          <CancelSharingRequest id={element.id} />
        </div>
      ))}
    </div>
  );
};

export default SentSharingRequests;
