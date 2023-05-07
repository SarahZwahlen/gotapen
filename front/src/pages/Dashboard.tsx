import { useState } from "react";
import Layout from "../components/Layout";
import AvailableSupplies from "../components/SharingRequests/AvailableSupplies";
import "../assets/scss/dashboard.scss";
import { useAuthent } from "../security/authContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const userDatas = useAuthent();
  const [askForSupplyVisibility, setAskForSupplyVisibility] =
    useState<boolean>(false);
  const [otherOptionsVisibility, setOtherOptionsVisibility] =
    useState<boolean>(true);
  const { isAdmin } = useAuthent();

  const showAskForSupply = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAskForSupplyVisibility(!askForSupplyVisibility);
    setOtherOptionsVisibility(!otherOptionsVisibility);
  };
  return (
    <Layout>
      <article>
        <h2>Bonjour {userDatas.user?.firstname}</h2>
        <h3>Que souhaitez-vous faire ? </h3>
        <section className="dashboard-options">
          <button className="main-button" onClick={showAskForSupply}>
            J'ai besoin de matériel !
          </button>
          {otherOptionsVisibility && (
            <>
              <Link className="main-button" to="/handle-user-supplies">
                Gérer mes fournitures
              </Link>
              <Link className="main-button" to="/handle-sharing-requests">
                Gérer mes demandes de prêt
              </Link>
              <Link className="main-button" to="/account">
                Gérer mon profil
              </Link>
              {isAdmin && (
                <Link className="main-button" to="/back-office">
                  Gérer mon profil entreprise
                </Link>
              )}
            </>
          )}
        </section>
        <section>{askForSupplyVisibility && <AvailableSupplies />}</section>
      </article>
    </Layout>
  );
};

export default Dashboard;
