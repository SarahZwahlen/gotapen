import { useState } from "react";
import DeleteUserSupply from "./deleteUserSupply";
import ModifySupplyForm from "./ModifySupplyForm";
import ModifyUSerSupply from "./modifyUserSupply";
import Image from "../Image";

const UserSupply = (props: any) => {
  const [formVisibility, setFormVisibility] = useState<boolean>(false);
  return (
    <div className="user-supply">
      <p
        className={`${props.supply.availability ? "available" : "unavailable"}`}
      >
        {props.supply.availability ? "Disponible" : "Emprunté"}
      </p>
      <div>
        <div className="user-supply-infos">
          <Image imageURL={props.supply.imagePath} alt={props.supply.name} />
          <p className="supply-name">{props.supply.name}</p>
        </div>
        <div className="user-supply-handle-buttons">
          <DeleteUserSupply id={props.supply.id} />
          <ModifyUSerSupply
            formVisibility={formVisibility}
            setFormVisibility={setFormVisibility}
          />
        </div>
      </div>
      {formVisibility && (
        <ModifySupplyForm
          id={props.supply.id}
          name={props.supply.name}
          imagePath={props.supply.imagePath}
        />
      )}
    </div>
  );
};

export default UserSupply;
