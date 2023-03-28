import { useState } from "react";
import { useNavigate } from "react-router";

const CreateAccount = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const showCreateAccountForm = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    props.setCreateAccountFormVisibility(!props.createAccountFormVisibility);
    props.setLoginFormVisibility(false);
  };

  const refreshEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const refreshPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const refreshSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };

  const refreshFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };
  const createAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Create account");

    const reqInit: RequestInit = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        surname,
        firstname,
      }),
    };
    fetch("http://localhost:3001/create-account", reqInit)
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
        if (datas.isLogged) {
          navigate("/account");
        } else {
          setErrorMessage(datas.message);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="create-account">
      <button className="main-button" onClick={showCreateAccountForm}>
        Créer un compte
      </button>
      {props.createAccountFormVisibility && (
        <>
          <p className="user-error">{errorMessage}</p>
          <form>
            <label htmlFor="firstname">Prénom</label>
            <input type="text" name="firstname" onChange={refreshFirstname} />
            <label htmlFor="surname">Nom de famille</label>
            <input type="text" name="surname" onChange={refreshSurname} />
            <label htmlFor="email">Email</label>
            <input
              type="ëmail"
              name="email"
              onChange={refreshEmail}
              placeholder="Your email"
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              onChange={refreshPassword}
              placeholder="Mot de passe"
            />
            <button className="main-button" onClick={createAccount}>
              Créer le compte
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateAccount;
