import { HTTPClientPOSTappJson } from "../../clientsHTTP/HTTPClient";
import { Supply } from "../../infrastructure/types";

const AskForSupply = (props: Partial<Supply>) => {
  const askForSupply = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await HTTPClientPOSTappJson({ supplyId: props.id }, "send-sharing-request");
  };
  return (
    <button className="secondary-button" onClick={askForSupply}>
      Demander
    </button>
  );
};

export default AskForSupply;
