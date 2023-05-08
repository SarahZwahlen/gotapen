import { useState } from "react";
import Layout from "../components/Layout";
import HandleEmployees from "../components/BackOffice/HandleEmployees";
import "../assets/scss/backoffice.scss";

const BackOffice = () => {
  const [isHandleVisible, setIsHandleVisible] = useState<boolean>(false);
  return (
    <Layout>
      <h2>Here is the back office !</h2>
      <article>
        <button
          className="main-button"
          onClick={(e) => {
            e.preventDefault();
            setIsHandleVisible(!isHandleVisible);
          }}
        >
          Voir la liste des employés
        </button>
      </article>
      {isHandleVisible && <HandleEmployees />}
    </Layout>
  );
};

export default BackOffice;
