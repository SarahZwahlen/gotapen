import { HTTPClientDELETE } from "../../clientsHTTP/HTTPClient";

const DeleteEmployee = (props: any) => {
  const deleteEmployee = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    HTTPClientDELETE("delete-user", { employeeId: props.id });
  };

  return (
    <button className={props.className} onClick={deleteEmployee}>
      Supprimer
    </button>
  );
};

export default DeleteEmployee;
