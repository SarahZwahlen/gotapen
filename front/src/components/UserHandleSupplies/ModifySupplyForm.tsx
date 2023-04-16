import { useState } from "react";
import { HTTPClientPOSTformData } from "../../clientsHTTP/HTTPClient";

const ModifySupplyForm = (props: any) => {
  const [supplyName, setSupplyName] = useState<string>(props.name!);
  const [image, setImage] = useState<File | null>(null);

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSupplyName(event.target.value);
  };

  const updateImagePath = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target.files) {
      return;
    }
    setImage(event.target.files[0]);
  };

  const validateChanges = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    console.log("validate");

    const formData = new FormData();
    formData.append("name", supplyName);
    formData.append("id", props.id!);
    if (image) {
      formData.append("image", image);
    }

    await HTTPClientPOSTformData(formData, "modify-supply");
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
