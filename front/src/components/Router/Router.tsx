import { Routes, Route } from "react-router-dom";
import Account from "../../pages/Account";
import Home from "../../pages/Home";
import PageNotFound from "../../pages/PageNotFound";
import UserSharingRequests from "../../pages/UserSharingRequests";
import UserHandleSupplies from "../../pages/UserSupplies";
import { useAuthent } from "../../security/authContext";

const Router = () => {
  const { isLogged, isLoading } = useAuthent();

  if (isLoading) {
    return <h1>Chargement...</h1>;
  }

  return (
    <Routes>
      <Route index element={<Home />} />
      {isLogged && (
        <>
          <Route path="/account" element={<Account />} />
          <Route
            path="/handle-user-supplies"
            element={<UserHandleSupplies />}
          />
          <Route
            path="/handle-sharing-requests"
            element={<UserSharingRequests />}
          />
        </>
      )}
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
