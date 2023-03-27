import { useState } from "react";
import { Supply } from "../../infrastructure/types";
import GiveBackSupply from "./GiveBackSupply";

const BorrowedSupplies = () => {
  const [borrowedSupplies, setBorrowedSupplies] = useState<Supply[]>([]);

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
