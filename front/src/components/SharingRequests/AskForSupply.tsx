import { Supply } from "../../infrastructure/types";

const AskForSupply = (props: Partial<Supply>) => {
  const askForSupply = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(props.id);

    const reqInit: RequestInit = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        supplyId: props.id,
      }),
    };

    fetch(`${process.env.REACT_APP_URL_BACK}/send-sharing-request`, reqInit)
      .then((response) => response.json())
      .then((datas) => console.log(datas))
      .catch((error) => console.log(error));
  };
  return (
    <button className="small-button" onClick={askForSupply}>
      Demander
    </button>
  );
};

export default AskForSupply;
