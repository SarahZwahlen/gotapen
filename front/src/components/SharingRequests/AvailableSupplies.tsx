import { useEffect, useState } from "react";
import { Supply } from "../../infrastructure/types";
import AskForSupply from "./AskForSupply";

const AvailableSupplies = () => {
  const [availableSupplies, setAvailableSupplies] = useState<any>([]);

  const reqInit: RequestInit = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL_BACK}/company-available-supplies`,
      reqInit
    )
      .then((response) => response.json())
      .then((datas) => {
        setAvailableSupplies(datas.supplies);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>Fournitures disponibles</h2>
      {availableSupplies.map((supply: Supply) => (
        <div className="available-supplies">
          <img
            src={`${process.env.REACT_APP_URL_BACK}/${supply.imagePath}`}
            alt={supply.name}
          />
          <p>{supply.name}</p>
          <div>
            <p>{supply.owner.firstname}</p>
            <p>{supply.owner.surname}</p>
          </div>
          <AskForSupply id={supply.id} />
        </div>
      ))}
    </div>
  );
};

export default AvailableSupplies;
