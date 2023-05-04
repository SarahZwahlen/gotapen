import { HTTPClientDELETE } from "../../clientsHTTP/HTTPClient";
import { Supply } from "../../infrastructure/types";

const deleteUserSupply = (props: Pick<Supply, "id">) => {
  const deleteSupply = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    HTTPClientDELETE("delete-supply", {
      supplyId: props.id,
    });
  };
  return (
    <button className="secondary-button" onClick={deleteSupply}>
      Supprimer
    </button>
  );
};

export default deleteUserSupply;
