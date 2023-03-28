import { useState } from "react";

const ModifySupplyForm = (props: any) => {
  const [supplyName, setSupplyName] = useState<string>(props.name!);
  const [imagePath, setImagePath] = useState<string>(props.imagePath!);

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
    <div className="modify-supply-form">
      <form encType="multipart/form-data">
        <label htmlFor="name">Nom de la fourniture</label>
        <input type="text" name="name" onChange={updateName} />
        <label htmlFor="image">Image</label>
        <input type="file" name="image" onChange={updateImagePath} />
        <button className="secondary-button" onClick={validateChanges}>
          Valider les changements
        </button>
      </form>
    </div>
  );
};

export default ModifySupplyForm;
