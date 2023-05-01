import { useEffect, useState } from "react";
import { Supply } from "../../infrastructure/types";
import GiveBackSupply from "./GiveBackSupply";
import Image from "../Image";

const BorrowedSupplies = () => {
  const [borrowedSupplies, setBorrowedSupplies] = useState<Supply[]>([]);

  const reqInit: RequestInit = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };

  console.log(borrowedSupplies);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BACK}/show-borrowed-supplies`, reqInit)
      .then((response) => response.json())
      .then((datas) => {
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
        <div className="borrowed-supplies" key={supply.id}>
          <Image imageURL={supply.imagePath} alt={supply.name} />
          <p className="supply-name">{supply.name}</p>
          <p>{supply.owner.firstname}</p>
          <p>{supply.owner.firstname}</p>
          <GiveBackSupply id={supply.id} />
        </div>
      ))}
    </>
  );
};

export default BorrowedSupplies;
