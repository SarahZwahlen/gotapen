import { useEffect, useState } from "react";
import { Supply } from "../../infrastructure/types";
import UserSupply from "./UserSupply";

const ShowUserSupplies = () => {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  // const [formVisibility, setFormVisibility] = useState<boolean>(false);

  useEffect(() => {
    const reqInit: RequestInit = {
      method: "GET",
      mode: "cors",
      credentials: "include",
    };

    fetch(`${process.env.REACT_APP_URL_BACK}/show-user-supplies`, reqInit)
      .then((response) => response.json())
      .then((datas) => setSupplies(datas.supplies));
  }, []);

  return (
    <div className="user-supplies">
      <h2>Vos fournitures</h2>
      {supplies.map((supply) => (
        <UserSupply supply={supply} />
      ))}
    </div>
  );
};

export default ShowUserSupplies;
