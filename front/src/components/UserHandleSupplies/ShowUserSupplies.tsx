import { useEffect, useState } from "react";
import { Supply } from "../../infrastructure/types";
import UserSupply from "./UserSupply";

const ShowUserSupplies = () => {
  const [supplies, setSupplies] = useState<Supply[]>([]);

  console.log(supplies);
  useEffect(() => {
    const reqInit: RequestInit = {
      method: "GET",
      mode: "cors",
      credentials: "include",
    };

    fetch(`${process.env.REACT_APP_URL_BACK}/show-user-supplies`, reqInit)
      .then((response) => response.json())
      .then((datas) => setSupplies(datas.supplies));
  }, []);

  return (
    <article className="user-supplies">
      <h2>Vos fournitures</h2>
      <section className="your-supplies">
        {supplies.map((supply) => (
          <UserSupply key={supply.id} supply={supply} />
        ))}
      </section>
    </article>
  );
};

export default ShowUserSupplies;
