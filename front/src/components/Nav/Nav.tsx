import { Link } from "react-router-dom";
import { useAuthent } from "../../security/authContext";

const NavLinks = () => {
  const { isLogged } = useAuthent();
  const { logout } = useAuthent();

  return (
    <>
      <ul>
        {!isLogged && (
          <li>
            <Link to="/">Accueil</Link>
          </li>
        )}
        {isLogged && (
          <>
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
          </>
        )}
      </ul>
    </>
  );
};

export default NavLinks;
