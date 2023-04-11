import { useState } from "react";
import Layout from "../components/Layout";
import AvailableSupplies from "../components/SharingRequests/AvailableSupplies";
import "../assets/scss/account.scss";
import { useAuthent } from "../security/authContext";

const Account = () => {
  const userDatas = useAuthent();
  console.log(userDatas);
  const [askForSupplyVisibility, setAskForSupplyVisibility] =
    useState<boolean>(false);

  const showAskForSupply = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAskForSupplyVisibility(!askForSupplyVisibility);
  };
  return (
    <Layout>
      <h1>Bonjour {userDatas.user?.firstname}</h1>
      <button className="main-button" onClick={showAskForSupply}>
        J'ai besoin de matériel !
      </button>
      {askForSupplyVisibility && <AvailableSupplies />}
    </Layout>
  );
};

export default Account;
