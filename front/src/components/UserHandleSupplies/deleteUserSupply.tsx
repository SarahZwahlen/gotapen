import { Supply } from "../../infrastructure/types";

const deleteUserSupply = (props: Pick<Supply, "id">) => {
  const deleteSupply = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const reqInit: RequestInit = {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        supplyId: props.id,
      }),
    };

    fetch("http://localhost:3001/delete-supply", reqInit)
      .then((response) => response.json())
      .then((datas) => console.log(datas))
      .catch((error) => console.log(error));
  };
  return (
    <button className="secondary-button" onClick={deleteSupply}>
      Supprimer
    </button>
  );
};

export default deleteUserSupply;
