import { useEffect, useState } from "react";
import { HTTPClientPOSTappJson } from "../../clientsHTTP/HTTPClient";
import { useAuthent } from "../../security/authContext";

const CreateAccount = (props: any) => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  const [firstname, setFirstname] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [companyCode, setCompanyCode] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const { login } = useAuthent();
  const showCreateAccountForm = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    props.setCreateAccountFormVisibility(!props.createAccountFormVisibility);
    props.setLoginFormVisibility(false);
    props.setCompanyAcountVisibility(false);
  };

  useEffect(() => {
    if (
      email &&
      password &&
      surname &&
      firstname &&
      companyCode &&
      companyName
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password, surname, firstname, companyCode, companyName]);

  const createAccount = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const result = await HTTPClientPOSTappJson(
      {
        email,
        password,
        surname,
        firstname,
        companyCode,
        companyName,
      },
      "create-account"
    );

    if (result.isLogged) {
      console.log("im logged");
      const errorResponse = await login(email!, password!);
      if (errorResponse) {
        setErrorMessage("Le mot de passe ou l'email est incorrect");
      }
    } else {
      setErrorMessage(result.message);
    }
  };
  return (
    <div className="create-account">
      <button className="main-button" onClick={showCreateAccountForm}>
        Créer un compte utilisateur
      </button>
      {props.createAccountFormVisibility && (
        <>
          <p className="user-error">{errorMessage}</p>
          <form>
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              name="firstname"
              onChange={(event) => setFirstname(event.target.value)}
              placeholder="Prénom de l'utlisateur"
              required
            />
            <label htmlFor="surname">Nom de famille</label>
            <input
              type="text"
              name="surname"
              onChange={(event) => setSurname(event.target.value)}
              placeholder="Nom de l'utlisateur"
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="ëmail"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email de l'utilisateur"
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mot de passe"
              required
            />
            <label htmlFor="companyName">Nom de l'entreprise</label>
            <input
              type="text"
              name="companyName"
              required
              onChange={(event) => setCompanyName(event.target.value)}
            />
            <label htmlFor="companyCode">Code entreprise</label>
            <p>
              Afin de rejoindre le groupe GotAPen de votre entreprise, veuillez
              renseigner ci-après le code d'accès
            </p>
            <input
              type="password"
              name="companyCode"
              required
              onChange={(event) => setCompanyCode(event.target.value)}
            />
            <button
              disabled={isDisabled}
              className="main-button"
              onClick={createAccount}
            >
              Créer le compte
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateAccount;
