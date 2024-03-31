// import React from 'react';
// import  {useState}  from 'react';
// import { Link } from 'react-router-dom';
// import Logo from '../images/Logo.jpg';
// import { AiTwotoneHome } from "react-icons/ai";
// import "../App.css";
// // import Announcements from '../pages/Announcements';

// const Navbar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const closeDropdown = () => {
//     setIsDropdownOpen(false);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light shadow fixed-top">
//       <div className="container-fluid">
//         <a className="navbar-brand mr-auto" href="/">
         
//           <img src={Logo} alt="Logo" style={{ borderRadius: '90%', width: '95px',height:"90px",marginLeft:"55px" }} />
//         </a>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//           onClick={toggleMenu}
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
//         <div className="navbar-nav mx-auto" style={{marginTop:"50px"}}>
//   <a className={`nav-link d-flex align-items-center ${window.location.pathname === '/' ? 'active' : ''}`} href="/" onClick={closeMenu} style={{marginRight: '10px', color: 'white'}}> <AiTwotoneHome/>Home</a>
//   <a className={`nav-link ${window.location.pathname === '/announcements' ? 'active' : ''}`} href="/announcements" onClick={closeMenu} style={{marginRight: '10px', color: 'white'}}>Announcements</a>
//   <div className={`nav-item dropdown ${isDropdownOpen ? 'show' : ''}`}>
//     <a
//       className={`nav-link dropdown-toggle`}
//       href="#"
//       id="resourcesDropdown"
//       role="button"
//       data-toggle="dropdown"
//       aria-haspopup="true"
//       aria-expanded={isDropdownOpen}
//       onClick={toggleDropdown}
//       style={{color:"white"}}
//     >
//       Resources
//     </a>
//     <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="resourcesDropdown">
//       <a className="dropdown-item" href="/resources/accepted-projects" onClick={closeDropdown}>Accepted Projects</a>
//       <a className="dropdown-item" href="/resources/publications" onClick={closeDropdown}>Publications</a>
//     </div>
//   </div>
//   <a className={`nav-link ${window.location.pathname === '/institutes' ? 'active' : ''}`} href="/institutes" onClick={closeMenu} style={{marginRight: '10px', color: 'white'}}>Institutes</a>
//   <a className={`nav-link ${window.location.pathname === '/collaborations' ? 'active' : ''}`} href="/collaborations" onClick={closeMenu} style={{marginRight: '10px', color: 'white'}}>Collaborations</a>
//   <a className={`nav-link ${window.location.pathname === '/aboutus' ? 'active' : ''}`} href="/aboutus" onClick={closeMenu} style={{marginRight: '10px', color: 'white'}}>About Us</a>
//   <a className={`nav-link ${window.location.pathname === '/contactus' ? 'active' : ''}`} href="/contactus" onClick={closeMenu} style={{marginRight: '10px', color: 'white'}}>Contact Us</a>
//   <a className={`nav-link ${window.location.pathname === '/news' ? 'active' : ''}`} href="/news" onClick={closeMenu} style={{marginRight: '10px', color: 'white'}}>News</a>
//   <a className={`nav-link ${window.location.pathname === '/graph' ? 'active' : ''}`} href="/graph" onClick={closeMenu} style={{marginRight: '10px', color: 'white'}}>Reports</a>
// </div>

//           <div className="navbar-nav ml-auto" >
//               <Link className="nav-link  d-lg-inline btn " to="/login" 
//               style={{backgroundColor: "white", color:"#11676d", border: "solid", borderWidth:"0.5px" , marginRight:'10px', borderRadius:"10px", fontSize: '16px' }} 
//               >Login</Link>


//               <Link className="nav-link d-lg-inline btn " to="/auth/register" 
//               style={{backgroundColor: "white", color:"#11676d", border: "solid",  borderWidth:"0.5px" ,  marginRight:'10px', borderRadius:"10px" , fontSize: '16px'}} 
//               >Register</Link>
//             </div>

          
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import React, {useState, useEffect} from "react";
import axios from 'axios'
import { AppBar, Typography, Toolbar, Avatar, Button} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../images/Logo.jpg';
import { AiTwotoneHome } from "react-icons/ai";
import "../App.css";
// import Announcements from '../pages/Announcements';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedOut = (document.cookie.split(';')[0] === "");
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(null) ;
  const [userName, setUserName] = useState('')
  useEffect(() => {
      const checkAuthentication = async () => {
          try {
            const response = await axios.get('https://research-portal-server-9.onrender.com/check-auth-status');
            const response2 = await axios.get('https://research-portal-server-9.onrender.com/userd/dashboard');
            console.log(response2)
            const isAuthenticated = response.data.isAuthenticated;
            const userName = response2.data.decoded.name
            console.log(isAuthenticated)
            setIsAuthenticated(isAuthenticated)
            setUserName(userName)
 
          
          } catch (error) {
            console.error('Error checking authentication status:', error);
            return false;
          }
        };
        
        // Example usage
         checkAuthentication();

      
  }
  , []);
  
  
  function isLoggedIn() {
      // Check if a user identifier exists in session storage
      //return sessionStorage.getItem('user') !== null;
    console.log(isAuthenticated)
    return isAuthenticated;
    

  }
  
  // Function to perform logout
 
  const logout = async () => {
    try {
      await axios.get('https://research-portal-server-9.onrender.com/logout');
      setIsAuthenticated(false);
      navigate('/login')
      //window.location.href = '/login'; 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  // Example usage:
  if (isLoggedIn()) {
     
      console.log('User is logged in');
  } else {
      console.log(isAuthenticated)
      console.log('User is not logged in');
  }
  console.log("LoggedOut is " + isLoggedOut);
  console.log(document.cookie);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow fixed-top">
      <div className="container-fluid" style={{margin: '0'}}>
        <a className="navbar-brand mr-auto" href="/">
         
          <img src={Logo} alt="Logo" style={{ borderRadius: '90%', width: '95px',height:"90px",marginLeft:"55px" }} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
        <div className="navbar-nav mx-auto" style={{marginTop:"50px"}}>
  <a className={`nav-link d-flex align-items-center ${window.location.pathname === '/' ? 'active' : ''}`} href="/" onClick={closeMenu} style={{marginRight: '10px', color: 'white'}}> <AiTwotoneHome/>Home</a>
  <a className={`nav-link ${window.location.pathname === '/announcements' ? 'active' : ''}`} href="/announcements" onClick={closeMenu} style={{marginRight: '10px', color: 'white'}}>Announcements</a>
  <div className={`nav-item dropdown ${isDropdownOpen ? 'show' : ''}`}>
    <a
      className={`nav-link dropdown-toggle`}
      href="# "
      id="resourcesDropdown"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded={isDropdownOpen}
      onClick={toggleDropdown}
      style={{color:"white"}}
    >
      Resources
    </a>
    <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="resourcesDropdown">
      <a className="dropdown-item" href="/resources/accepted-projects" onClick={closeDropdown}>Accepted Projects</a>
      <a className="dropdown-item" href="/resources/publications" onClick={closeDropdown}>Publications</a>
    </div>
  </div>
  <a className={`nav-link ${window.location.pathname === '/institutes' ? 'active' : ''}`} href="/institutes" onClick={closeMenu} style={{marginRight: '10px', color: 'white'}}>Institutes</a>
  <a className={`nav-link ${window.location.pathname === '/collaborations' ? 'active' : ''}`} href="/collaborations" onClick={closeMenu} style={{marginRight: '10px', color: 'white'}}>Collaborations</a>
  <a className={`nav-link ${window.location.pathname === '/aboutus' ? 'active' : ''}`} href="/aboutus" onClick={closeMenu} style={{marginRight: '10px', color: 'white'}}>About Us</a>
  <a className={`nav-link ${window.location.pathname === '/contactus' ? 'active' : ''}`} href="/contactus" onClick={closeMenu} style={{marginRight: '10px', color: 'white'}}>Contact Us</a>
  <a className={`nav-link ${window.location.pathname === '/news' ? 'active' : ''}`} href="/news" onClick={closeMenu} style={{marginRight: '10px', color: 'white'}}>News</a>
  <a className={`nav-link ${window.location.pathname === '/graph' ? 'active' : ''}`} href="/graph" onClick={closeMenu} style={{marginRight: '10px', color: 'white'}}>Reports</a>
</div>
   
    {isAuthenticated ? (
                        <Stack direction="row" gap="16px" alignItems="center">
                            {/* {user?.result.imageUrl && (
                                 <Avatar  alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                            )} */}
                            {/* {user.result.name && */}
                             
                              <div stye= {{width: '50px'}}>
                              <span style= {{color: 'yellow', marginBottom: '5px'}}  >{`Hi, ${userName}`}  </span> 
                             <Button style = {{marginRight: '0'}} variant="contained"  color="secondary" onClick={logout}>Logout</Button>
                              </div>                                 
                              
                        </Stack>
                    ): (
                      <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Button style = {{backgroundColor: 'white', color: '#11676d', fontWeight: '600', width: '100%'}}  component={Link} to="/login" variant="contained" color="primary">Log in</Button>
                        <span style = {{color: 'yellow'}}>or</span>
                        <Button style = {{backgroundColor: 'white', color: '#11676d', fontWeight: '600', width: '100%'}}   component={Link} to="/auth/register" variant="contained" color="primary">Register</Button>
                   </div>
                   )}   
        </div>
      </div>
    </nav>
  );
}

export default Navbar;