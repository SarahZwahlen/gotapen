import { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import { Link } from "react-router-dom";
import { useAuthent } from "../../security/authContext";

const Nav = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { logout } = useAuthent();
  return (
    <>
      <nav>
        <BurgerMenu isActive={isActive} setIsActive={setIsActive} />

        <div className={`nav-links ${isActive ? "hidden" : "show"}`}>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/handle-user-supplies">Fournitures</Link>
            </li>
            <li>
              <Link to="/handle-sharing-requests">Demandes</Link>
            </li>
            <li>
              <Link to="/account">Profil</Link>
            </li>
            <li>
              <span
                role="button"
                onClick={() => {
                  logout();
                }}
              >
                Se déconnecter
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
