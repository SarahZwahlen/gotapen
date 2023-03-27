import { useState } from "react";
import Layout from "../components/Layout";
import CreateAccount from "../components/Log/CreateAccount";
import Login from "../components/Log/Login";
const Home = () => {
  const [loginFormVisibility, setLoginFormVisibility] = useState(false);
  const [createAccountFormVisibility, setCreateAccountFormVisibility] =
    useState(false);

  return (
    <Layout>
      <div>
        <h1>Home</h1>
        <Login
          setLoginFormVisibility={setLoginFormVisibility}
          loginFormVisibility={loginFormVisibility}
          setCreateAccountFormVisibility={setCreateAccountFormVisibility}
          createAccountFormVisibility={createAccountFormVisibility}
        />
        <CreateAccount
          setLoginFormVisibility={setLoginFormVisibility}
          loginFormVisibility={loginFormVisibility}
          setCreateAccountFormVisibility={setCreateAccountFormVisibility}
          createAccountFormVisibility={createAccountFormVisibility}
        />
      </div>
    </Layout>
  );
};

export default Home;
