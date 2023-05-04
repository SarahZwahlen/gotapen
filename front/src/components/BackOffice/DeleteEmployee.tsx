import { HTTPClientDELETE } from "../../clientsHTTP/HTTPClient";

const DeleteEmployee = (props: { id: string }) => {
  const deleteEmployee = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    HTTPClientDELETE("delete-user", { employeeId: props.id });
  };

  return (
    <button className="secondary-button" onClick={deleteEmployee}>
      Supprimer
    </button>
  );
};

export default DeleteEmployee;
