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
        setSharingRequests(datas.requests);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <article className="sharing-requests">
      <h2>Demande de partage reçues</h2>
      <section className="sub-sharing-requests">
        {sharingRequests.map((element) => (
          <div className="sharing-request">
            <div className="sr-infos">
              <img
                src={`${process.env.REACT_APP_URL_BACK}/${element.supplyImage}`}
                alt={element.supplyName}
              />
              <div>
                <p>{element.supplyName}</p>
                <p className="supply-owner">{element.applicantName}</p>
              </div>
            </div>
            <div className="accept-denied">
              <DeniedSharingRequest id={element.id} />
              <AcceptSharingRequest id={element.id} />
            </div>
          </div>
        ))}
      </section>
    </article>
  );
};

export default ReceivedSharingRequests;
