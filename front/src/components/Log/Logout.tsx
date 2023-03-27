const Logout = () => {
  const reqInit: RequestInit = {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
    headers: { "content-type": "application/json" },
  };

  fetch("http://localhost:3001/logout", reqInit)
    .then((response) => response.json())
    .then((datas) => console.log(datas))
    .catch((error) => console.log(error));

  return (
    <>
      <h1>Vous êtes déconnecté</h1>
      <a href="/">Accueil</a>
    </>
  );
};

export default Logout;
