import { useState } from "react";
import { useNavigate } from "react-router";

const Login = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const showLoginForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.setLoginFormVisibility(!props.loginFormVisibility);
    props.setCreateAccountFormVisibility(false);
  };

  const refreshEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const refreshPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const login = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const reqInit: RequestInit = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    };

    fetch(`${process.env.REACT_APP_URL_BACK}/login`, reqInit)
      .then((response) => response.json())
      .then((datas) => {
        if (datas.isLogged) {
          navigate("/account");
        } else {
          setErrorMessage(datas.message);
        }
      })
      .catch((error) => console.log(error));
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
              onChange={refreshEmail}
              placeholder="Email"
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              onChange={refreshPassword}
              placeholder="Mot de passe"
            />
            <button className="main-button" onClick={login}>
              Connection
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
