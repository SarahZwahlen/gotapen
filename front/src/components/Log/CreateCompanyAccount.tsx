import { useEffect, useState } from "react";
import { HTTPClientPOSTappJson } from "../../clientsHTTP/HTTPClient";
import { useNavigate } from "react-router-dom";
import { useAuthent } from "../../security/authContext";

const CreateCompanyAccount = (props: any) => {
  const [formVisibility, setLoginFormVisibility] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  const [firstname, setFirstname] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [joinCode, setJoinCode] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const navigate = useNavigate();
  const { login } = useAuthent();

  useEffect(() => {
    if (email && password && surname && firstname && joinCode && companyName) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password, surname, firstname, joinCode, companyName]);

  const handleFormVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoginFormVisibility(!formVisibility);
    props.setLoginFormVisibility(false);
    props.setCreateAccountFormVisibility(false);
  };

  const createCompanyAccount = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const result = await HTTPClientPOSTappJson(
      {
        email,
        password,
        surname,
        firstname,
        companyName,
        joinCode,
      },
      "create-company-account"
    );

    if (result.isLogged) {
      const errorResponse = await login(email!, password!);
      if (errorResponse) {
        setErrorMessage("Le mot de passe ou l'email est incorrect");
      }
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="create-company-account">
      <button className="main-button" onClick={handleFormVisibility}>
        Créer une nouvelle entreprise
      </button>
      {formVisibility && (
        <>
          <p>
            Afin de créer une nouvelle entreprise, vous devez à la fois créer
            votre profil utilisateur, et le profil de l'entreprise.Vous serez
            donc l'admninistrateur du compte de l'entreprise.
            <br /> Pensez à conserver le code d'accès et le nom de l'entreprise
            utilisé afin de pouvoir le communiquer aux collaborateurs souhaitant
            rejoindre ce groupe.
          </p>
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
              placeholder="Your email"
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
              placeholder="Nom de l'entreprise"
              required
              onChange={(event) => setCompanyName(event.target.value)}
            />
            <label htmlFor="joinCode">
              Mot de passe pour rejoindre l'entreprise
            </label>
            <input
              type="password"
              name="joinCode"
              required
              onChange={(event) => setJoinCode(event.target.value)}
              placeholder="Mot de passe entreprise"
            />
            <button
              disabled={isDisabled}
              className="main-button"
              onClick={createCompanyAccount}
            >
              Créer le compte
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateCompanyAccount;
