import { useState } from "react";

const AskForSupply = () => {
  const [availableSupplies, setAvailableSupplies] = useState<any>([]);

  const reqInit: RequestInit = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };

  fetch(`${process.env.REACT_APP_URL_BACK}/company-available-supplies`, reqInit)
    .then((response) => response.json())
    .then((datas) => console.log(datas.supplies))
    .catch((error) => console.log(error));
  return (
    <div>
      <h2>Fournitures disponibles</h2>
    </div>
  );
};

export default AskForSupply;
