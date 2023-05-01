import Layout from "../components/Layout";
import { useAuthent } from "../security/authContext";
import "../assets/scss/account.scss";
import { useState } from "react";
import { User } from "../infrastructure/types";
import { HTTPClientPUTappJson } from "../clientsHTTP/HTTPClient";

const Account = () => {
  const [updateDataFormVisibility, setupdateDataFormVisibility] =
    useState<boolean>(false);
  const [firstname, setFirstname] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const userDatas = useAuthent();

  const updateUserDatas = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const datas: Partial<User> = {};
    if (firstname) {
      datas.firstname = firstname;
    }
    if (surname) {
      datas.surname = surname;
    }
    if (email) {
      datas.email = email;
    }
    if (password) {
      datas.password = password;
    }

    HTTPClientPUTappJson(datas, "modify-user");
  };

  return (
    <Layout>
      <h2>Votre profil</h2>
      <div className="current-user">
        <p>Prénom : {userDatas.user?.firstname}</p>
        <p>Nom : {userDatas.user?.surname}</p>
        <p>Email : {userDatas.user?.email}</p>
        <button
          className="secondary-button"
          onClick={(e) => {
            e.preventDefault();
            setupdateDataFormVisibility(!updateDataFormVisibility);
          }}
        >
          Changer
        </button>
      </div>

      {updateDataFormVisibility && (
        <form>
          <label htmlFor="firstname">Nouveau prénom : </label>
          <input
            name="firstname"
            type="text"
            placeholder={userDatas.user?.firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />
          <label htmlFor="surname">Nouveau nom : </label>
          <input
            name="surname"
            type="text"
            placeholder={userDatas.user?.surname}
            onChange={(event) => setSurname(event.target.value)}
          />
          <label htmlFor="email">Nouvel email : </label>
          <input
            name="email"
            type="text"
            placeholder={userDatas.user?.email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="password">Nouveau mot de passe : </label>
          <input
            name="password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="secondary-button" onClick={updateUserDatas}>
            Changer
          </button>
        </form>
      )}
    </Layout>
  );
};

export default Account;
