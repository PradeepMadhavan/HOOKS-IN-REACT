import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
 

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeDropdown);
    return () => {
      document.removeEventListener('mousedown', closeDropdown);
    };
  }, []);

  return (
    <>
      
    <div>
      <nav className="navbar navbar-bg navbar-expand-lg bg-warning text-dark p-3">
        <div className="container-fluid" id='same'>
         <div className='container'> <NavLink to="/" className="navbar-brand text-light fs-2">
            <b>Crud operation</b>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button></div>
        
          <div className=" collapse navbar-collapse flex" id="navbarSupportedContent">
         
            <ul className="what navbar-nav me-auto mb-2 mb-lg-0">
            <small className="nav-item">
                <NavLink
                  className="hwa nav-link active p-1 mt-2 me-3 fw-small text-dark fs-4"
                  to="/"
                >
                  Home
                </NavLink>
              </small>

              <li className="nav-item dropdown">
                <a
                  className="hwa nav-link dropdown-toggle text-dark mt-2 fs-5"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                 <span className='fw-bold fs-5 text-dark'>Hooks with API</span> 
              </a> 
                <ul 
                id='bgs'
                  className="dropdown-menu hooks"
                  aria-labelledby="navbarDropdown"
                >
                  <li className="dropsec nav-item">
                    <NavLink
                      className="nav-link text-dark active mt-2 fs-5"
                      to="/form"
                    >
                      useState-API
                    </NavLink>
                  </li>
                  <li className="dropsec nav-item">
                    <NavLink
                      className="nav-link text-dark active mt-2 fs-5"
                      to="/reduform"
                    >
                      useReducer-API
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="dropsec nav-link text-dark active mt-2 fs-5"
                      to="/conform"
                    >
                      useContext-API
                    </NavLink>
                  </li>
                 
                </ul>
              </li>        
            </ul>
          </div>
        </div>
      </nav>
    </div>
    </>
  );
}
 