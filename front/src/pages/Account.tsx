import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";

const Account = () => {
  const [userDatas, setUserDatas] = useState({
    firstname: "",
    surname: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const reqInit: RequestInit = {
      method: "GET",
      mode: "cors",
      credentials: "include",
    };

    fetch("http://localhost:3001/account", reqInit)
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
  return (
    <Layout>
      <h1>Bonjour {userDatas.firstname}</h1>
      <p>Tableau de bord? </p>
    </Layout>
  );
};

export default Account;
