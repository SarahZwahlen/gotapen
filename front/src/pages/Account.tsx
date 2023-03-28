import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import AskForSupply from "../components/SharingRequests/AskForSupply";

const Account = () => {
  const [userDatas, setUserDatas] = useState({
    firstname: "",
    surname: "",
  });
  const [askForSupplyVisibility, setAskForSupplyVisibility] =
    useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    const reqInit: RequestInit = {
      method: "GET",
      mode: "cors",
      credentials: "include",
    };

    fetch(`${process.env.REACT_APP_URL_BACK}/account`, reqInit)
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
        if (datas.isLogged) {
          setUserDatas(datas.datas);
          return;
        } else {
          navigate("/access-denied");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const showAskForSupply = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAskForSupplyVisibility(!askForSupplyVisibility);
  };
  return (
    <Layout>
      <h1>Bonjour {userDatas.firstname}</h1>
      <button className="main-button" onClick={showAskForSupply}>
        J'ai besoin de matériel !
      </button>
      {askForSupplyVisibility && <AskForSupply />}
    </Layout>
  );
};

export default Account;
