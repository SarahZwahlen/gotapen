import { useState } from "react";
import Layout from "../components/Layout";
import CreateAccount from "../components/Log/CreateAccount";
import Login from "../components/Log/Login";
import "../assets/scss/home.scss";
import CreateCompanyAccount from "../components/Log/CreateCompanyAccount";
const Home = () => {
  const [loginFormVisibility, setLoginFormVisibility] =
    useState<boolean>(false);
  const [createAccountFormVisibility, setCreateAccountFormVisibility] =
    useState<boolean>(false);
  const [createCompanyAccountVisibility, setCompanyAcountVisibility] =
    useState<boolean>(false);

  return (
    <Layout>
      <div className="connexion-screen">
        <h1>Home</h1>
        <Login
          setLoginFormVisibility={setLoginFormVisibility}
          loginFormVisibility={loginFormVisibility}
          setCreateAccountFormVisibility={setCreateAccountFormVisibility}
          setCompanyAcountVisibility={setCompanyAcountVisibility}
        />
        <CreateAccount
          setLoginFormVisibility={setLoginFormVisibility}
          setCreateAccountFormVisibility={setCreateAccountFormVisibility}
          setCompanyAcountVisibility={setCompanyAcountVisibility}
          createAccountFormVisibility={createAccountFormVisibility}
        />
        <CreateCompanyAccount
          setLoginFormVisibility={setLoginFormVisibility}
          setCreateAccountFormVisibility={setCreateAccountFormVisibility}
          setCompanyAcountVisibility={setCompanyAcountVisibility}
          createCompanyAccountVisibility={createCompanyAccountVisibility}
        />
      </div>
    </Layout>
  );
};

export default Home;
