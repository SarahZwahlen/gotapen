import { ChangeEvent, useState } from "react";
import { HTTPClientPOSTformData } from "../../clientsHTTP/HTTPClient";

const CreateSupply = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createSupply = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    const result = await HTTPClientPOSTformData(formData, "add-supply");
    if (result.error) {
      setErrorMessage(result.error);
    }
  };

  const updateSupplyName = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target.files) {
      return;
    }
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  return (
    <>
      <h2>Créer une fourniture</h2>
      <div className="create-supply-form">
        <form>
          <label htmlFor="name">Nom de la fourniture</label>
          <input onChange={updateSupplyName} name="name" type="text" />
          <label htmlFor="image">Image</label>
          <input name="image" onChange={updateImage} type="file" />
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
