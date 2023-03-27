import { ChangeEvent, useState } from "react";

const CreateSupply = () => {
  const [name, setName] = useState("");
  const [imagePath, setImagePath] = useState("");

  const createSupply = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("create the supply");
    const formData = new FormData();
    formData.append("name", name);

    const reqInit: RequestInit = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: formData,
    };

    fetch("http://localhost:3001/add-supply", reqInit)
      .then((response) => response.json())
      .then((datas) => console.log(datas))
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
      <form encType="multipart/form-data">
        <label htmlFor="name">Nom de la fourniture</label>
        <input onChange={updateSupplyName} name="name" type="text" />
        <label htmlFor="image">Image</label>
        <input name="image" onChange={updateImagePath} type="file" />
        <button onClick={createSupply}>Créer la fourniture</button>
      </form>
    </>
  );
};

export default CreateSupply;
