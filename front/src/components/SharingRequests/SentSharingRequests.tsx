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
    fetch(
      `${process.env.REACT_APP_URL_BACK}/show-sent-sharing-requests`,
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
      <h2>Demande de partage envoyées</h2>
      <section className="sub-sharing-requests">
        {sharingRequests.map((element) => (
          <div className="sharing-request">
            <div className="sr-infos">
              <img
                src={`${process.env.REACT_APP_URL_BACK}/${element.supplyImage}`}
                alt={element.supplyName}
              />
              <p>{element.supplyName}</p>
            </div>
            <p className="supply-owner">{element.sharerName}</p>
            <CancelSharingRequest id={element.id} />
          </div>
        ))}
      </section>
    </article>
  );
};

export default SentSharingRequests;
