import { Supply } from "../../infrastructure/types";

const GiveBackSupply = (props: Partial<Supply>) => {
  const giveBackSupply = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const reqInit: RequestInit = {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        supplyId: props.id,
      }),
    };

    fetch("http://localhost:3001/give-back-supply", reqInit)
      .then((response) => response.json())
      .then((datas) => console.log(datas))
      .catch((error) => error);
  };
  return (
    <button className="secondary-button" onClick={giveBackSupply} id={props.id}>
      Rendre la fourniture
    </button>
  );
};

export default GiveBackSupply;
