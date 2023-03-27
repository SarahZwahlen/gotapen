import { useEffect, useState } from "react";
import { Supply } from "../../infrastructure/types";
import DeleteUserSupply from "./deleteUserSupply";
import ModifyUSerSupply from "./modifyUserSupply";

const ShowUserSupplies = () => {
  const [supplies, setSupplies] = useState<Supply[]>([]);

  useEffect(() => {
    const reqInit: RequestInit = {
      method: "GET",
      mode: "cors",
      credentials: "include",
    };

    fetch("http://localhost:3001/show-user-supplies", reqInit)
      .then((response) => response.json())
      .then((datas) => setSupplies(datas.supplies));
  }, []);

  return (
    <div>
      <h2>Vos fournitures</h2>
      {supplies.map((supply) => (
        <div>
          <img
            src={"http://localhost:3001/" + supply.imagePath}
            alt={supply.name}
          />
          <p>Nom : {supply.name}</p>
          <ModifyUSerSupply
            id={supply.id}
            name={supply.name}
            imagePath={supply.imagePath}
          />
          <DeleteUserSupply id={supply.id} />
        </div>
      ))}
    </div>
  );
};

export default ShowUserSupplies;
