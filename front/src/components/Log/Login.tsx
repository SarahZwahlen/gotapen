import { useState } from "react";
import { useAuthent } from "../../security/authContext";

const Login = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuthent();

  const showLoginForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.setLoginFormVisibility(!props.loginFormVisibility);
    props.setCreateAccountFormVisibility(false);
    props.setCompanyAcountVisibility(false);
  };

  return (
    <div className="login">
      <button className="main-button" onClick={showLoginForm}>
        Se connecter
      </button>
      {props.loginFormVisibility && (
        <>
          <p className="user-error">{errorMessage}</p>
          <form>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              placeholder="Email"
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Mot de passe"
            />
            <button
              className="main-button"
              onClick={async (e) => {
                e.preventDefault();
                const errorResponse = await login(email, password);
                if (errorResponse) {
                  setErrorMessage("Le mot de passe ou l'email est incorrect");
                }
              }}
            >
              Connexion
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
