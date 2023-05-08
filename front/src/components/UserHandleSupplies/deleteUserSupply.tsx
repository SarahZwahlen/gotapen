import { useNavigate } from "react-router-dom";
import { HTTPClientDELETE } from "../../clientsHTTP/HTTPClient";
import { Supply } from "../../infrastructure/types";

const DeleteUserSupply = (props: Pick<Supply, "id">) => {
  const navigate = useNavigate();
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

export default DeleteUserSupply;
