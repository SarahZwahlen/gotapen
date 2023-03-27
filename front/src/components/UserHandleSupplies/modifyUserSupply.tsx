import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Supply } from "../../infrastructure/types";

const ModifyUSerSupply = (props: Partial<Supply>) => {
  const [formVisibility, setFormVisibility] = useState<boolean>(false);
  const [supplyName, setSupplyName] = useState<string>(props.name!);
  const [imagePath, setImagePath] = useState<string>(props.imagePath!);

  const navigate = useNavigate();

  const showModifyForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setFormVisibility(!formVisibility);
  };

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSupplyName(event.target.value);
  };

  const updateImagePath = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setImagePath(event.target.value);
  };

  const validateChanges = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("validate");

    const formData = new FormData();
    formData.append("name", supplyName);
    formData.append("id", props.id!);
    formData.append("imagePath", imagePath);

    console.log(formData);

    const reqInit: RequestInit = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: formData,
    };

    fetch("http://localhost:3001/modify-supply", reqInit)
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <button onClick={showModifyForm}>Modifier</button>
      {formVisibility && (
        <form encType="multipart/form-data">
          <label htmlFor="name">Nom de la fourniture</label>
          <input type="text" name="name" onChange={updateName} />
          <label htmlFor="image">Image</label>
          <input type="file" name="image" onChange={updateImagePath} />
          <button onClick={validateChanges}>Valider les changements</button>
        </form>
      )}
    </>
  );
};

export default ModifyUSerSupply;
