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
    <article>
      <h2>Fournitures disponibles</h2>
      {availableSupplies.map((supply: Supply) => (
        <div className="available-supplies" key={supply.id}>
          <div>
            <img
              src={`${process.env.REACT_APP_URL_BACK}/${supply.imagePath}`}
              alt={supply.name}
            />
            <div>
              <p className="supply-name">{supply.name}</p>

              <p className="supply-owner">
                {supply.owner.firstname} {supply.owner.surname}
              </p>
            </div>
          </div>
          <AskForSupply id={supply.id} />
        </div>
      ))}
    </article>
  );
};

export default AvailableSupplies;
