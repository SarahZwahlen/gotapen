import { useState, useEffect } from "react";
import AcceptSharingRequest from "./AcceptSharingRequests";
import DeniedSharingRequest from "./DeniedSharingRequest";

type ReceivedSharingRequestsType = {
  id: string;
  supplyName: string;
  supplyImage: string;
  applicantName: string;
};

const ReceivedSharingRequests = () => {
  const [sharingRequests, setSharingRequests] = useState<
    ReceivedSharingRequestsType[] | []
  >([]);

  const reqInit: RequestInit = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL_BACK}/show-received-sharing-requests`,
      reqInit
    )
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas.requests);
        setSharingRequests(datas.requests);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log("sharing request", sharingRequests);
  return (
    <div className="sharing-requests">
      <h2>Demande de partage reçues</h2>
      {sharingRequests.map((element) => (
        <div className="sharing-request">
          <img src={element.supplyImage} alt={element.supplyName} />
          <div>
            <p>{element.supplyName}</p>
            <p>{element.applicantName}</p>
          </div>
          <DeniedSharingRequest id={element.id} />
          <AcceptSharingRequest id={element.id} />
        </div>
      ))}
    </div>
  );
};

export default ReceivedSharingRequests;
