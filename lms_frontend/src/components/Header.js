import {Link} from 'react-router-dom';



function Header() {
    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
   
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
              <a className="navbar-brand" href="/">Learn Online</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <div className='navbar-nav ms-auto'>
                  
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                  
                  
                  <Link className="nav-link" to="/all-courses">Courses</Link>
                  
                  <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Teachers</a>
                  <ul className="dropdown-menu"  aria-labelledby="navbarDropdown"> 
                  {teacherLoginStatus!=='true' && 
                        <>
                        {/* <li><a className="dropdown-item" href="/teacher-dashboard">Teacher Dashboard</a></li>
                        <li><a className="dropdown-item" href="/teacher-logout">Teacher Logout</a></li>*/
                         } 
                        <li><Link className="dropdown-item" to="/teacher-register">Teacher Register</Link></li>
                        <li><Link className="dropdown-item" to="/teacher-login">Teacher Login</Link></li> 
                  
                        {/* <li><hr className="dropdown-divider"/></li> */}
                        </>
                        }
                        {teacherLoginStatus === 'true' && 
                        <>
                        <li><Link className="dropdown-item" to="/teacher-dashboard">Teacher Dashboard</Link></li>
                        {/* <li><Link className="dropdown-item" to="/teacher-login">Teacher Login</Link></li> */}
                        <li><Link className="dropdown-item" to="/teacher-logout">Teacher Logout</Link></li>
                        </>
                        }
                    </ul>
                    </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Student 
                    </a>
                    <ul className="dropdown-menu"  aria-labelledby="navbarDropdown"> 
                    {studentLoginStatus!=='true' && 
                    <>
                    
                        <li><Link className="dropdown-item" to="/student-register">Student Register</Link></li>
                        <li><Link className="dropdown-item" to="/student-login">Student Login</Link></li>
                        </>
                      }
                        {/* <li><hr className="dropdown-divider"/></li> */}
                        {studentLoginStatus === 'true' && 
                        <>
                        <li><a className="dropdown-item" href="/student-dashboard">Student Dashboard</a></li>
                        <li><a className="dropdown-item" href="/student-logout">Student Logout</a></li>
                        </>
                      }
                    </ul>
                    </li>
                  
                  
                  {/* <Link className="nav-link" to="/about">About Us</Link>
                  
                  
                  <Link className="nav-link" to="/register">Register</Link>
                  
                  
                  <Link className="nav-link" to="/login">Login</Link> */}
                  
                  </div>
              </div>
          </div>
          </nav>
    );
  }
  
  export default Header;
  