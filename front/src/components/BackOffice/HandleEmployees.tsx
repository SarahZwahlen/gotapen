import { useEffect } from "react";

const HandleEmployees = () => {
  useEffect(() => {
    const reqInit: RequestInit = {
      method: "GET",
      mode: "cors",
      credentials: "include",
    };

    fetch(`${process.env.REACT_APP_URL_BACK}/get-employees-list`, reqInit)
      .then((response) => response.json())
      .then((datas) => console.log(datas))
      .catch((error) => console.log(error));
  }, []);
  return <p>Gérer les employers</p>;
};

export default HandleEmployees;
