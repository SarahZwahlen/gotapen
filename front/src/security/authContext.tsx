import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../infrastructure/types";
import { useNavigate } from "react-router-dom";
import { HTTPClientPOSTappJson } from "../clientsHTTP/HTTPClient";

type AuthentContextType = {
  isLogged: boolean;
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<void | { message: string }>;
  logout: () => Promise<void>;
};

const AuthentContext = createContext<AuthentContextType>({
  isLogged: false,
  user: null,
  isLoading: true,
  isAdmin: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

const useAuthent = () => useContext(AuthentContext);

const AuthentProvider = ({ children }: { children?: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await HTTPClientPOSTappJson(
          { email, password },
          "login"
        );
        if (response.error) {
          return response;
        }
        setUser(response.user);
        if (response.user) {
          setIsAdmin(response.user?.role.includes("admin"));
        }
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    try {
      const reqInit: RequestInit = {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: { "content-type": "application/json" },
      };

      await fetch(`${process.env.REACT_APP_URL_BACK}/logout`, reqInit);
      setUser(null);
      setIsAdmin(false);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqInit: RequestInit = {
          method: "GET",
          mode: "cors",
          credentials: "include",
        };

        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_URL_BACK}/account`,
          reqInit
        );
        const datas = await response.json();
        if (datas.isLogged) {
          setUser(datas.datas);
          setIsAdmin(datas.datas.role.includes("admin"));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const authentContext: AuthentContextType = {
    isLogged: user !== null,
    isLoading,
    user,
    isAdmin,
    login,
    logout,
  };

  return (
    <AuthentContext.Provider value={authentContext}>
      {children}
    </AuthentContext.Provider>
  );
};

export { useAuthent, AuthentProvider };
