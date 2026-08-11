import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { motion, AnimatePresence } from 'framer-motion'; 
import { deleteEmployee, listEmployee, searchEmployee } from "../services/EmployeeService"; 
import SearchEmployee from "./SearchEmployee"; 

const ListEmployeeComponent = () => {
  // -------------------------------------------------------------
  // 1. STATE INITIALIZATION
  // -------------------------------------------------------------
  const [employee, setEmployee] = useState([]); 
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); 
  const [selectedEmployee, setSelectedEmployee] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1); 
  
  const navigate = useNavigate(); 
  const pageSize = 5; 

  // -------------------------------------------------------------
  // 2. PAGINATION & SLICING LOGIC
  // -------------------------------------------------------------
  const totalPages = Math.ceil(employee.length / pageSize) || 1; 
  const startIndex = (currentPage - 1) * pageSize; 
  const endIndex = startIndex + pageSize; 
  const currentEmployees = employee.slice(startIndex, endIndex); 

  // -------------------------------------------------------------
  // 3. SIDE EFFECTS (useEffect)
  // -------------------------------------------------------------
  useEffect(() => {
    getEmployees(); 
  }, []); 

  useEffect(() => {
    if (searchTerm.trim() === "") {
      getEmployees(); 
    } else {
      searchEmployee(searchTerm)
        .then(response => {
          setEmployee(response.data);
          setCurrentPage(1); 
        }) 
        .catch(error => console.error(error)); 
    } 
  }, [searchTerm]); 

  // -------------------------------------------------------------
  // 4. HANDLER FUNCTIONS
  // -------------------------------------------------------------
  function getEmployees() {
    listEmployee()
      .then(response => setEmployee(response.data))
      .catch(error => console.error(error)); 
  } 

  function addNewEmployee() {
    navigate('/add-employee'); 
  } 

  function updateEmployee(id) {
    navigate(`/edit-employee/${id}`); 
  } 

  const confirmDelete = (emp) => {
    setSelectedEmployee(emp); 
    setShowDeleteConfirmation(true); 
  };

  function removeEmployee() {
    if (!selectedEmployee) return; 
    deleteEmployee(selectedEmployee.id)
      .then(() => {
        setSelectedEmployee(null); 
        getEmployees(); 
        setShowDeleteConfirmation(false); 
      })
      .catch(error => console.error(error)); 
  } 

  const handleSearch = () => {
    searchEmployee(searchTerm)
      .then((response) => {
        setEmployee(response.data);
        setCurrentPage(1);
      })
      .catch((error) => console.error(error)); 
  };

  // -------------------------------------------------------------
  // 5. UI LAYOUT RENDERING
  // -------------------------------------------------------------
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div 
        className="w-full flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8" 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 text-center md:text-left">
          List of Employees
        </h2> 

        {/* Action Bar (Responsive Search & Create) */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center w-full"> 
          <div className="flex gap-2 w-full sm:w-auto"> 
            <div className="flex-1 sm:flex-initial">
              <SearchEmployee searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> 
            </div>
            <motion.button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-xl transition shadow-sm cursor-pointer" 
              onClick={handleSearch} 
              whileTap={{ scale: 0.95 }} 
            > 
              Search 
            </motion.button> 
          </div> 
          <motion.button 
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2 rounded-xl transition shadow-sm cursor-pointer" 
            onClick={addNewEmployee} 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.95 }} 
          > 
            Add Employee 
          </motion.button> 
        </div> 

        {/* Delete Modal Confirmation Overlay */}
        <AnimatePresence>
          {showDeleteConfirmation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div 
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-gray-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <h4 className="text-xl font-bold text-gray-900 mb-2">Confirm Delete</h4>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">{selectedEmployee?.firstName} {selectedEmployee?.lastName}</span>?
                </p>
                <div className="flex gap-3 justify-end">
                  <button 
                    type="button" 
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition cursor-pointer" 
                    onClick={() => setShowDeleteConfirmation(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl transition shadow-sm cursor-pointer" 
                    onClick={removeEmployee}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Employee Table Representation */}
        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full min-w-[700px] text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold text-xs uppercase tracking-wider">
                <th className="px-6 py-4">Employee Id</th>
                <th className="px-6 py-4">Employee First Name</th>
                <th className="px-6 py-4">Employee Last Name</th>
                <th className="px-6 py-4">Employee Email</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700 text-sm">
              {currentEmployees.map((emp, index) => (
                <tr key={emp.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-6 py-4 font-medium text-gray-900">{emp.id}</td>
                  <td className="px-6 py-4">{emp.firstName}</td>
                  <td className="px-6 py-4">{emp.lastName}</td>
                  <td className="px-6 py-4">{emp.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1.5 rounded-lg font-medium text-xs transition shadow-xs cursor-pointer" 
                        onClick={() => updateEmployee(emp.id)}
                      >
                        Update
                      </button>
                      <button 
                        className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1.5 rounded-lg font-medium text-xs transition shadow-xs cursor-pointer" 
                        onClick={() => confirmDelete(emp)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6"> 
          <button 
            className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded-xl text-sm transition border border-gray-200 disabled:cursor-not-allowed cursor-pointer" 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button> 
          <span className="text-sm font-medium text-gray-600">Page {currentPage} of {totalPages}</span> 
          <button 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-xl text-sm transition shadow-sm disabled:cursor-not-allowed cursor-pointer" 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button> 
        </div> 
      </motion.div> 
    </div>
  ); 
}; 

export default ListEmployeeComponent;
