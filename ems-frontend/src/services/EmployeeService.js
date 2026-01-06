import axios from "axios";

const REST_API_BASE_URL ='http://localhost:8083/api/employees';
export const listEmployee =() => {  return axios.get(REST_API_BASE_URL);

}

export const createEmployee =(employee) => axios.post(REST_API_BASE_URL ,employee);

export const getEmployee =(employeeId) =>axios.get(REST_API_BASE_URL + '/' +employeeId)

export const updateEmployee =(employeeId ,updateEmployee) =>axios.put(REST_API_BASE_URL + '/' +employeeId, updateEmployee)


export const deleteEmployee =(employeeId , deleteEmployee) =>axios.delete(REST_API_BASE_URL + '/' + employeeId);
