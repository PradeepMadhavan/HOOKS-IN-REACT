import React, { useState, useEffect } from "react";

import { Form } from "semantic-ui-react";
import { createUser, updateuser, getUser } from "../../Service/Api";

import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { ProgressSpinner } from "primereact/progressspinner";
import {NavLink} from "react-router-dom"

 const FormState = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [phone, setPhoneno] = useState("");
  const [phoneError, setPhonenoError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [cpassword, setConfirmPassword] = useState("");
  const [cpasswordError, setConfirmPasswordError] = useState("");

  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");

  const [language, setLanguage] = useState("");

  const [languageError, setLanguageError] = useState("");
  const [dob, setDateofBirth] = useState("");
  const [dobError, setDateofBirthError] = useState("");
  const [id, setId] = useState("");
  const router = useParams();

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false); 
  

  const nameRegex = /^[a-zA-Z ]{3,10}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^\d{10}$/;
  
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;

  const dobRegex = /^\d{4}-\d{2}-\d{2}/;

  const handleFieldChange = (event, regex, errorSetter) => {
    const value = event.target.value;
    if (!value) {
      errorSetter(`${event.target.name}  is required*`);
    } else if (typeof regex === "function" && !regex(value)) {
      errorSetter(`Invalid ${event.target.name} format*`);
    } else if (regex instanceof RegExp && !regex.test(value)) {
      errorSetter(`Invalid ${event.target.name} format*`);
    } else {
      errorSetter("");
    }
  };

  const validateForm = () => {
    let valid = true;

    handleFieldChange(
      { target: { name: "firstName", value: firstName } },
      nameRegex,
      setFirstNameError
    );
    handleFieldChange(
      { target: { name: "Email", value: email } },
      emailRegex,
      setEmailError
    );
    handleFieldChange(
      { target: { name: "Phone Number", value: phone } },
      phoneRegex,
      setPhonenoError
    );
    handleFieldChange(
      { target: { name: "Password", value: password } },
      passwordRegex,
      setPasswordError
    );

    if (!cpassword) {
      setConfirmPasswordError("Confirm password is required*");
      valid = false;
    } else if (cpassword !== password) {
      setConfirmPasswordError("Passwords do not match*");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!language) {
      setLanguageError("Please select a language*");
      valid = false;
    } else {
      setLanguageError("");
    }

    if (!gender) {
      setGenderError("Please select a gender*");
      valid = false;
    } else {
      setGenderError("");
    }

    handleFieldChange(
      { target: { name: "Date of Birth", value: dob } },
      dobRegex,
      setDateofBirthError
    );

    return valid;
  };

  const postData = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      await createUser({
        firstName,
        email,
        phone,
        password,
        cpassword,
        language,
        gender,
        dob,
      });
      toast.success("User Data created successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Error in the POST API", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
    navigate("/list");
  };

  const handleGenderChange = (event, errorSetter) => {
    const value = event.target.value;
    errorSetter("");
  };
  const genderSubmit = (event, errorSetter) => {
    if (event.target.checked) {
      event.target.checked = false;
      setGender("");
      errorSetter(`${event.target.name} is required*`);
    } else {
      event.target.checked = true;
      setGender(event.target.value);
      errorSetter("");
    }
  };

  const handleLanguageChange = (event, errorSetter) => {
    const value = event.target.value;
    if (!value) {
      errorSetter(`${event.target.name} is required*`);
    } else {
      errorSetter("");
    }
  };

  const updateUsers = async () => {
    const isvalid = validateForm();
    if (!isvalid) {
      toast.error("Enter the Required Fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setIsLoading(true);
    try {
      await updateuser(id, {
        firstName,
        email,
        phone,
        password,
        cpassword,
        language,
        gender,
        dob,
      });
      setIsLoading(true);
      toast.success("User Data Updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/list");
    } catch (error) {
      setIsLoading(false);
      toast.error("Error in the UPDATE API", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getId = async (id) => {
    console.log("fydIYGF;OUEDO");
    setIsLoading(true);
    try {
     
      const res = await getUser(id);
  
      setId(res.data.id);
      setFirstName(res.data.firstName);
      setEmail(res.data.email);
      setPhoneno(res.data.phone);
      setPassword(res.data.password);
      setConfirmPassword(res.data.cpassword);
      setLanguage(res.data.language);
      setGender(res.data.gender);
      setDateofBirth(res.data.dob);
    } catch (error) {
      setId("");
      setFirstName("");
      setEmail("");
      setPhoneno("");
      setPassword("");
      setConfirmPassword("");
      setLanguage("");
      setGender("");
      setDateofBirth("");
      toast.error("Error in the GET_ID API", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    } 
  };

  useEffect(() => {
    if (router.id) {
      getId(router.id);
      setIsEditing(true);
    }
  }, [router.id]);

  
  const handleClick = () => {
    const isFormValid = validateForm(); // Validate the form fields

   
    const isfirstNameValid = nameRegex.test(firstName);
    const isEmailValid = emailRegex.test(email);
    const isPhoneValid = phoneRegex.test(phone);
    const isPasswordValid = passwordRegex.test(password);
    const isCPasswordValid = cpassword === password;
    const isDobValid = dobRegex.test(dob);

    if (
      isFormValid &&
      isfirstNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isPasswordValid &&
      isCPasswordValid &&
      isDobValid
    ) {
      if (isEditing) {
        updateUsers(); 
      } else {
        postData(); 
      }
    } else {
      toast.error("Enter the Required Fields or Fix Validation Errors", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
     
      <div className="contanier-fluid pb-5   d-flex justify-content-center  bacc" id="pics">
        
      <div className="contback mt-2">
        <NavLink to="/list" className="">
          <button className="btn btn-info">Back</button>
        </NavLink>{" "}
      </div>
        <div className="col-12 col-md-9 col-lg-6 card shadow mt-5 pb-2 mb-5 pt-3 p-2" id="cove">
          <h1 className="text-center pt-4"> <span className="shadow-sm bg-dark text-light  bg-opacity-75 rounded p-1">UseState Form</span></h1>

          <Form className="col-12 row p-2">
            <Form.Field className="col-md-6 p-2">
              <label className="fw-bold">
                Name <span className="text-success"></span>
              </label>
              <input
                className={`form-control ${
                  firstNameError ? "is-invalid" : firstName ? "is-valid" : ""
                }`}
                type="name"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                  handleFieldChange(event, nameRegex, setFirstNameError);
                }}
                placeholder="Enter your Name"
              />
              <p className="error-message text-danger mt-2">{firstNameError}</p>
            </Form.Field>
            <br />
            <Form.Field className="col-md-6 p-2">
              <label className="fw-bold">
                Email <span className="text-success"></span>
              </label>
              <input
                type="email"
                className={`form-control ${
                  emailError ? "is-invalid" : email ? "is-valid" : ""
                }`}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  handleFieldChange(event, emailRegex, setEmailError);
                }}
                placeholder="Enter your Email..."
                // required
              />
              <p className="error-message text-danger mt-2">{emailError}</p>
            </Form.Field>
            <Form.Field className="col-md-6 p-2">
              <label className="fw-bold">
                Phone Number <span className="text-success"></span>
              </label>
              <input
                type="number"
                className={`form-control ${
                  phoneError ? "is-invalid" : phone ? "is-valid" : ""
                }`}
                Phoneno="Phone"
                value={phone}
                onChange={(event) => {
                  setPhoneno(event.target.value);
                  handleFieldChange(event, phoneRegex, setPhonenoError);
                }}
                placeholder="Enter your Phone..."
                required
              />
              <p className="error-message text-danger mt-2">{phoneError}</p>
            </Form.Field>
            <br />{" "}
            <Form.Field className="col-md-6 p-2">
              <label className="fw-bold ">Language </label>
              <select
                value={language}
                
                onChange={(event) => {
                  setLanguage(event.target.value);
                  handleLanguageChange(event, setLanguageError);
                }}
                placeholder="Enter Language...."
               
                className={`form-control ${
                  languageError ? "is-invalid" : language ? "is-valid" : ""
                }`}
              >
                <option value="">Select a language</option>
                <option value="Tamil">Tamil</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Hindi">Telugu</option>
                <option value="Hindi">kannada</option>
              </select>

              <p className="error-message text-danger mt-2">{languageError}</p>
            </Form.Field>
            <br />
            <div className="col-md-6 mt-2">
              <label className="fw-bold">
                Password <span className="text-success"></span>
              </label>
              <div className="">
                <div className="input-field-wrapper">
                  <input
                    className={`form-control ${
                      passwordError ? "is-invalid" : password ? "is-valid" : ""
                    }`}
                    name="Password"
                   
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      handleFieldChange(event, passwordRegex, setPasswordError);
                    }}
                    placeholder="Enter your Password"
                  
                  />
                </div>
              </div>
              <p className="error-message text-danger mt-2">{passwordError}</p>
            </div>
            <div className="col-md-6 mt-2">
              <label className="fw-bold">
                Confirm Password <span className="text-success"></span>
              </label>
              <div className="">
                <div className="input-field-wrapper">
                  <input
                    className={`form-control ${
                      cpasswordError
                        ? "is-invalid"
                        : cpassword
                        ? "is-valid"
                        : ""
                    }`}
                    name="Confirm password"
                  
                    value={cpassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                      handleFieldChange(
                        event,
                        (value) => value === password,
                        setConfirmPasswordError
                      );
                    }}
                    placeholder="Enter your Confirm password"
                  />
                </div>
              </div>

              <p className="error-message text-danger mt-2">{cpasswordError}</p>
            </div>
            <br />
            <Form.Field className="col-md-6 p-2">
              <label className="fw-bold">
                Gender <span className="text-success">*:</span>
              </label>
              <div className="radio-group d-flex">
                {["Male", "Female", "Others"].map((option) => (
                  <div key={option}>
                    <input
                      type="radio"
                      name="Gender"
                      value={option}
                      checked={gender === option}
                      onChange={(event) => {
                        handleGenderChange(event, setGenderError);
                        setGender(event.target.value);
                      }}
                      onClick={(event) => {
                        genderSubmit(event, setGenderError);
                      }}
                      required
                    />
                    <label className="me-2">{option}</label>
                  </div>
                ))}
              </div>  
              <p className="error-message text-danger">{genderError}</p>
            </Form.Field>
            <br />
            <Form.Field className="col-md-6 p-2">
              <label className="fw-bold">
                Date of Birth <span className="text-success"></span>
              </label>
              <input
                className={`form-control ${
                  dobError ? "is-invalid" : dob ? "is-valid" : ""
                }`}
                type="date"
                dobno="dob"
                value={dob}
                onChange={(event) => {
                  setDateofBirth(event.target.value);
                  handleFieldChange(event, dobRegex, setDateofBirthError);
                }}
                placeholder="Enter your dob..."
                required
              />
              {/* <p className="error-message text-danger fw-bold mt-2"> */}
              <p className="error-message text-danger mt-2">{dobError}</p>
            </Form.Field>
            {/* <Button
              className="btn btn-primary w-25 mt-3 ms-5"
              onClick={handleClick}
            >
              {isEditing ? "Save " : "Submit"}
            </Button> */}
            {/* <div className="text-center">
              <Button
                className="btn btn-primary mt-3  custom-submit-button"
                onClick={handleClick}
              >
                {isEditing ? "Update" : "Submit"}
              </Button>

              <NavLink to="/list" className="nav-link">
        <Button className="btn-grad   btn-grad1"> Back
         
        </Button>{" "}
      </NavLink>
            </div> */}
            <div className="text-center ">
              <button className="sub w-25 bg-info p-2 rounded" onClick={handleClick}>
                {isEditing ? "Update" : "Submit"}
              </button>
            </div>
          </Form>
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
        <div>
        </div>
      </div>
    </>
  );
};
export default FormState;