const Nav = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="/handle-user-supplies">Fournitures</a>
          </li>
          <li>
            <a href="handle-sharing-requests">Demandes de partage</a>
          </li>
          <li>
            <a href="/account">Profil</a>
          </li>
          <li>
            <a href="/logout">Se déconnecter</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
