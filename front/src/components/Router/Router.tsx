import { Routes, Route } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Home from "../../pages/Home";
import PageNotFound from "../../pages/PageNotFound";
import UserSharingRequests from "../../pages/UserSharingRequests";
import UserHandleSupplies from "../../pages/UserSupplies";
import { useAuthent } from "../../security/authContext";
import Account from "../../pages/Account";
import BackOffice from "../../pages/BackOffice";

const Router = () => {
  const { isLogged, isLoading } = useAuthent();
  const { isAdmin } = useAuthent();

  if (isLoading) {
    return <h1>Chargement...</h1>;
  }

  return (
    <Routes>
      <Route index element={<Home />} />
      {isLogged && (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/handle-user-supplies"
            element={<UserHandleSupplies />}
          />
          <Route
            path="/handle-sharing-requests"
            element={<UserSharingRequests />}
          />
          <Route path="/account" element={<Account />} />
          {isAdmin && <Route path="/back-office" element={<BackOffice />} />}
        </>
      )}
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
