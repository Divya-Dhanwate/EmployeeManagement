import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {

  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate(); // ✅ use 'navigate' instead of 'navigator'

  useEffect(() => {
getEmployees();
  }, []);

  function getEmployees(){
        listEmployee()
      .then(response => setEmployee(response.data))
      .catch(error => console.error(error));
  }
  function addNewEmployee() {
    navigate('/add-employee'); // ✅ navigate works correctly now
  }
  
  function updateEmployee (id) {

     navigate(`/edit-employee/${id}`)
  }
  function removeEmployee(id){
console.log(id)

deleteEmployee(id).then((response)=>{
getEmployees()
}).catch(error =>{
  console.error(error);
})
  }
  return (
    
    <div className="container mt-4">
      <h2 className="text-center">List of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
              <td><button className="btn btn-info" onClick={()=>updateEmployee(emp.id)}>Update</button></td>
              <td><button className="btn btn-danger" onClick={()=>removeEmployee(emp.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListEmployeeComponent;
