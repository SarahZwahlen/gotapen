import { ChangeEvent, useState } from "react";

const CreateSupply = () => {
  const [name, setName] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createSupply = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);

    const reqInit: RequestInit = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: formData,
    };

    fetch(`${process.env.REACT_APP_URL_BACK}/add-supply`, reqInit)
      .then((response) => response.json())
      .then((datas) => {
        setErrorMessage(datas.error);
      })
      .catch((error) => console.log(error));
  };

  const updateSupplyName = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const updateImagePath = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setImagePath(event.target.value);
  };
  return (
    <>
      <h2>Créer une fourniture</h2>
      <div className="create-supply-form">
        <form encType="multipart/form-data">
          <label htmlFor="name">Nom de la fourniture</label>
          <input onChange={updateSupplyName} name="name" type="text" />
          <label htmlFor="image">Image</label>
          <input name="image" onChange={updateImagePath} type="file" />
          {errorMessage && <p className="user-error">{errorMessage}</p>}
          <button className="secondary-button" onClick={createSupply}>
            Créer la fourniture
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateSupply;
