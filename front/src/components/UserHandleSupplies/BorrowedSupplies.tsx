import { useEffect, useState } from "react";
import { Supply } from "../../infrastructure/types";
import GiveBackSupply from "./GiveBackSupply";

const BorrowedSupplies = () => {
  const [borrowedSupplies, setBorrowedSupplies] = useState<Supply[]>([]);

  const reqInit: RequestInit = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };

  useEffect(() => {
    fetch("http://localhost:3001/show-borrowed-supplies", reqInit)
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
        if (datas.supplies) {
          setBorrowedSupplies(datas.supplies);
        } else {
          setBorrowedSupplies([]);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h2>Fournitures empruntées</h2>
      {borrowedSupplies.map((supply) => (
        <div>
          <img src={supply.imagePath} alt={supply.name} />
          <p>{supply.name}</p>
          <GiveBackSupply id={supply.id} />
        </div>
      ))}
    </>
  );
};

export default BorrowedSupplies;
