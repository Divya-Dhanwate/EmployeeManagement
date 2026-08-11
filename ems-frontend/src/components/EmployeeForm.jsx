import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmployeeForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const { id } = useParams();
  
  const [errors, setError] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    if (id) {
      getEmployee(id, controller.signal)
        .then((response) => {
          if (isMounted) {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
          }
        })
        .catch(error => {
          if (error.name !== 'AbortError') {
            console.error(error);
          }
        });
    }
    return () => {
      controller.abort();
    };
  }, [id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };
      console.log(employee);

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigate('/employees');
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigate('/employees');
          })
          .catch((error) => {
if(error.response && error.response.status===409){
  alert(error.response.data);
}    else{
  console.log(error);
}      });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    setError(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className='text-center mt-2'>Update Employee</h2>;
    } else {
      return <h2 className='text-center mt-2'>Add Employee</h2>;
    }
  }

  return (
    // CHANGE 1: Added 'py-5' vertical breathing padding class to the motion container
    <motion.div className='container py-5 bg-light rounded shadow-sm'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1 }}
    >
      {/* CHANGE 4: Added Bootstrap flexbox centering rule 'justify-content-center' directly to the row element */}
      <div className="row justify-content-center">
        {/* CHANGE 5: Removed duplicate 'offset-md-3 offset-md-3' syntax which broke column rendering engines */}
        {/* CHANGE 6: Replaced with 'col-xl-6 col-lg-8 col-md-10 shadow-sm p-3' to guarantee responsiveness across devices */}
        <div className="card col-xl-6 col-lg-8 col-md-10 shadow-sm p-3">
          {pageTitle()}

          <div className="card-body">
            <form>
              {/* FIRST NAME */}
              <div className="mb-3">
                {/* CHANGE 7: Stripped breaking offset/column layout tags ('col-md-6 offset-md-3 col-sm-12') from standard text labels */}
                <label className="form-label fw-bold">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter employee first name"
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>

              {/* LAST NAME */}
              <div className="mb-3">
                {/* CHANGE 8: Added 'fw-bold' styling class to form label headings for proper contrast structure */}
                <label className="form-label fw-bold">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter employee last name"
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>

              {/* EMAIL */}
              <div className="mb-3">
                {/* CHANGE 9: Added matching 'fw-bold' styling parameters to the email descriptive text layout */}
                <label className="form-label fw-bold">Email:</label>
                <input
                  type="text"
                  placeholder="Enter employee Email"
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>

              {/* CHANGE 10: Wrapped submit element with custom spacing layouts to distance it cleanly from form structures */}
              <div className="mt-4">
                <motion.button 
                  type="button" 
                  className="btn btn-success px-4" // CHANGE 11: Applied horizontal pad expansion 'px-4' for better button clicking surface area
                  onClick={saveOrUpdateEmployee}
                  initial={{ opacity: 0, y: 10 }} // CHANGE 12: Added a minor layout offset entry glide down to the submit interface element
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmployeeForm;
