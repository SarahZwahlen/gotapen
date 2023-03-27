import { useState } from "react";
import Layout from "../components/Layout";
import ReceivedSharingRequests from "../components/SharingRequests/ReceivedSharingRequests";
import SentSharingRequests from "../components/SharingRequests/SentSharingRequests";

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
      <button onClick={showSentSharingRequests}>Demandes envoyées</button>
      <button onClick={showReceivedSharingRequests}>Demandes reçues</button>

      {sentSRVisibility && <SentSharingRequests />}
      {receivedSRVisibility && <ReceivedSharingRequests />}
    </Layout>
  );
};

export default UserSharingRequests;
