import { useState } from "react";
import DeleteUserSupply from "./deleteUserSupply";
import ModifySupplyForm from "./ModifySupplyForm";
import ModifyUSerSupply from "./modifyUserSupply";

const UserSupply = (props: any) => {
  const [formVisibility, setFormVisibility] = useState<boolean>(false);
  return (
    <div className="user-supply">
      <div>
        <div className="user-supply-infos">
          <img
            src={`${process.env.REACT_APP_URL_BACK}` + props.supply.imagePath}
            alt={props.supply.name}
          />
          <p>{props.supply.name}</p>
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
