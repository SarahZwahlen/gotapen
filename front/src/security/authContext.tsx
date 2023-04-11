import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../infrastructure/types";
import { useNavigate } from "react-router-dom";

type AuthentContextType = {
  isLogged: boolean;
  user: User | null;
  isLoading: boolean;
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
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

const useAuthent = () => useContext(AuthentContext);

const AuthentProvider = ({ children }: { children?: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_BACK}/login`,
          {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );
        if (response.status !== 200) {
          return await response.json();
        }
        const userResponse = await response.json();
        setUser(userResponse.user);
        navigate("/account");
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
