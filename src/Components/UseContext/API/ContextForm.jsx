import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../../Provider/Provider";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";

import { Link } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";

const ContextForm = () => {
  const { stateEmp, addEmployee, updateEmployees, getidEmployee } =
    useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();
 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    cpass: "",
    language: "",
    gender: "",
    
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getid = async () => {
    await getidEmployee(id);
  };

  useEffect(() => {
    if (id) {
      getid();
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (stateEmp.employeeId) {
      setFormData({
        name: stateEmp.employeeId.name,
        email: stateEmp.employeeId.email,
        phone: stateEmp.employeeId.phone,
        dob: stateEmp.employeeId.dob,
        password: stateEmp.employeeId.password,
        cpass: stateEmp.employeeId.cpass,
        language: stateEmp.employeeId.language,
        gender: stateEmp.employeeId.gender,
        id: stateEmp.employeeId.id,
        
      });
    }
    console.log(stateEmp.employeeId);
  }, [stateEmp.employeeId]);

  const nameRegex = /^[a-zA-Z ]{3,30}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^\d{10}$/;
  // const passwordRegex =
  //   /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
  const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;

  const dobRegex = /^\d{4}-\d{2}-\d{2}/;

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = "Name is required*";
    } else if (!nameRegex.test(formData.name)) {
      errors.name = "Invalid name format*";
    }
    

    if (!formData.email) {
      errors.email = "Email is required*";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format*";
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required*";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Invalid phone number format*";
    }

    if (!formData.password) {
      errors.password = "Password is required*";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = "Invalid password format*";
    }

    if (!formData.cpass) {
      errors.cpass = "Confirm Password is required*";
    } else if (formData.cpass !== formData.password) {
      errors.cpass = "Passwords do not match*";
    }

    if (!formData.language) {
      errors.language = "Language is required*";
    }

    if (!formData.gender) {
      errors.gender = "Gender is required*";
    }

    if (!formData.dob) {
      errors.dob = "Date of Birth is required*";
    } else if (!dobRegex.test(formData.dob)) {
      errors.dob = "Invalid Date of Birth format*";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleFieldChange = (event, regex, fieldName) => {
    const value = event.target.value;
    

    if (regex && !regex.test(value)) {
      setFormErrors({
        ...formErrors,
        [fieldName]:` Invalid ${fieldName} format*`,
      });
    } else {
      setFormErrors({
        ...formErrors,
        [fieldName]: "",
      });
    }

    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        if (id) {
          await updateEmployees(formData);
          toast.success("User Data Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          await addEmployee(formData);
          toast.success("User Data created successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        navigate("/ConList");
      } catch (error) {
        toast.error(`Error in the ${id ? "UPDATE" : "POST"} API, {
          position: toast.POSITION.TOP_RIGHT,
        }`);
      }
    }
  };

  return (
    <div className="pt-4 pb-5 d-flex justify-content-center" id="pics">
       <div className="contback">
            <Link to="/ConList">
              <Button className="rounded-pill " variant="dark">
                Back
              </Button>
            </Link>
          </div>
      <div className=" main-container col-12 col-md-9 col-lg-6 mx-auto p-4 mt-5 mb-5  rounded" id="cove">
        <div className="form-container row">
         
          
          <div className="text-center pb-4"><span className="shadow-sm   bg-dark text-light fs-1 bg-opacity-75 rounded p-1">Use Context</span></div>
          <div className="col-md-6">
            <label className="fw-bold">
              Name 
            </label>
            <input
              className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
              name="Name"
              value={formData.name}
              onChange={(event) => {
                handleFieldChange(event, nameRegex, "name");
              }}
              placeholder="Enter your Name"
              required
            />
            <p className="error-message">{formErrors.name}</p>
          </div>

          <div className="col-md-6">
            <label className="fw-bold">
              E-Mail 
            </label>
            <input
              className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
              name="Email"
              value={formData.email}
              onChange={(event) => {
                handleFieldChange(event, emailRegex, "email");
              }}
              placeholder="Enter your E-mail"
              required
            />
            <p className="error-message">{formErrors.email}</p>
          </div>

          <div className="col-md-6">
            <label className="fw-bold">
              Phone Number 
            </label>
            <input
              className={`form-control ${formErrors.phone ? "is-invalid" : ""}`}
              name="Phone Number"
              value={formData.phone}
              onChange={(event) => {
                handleFieldChange(event, phoneRegex, "phone");
              }}
              placeholder="Enter your Phone Number"
              required
            />
            <p className="error-message">{formErrors.phone}</p>
          </div>

          <div className="col-md-6">
            <label className="fw-bold">
              Date of Birth 
            </label>
            <input
              className={`form-control ${formErrors.dob ? "is-invalid" : ""}`}
              name="Date of Birth"
              type="date"
              value={formData.dob}
              onChange={(event) => {
                handleFieldChange(event, dobRegex, "dob");
              }}
              placeholder="Enter your Date of Birth"
              required
            />
            <p className="error-message">{formErrors.dob}</p>
          </div>

          <div className="col-md-6 mb-3 mx-auto">
            <label htmlFor="password" className="fw-bold text-dark">
              Password:
            </label>
            <input
              className={`form-control ${
                formErrors.password ? "is-invalid" : ""
              }`}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(event) => {
                handleFieldChange(event, passwordRegex, "password");
              }}
              placeholder="Enter your Password"
            />
            {formErrors.password && (
              <div className="text-danger">{formErrors.password}</div>
            )}
          </div>

          <div className="col-md-6 mb-3 mx-auto">
            <label htmlFor="cpass" className="fw-bold text-dark">
              Confirm Password:
            </label>
            <input
              className={`form-control ${formErrors.cpass ? "is-invalid" : ""}`}
              type="password"
              id="cpass"
              name="cpass"
              value={formData.cpass}
              onChange={(event) => {
                handleFieldChange(event, passwordRegex, "cpass");
              }}
              placeholder="Confirm your Password"
            />
            {formErrors.cpass && (
              <div className="text-danger">{formErrors.cpass}</div>
            )}
          </div>

          <div className="col-md-6 mb-3 mx-auto">
            <label htmlFor="language" className="fw-bold text-dark">
              Language:
            </label>
            <select
              className={`form-select ${
                formErrors.language ? "is-invalid" : ""
              }`}
              id="language"
              name="language"
              value={formData.language}
              onChange={(event) => {
                handleFieldChange(event, null, "language");
              }}
            >
              <option value="">Select your Language</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
            </select>
            {formErrors.language && (
              <div className="text-danger">{formErrors.language}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="fw-bold">
              Gender 
            </label>
            <div className=" radio-group d-flex">
              {["Male", "Female", "Others"].map((option) => (
                <div key={option}>
                  <input
                    type="radio"
                    name="Gender"
                    value={option}
                    checked={formData.gender === option}
                    onChange={(event) => {
                      handleFieldChange(event, null, "gender");
                    }}
                    required
                  />
                  <label className="me-2 ">{option}</label>
                </div>
              ))}
            </div>
            <p className="text-danger">{formErrors.gender}</p>
          </div>

          <div className="d-flex justify-content-center">
            <div className="">
              <Button className="rounded-pill mb-4 mt-4" onClick={handleSubmit}>
                {id ? "Update" : "Submit"}
              </Button>
            </div>
          </div>
        </div>
        
      </div>
      {isLoading && (
          <div className="loading-spinner-container">
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          </div>
        )}
    </div>
  );
};

export default ContextForm;