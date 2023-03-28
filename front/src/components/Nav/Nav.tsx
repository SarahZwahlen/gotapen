import { useState } from "react";
import BurgerMenu from "./BurgerMenu";

const Nav = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <nav>
        <BurgerMenu isActive={isActive} setIsActive={setIsActive} />

        <div className={`nav-links ${isActive ? "hidden" : "show"}`}>
          <ul>
            <li>
              <a href="/">Accueil</a>
            </li>
            <li>
              <a href="/handle-user-supplies">Fournitures</a>
            </li>
            <li>
              <a href="handle-sharing-requests">Demandes</a>
            </li>
            <li>
              <a href="/account">Profil</a>
            </li>
            <li>
              <a href="/logout">Se déconnecter</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
