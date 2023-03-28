import { useState } from "react";
import Layout from "../components/Layout";
import BorrowedSupplies from "../components/UserHandleSupplies/BorrowedSupplies";
import CreateSupply from "../components/UserHandleSupplies/CreateSupply";
import ShowUserSupplies from "../components/UserHandleSupplies/ShowUserSupplies";
import "../assets/scss/userSupplies.scss";

const UserHandleSupplies = () => {
  const [showSuppliesVIsibility, setShowSuppliesVisibility] = useState(false);
  const [createSupplyVisibility, setCreateSupplyVisibility] = useState(false);
  const [borrowedSuppliesVisibility, setBorrowedSuppliesVisibility] =
    useState(false);

  const showUserSupplies = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowSuppliesVisibility(!showSuppliesVIsibility);
    setCreateSupplyVisibility(false);
    setBorrowedSuppliesVisibility(false);
  };

  const createSupply = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCreateSupplyVisibility(!createSupplyVisibility);
    setShowSuppliesVisibility(false);
    setBorrowedSuppliesVisibility(false);
  };

  const borrwedSupplies = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setBorrowedSuppliesVisibility(!borrowedSuppliesVisibility);
    setShowSuppliesVisibility(false);
    setCreateSupplyVisibility(false);
  };
  return (
    <Layout>
      <h1>Gérer vos fournitures</h1>
      <div className="handle-supplies-options">
        <button className="main-button" onClick={showUserSupplies}>
          Voir vos fournitures
        </button>
        <button className="main-button" onClick={createSupply}>
          Créer une fourniture
        </button>
        <button className="main-button" onClick={borrwedSupplies}>
          Vos fournitures empruntées
        </button>
        {showSuppliesVIsibility && <ShowUserSupplies />}
        {createSupplyVisibility && <CreateSupply />}
        {borrowedSuppliesVisibility && <BorrowedSupplies />}
      </div>
    </Layout>
  );
};

export default UserHandleSupplies;
