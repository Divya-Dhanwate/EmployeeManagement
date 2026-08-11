import axios from "axios";

const REST_API_BASE_URL ='http://localhost:8084/api/employees';


export const createEmployee =(employee) => axios.post(REST_API_BASE_URL ,employee);

export const getEmployee =(employeeId,signal) =>axios.get(REST_API_BASE_URL + '/' +employeeId, { signal })

export const updateEmployee =(employeeId ,updateEmployee) =>axios.put(REST_API_BASE_URL + '/' +employeeId, updateEmployee)

export const searchEmployee=(keyword)=>
    axios.get(`${REST_API_BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`)

export const listEmployee=(page,size)=>{
    return axios.get(`${REST_API_BASE_URL}?page=${page}&size=${size}`);
}

export const deleteEmployee =(employeeId , deleteEmployee) =>axios.delete(REST_API_BASE_URL + '/' + employeeId);
