import { useEffect, useState } from "react";
import DeleteEmployee from "./DeleteEmployee";

const HandleEmployees = () => {
  const [employeesList, setEmployeesList] = useState<any | null>(null);

  useEffect(() => {
    const reqInit: RequestInit = {
      method: "GET",
      mode: "cors",
      credentials: "include",
    };

    fetch(`${process.env.REACT_APP_URL_BACK}/get-employees-list`, reqInit)
      .then((response) => response.json())
      .then((datas) => {
        setEmployeesList(datas.employeesList);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {employeesList && (
        <article className="employees-list">
          {employeesList.map((employee: any) => (
            <div className="employee" key={employee.id}>
              <p className="employee-name">
                {employee.firstname} {employee.surname}
              </p>
              <p>{employee.email}</p>
              <DeleteEmployee id={employee.id} className={"secondary-button"} />
            </div>
          ))}
        </article>
      )}
    </>
  );
};

export default HandleEmployees;
