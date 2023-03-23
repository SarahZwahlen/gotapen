import { useEffect } from "react";
import { useNavigate } from "react-router";

const Account = () => {
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
          return;
        } else {
          navigate("/access-denied");
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return <h1>Your account</h1>;
};

export default Account;
