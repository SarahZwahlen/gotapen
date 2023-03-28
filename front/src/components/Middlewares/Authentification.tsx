import { useNavigate } from "react-router-dom";
type Props = {
  children: React.ReactNode;
};

const Authentification: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const reqInit: RequestInit = {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
    headers: { "content-type": "application/json" },
  };

  fetch("http://localhost:3001/account", reqInit)
    .then((response) => response.json())
    .then((datas) => {
      console.log(datas);
      if (datas.isLogged) {
        return <>{children}</>;
      } else {
        navigate("/access-denied");
      }
    })
    .catch((error) => console.log(error));

  return <></>;
};

export default Authentification;