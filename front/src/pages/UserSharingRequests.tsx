import { useState } from "react";
import Layout from "../components/Layout";
import ReceivedSharingRequests from "../components/SharingRequests/ReceivedSharingRequests";
import SentSharingRequests from "../components/SharingRequests/SentSharingRequests";
import "../assets/scss/handleSharingRequests.scss";

const UserSharingRequests = () => {
  const [sentSRVisibility, setSentSRVisibility] = useState(false);
  const [receivedSRVisibility, setReceivedSRVisibility] = useState(false);

  const showSentSharingRequests = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setSentSRVisibility(!sentSRVisibility);
  };

  const showReceivedSharingRequests = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setReceivedSRVisibility(!receivedSRVisibility);
  };
  return (
    <Layout>
      <h1>Demandes de partage</h1>
      <div className="handle-sharing-requests-options">
        <button className="main-button" onClick={showSentSharingRequests}>
          Demandes envoyées
        </button>
        <button className="main-button" onClick={showReceivedSharingRequests}>
          Demandes reçues
        </button>
      </div>
      {sentSRVisibility && <SentSharingRequests />}
      {receivedSRVisibility && <ReceivedSharingRequests />}
    </Layout>
  );
};

export default UserSharingRequests;
