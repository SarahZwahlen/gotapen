import "../../assets/scss/header.scss";
import BurgerMenu from "../Nav/BurgerMenu";
import { useState } from "react";
import NavLinks from "../Nav/Nav";
const Header = () => {
  const [isActive, setIsActive] = useState<boolean>(true);

  return (
    <>
      <header>
        <h1>Got a pen ?</h1>
        <BurgerMenu isActive={isActive} setIsActive={setIsActive} />
        <nav className={`nav-links `}>
          <NavLinks />
        </nav>
      </header>
      <nav className={`burger-nav-links ${isActive ? "hidden" : "show"}`}>
        <NavLinks />
      </nav>
    </>
  );
};

export default Header;
