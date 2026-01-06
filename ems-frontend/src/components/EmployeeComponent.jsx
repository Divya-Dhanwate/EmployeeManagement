import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();


  const { id } = useParams();
  const [errors, setError] = useState(
    {
      firstName: '',
      lastName: '',
      email: ''
    }
  )

  useEffect(() => {

    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName)
          setLastName(response.data.lastName)
          setEmail(response.data.email)
        }).catch(error => {
          console.error(error);
        })
    }
  }, [id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {


      const employee = { firstName, lastName, email };
      console.log(employee);

      if(id){
        updateEmployee(id, employee)
.then((response)=>{
  console.log(response.data)
  navigate('/employees');
}).catch((error)=>{
  console.error(error)
})
      }
      else{
      createEmployee(employee).then((response) => {
        console.log(response.data);
        navigate('/employees');
      }).catch((error)=>{
        console.log(error)
      })
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
      return <h2 className='text-center' >Update Employee</h2>
    }
    else {
      return <h2 className='text-center' >Add Employee</h2>
    }
  }


  return (
    <div className='container'>

      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {
            pageTitle()
          }

          <div className="card-body">


            <form>
              {/* FIRST NAME */}
              <div className="mb-3">
                <label className="form-label col-md-6 offset-md-3 col-sm-12">First Name:</label>
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
                <label className="form-label">Last Name:</label>
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
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  placeholder="Enter employee Email"
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}

              </div>

              <button type="button" className="btn btn-success" onClick={saveOrUpdateEmployee}>
                Submit
              </button>
            </form>


          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
