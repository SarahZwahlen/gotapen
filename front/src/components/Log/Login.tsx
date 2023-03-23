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

    fetch("http://localhost:3001/login", reqInit)
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
    <div className="container">
      <button onClick={showLoginForm}>Se connecter</button>
      <p>{errorMessage}</p>
      {props.loginFormVisibility && (
        <form>
          <label htmlFor="email">Email</label>
          <input
            type="ëmail"
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
          <button onClick={login}>Connection</button>
        </form>
      )}
    </div>
  );
};

export default Login;
