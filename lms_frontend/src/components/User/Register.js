import {Link} from 'react-router-dom';

function Register()
{
    return(
        
        <div className="container mt-4">
            <div className="row">
                <div className='col-6 offset-3'>
                    <div className='card'>               
                <h3 className='card-header'>User Registration</h3>
                <div className='card-body'>
                <form>
                        <div className="mb-3">
                            <label for="name" className="form-label">Full Name</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label for="username" className="form-label">Username</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label for="password" className="form-label">Password</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label for="qualification" className="form-label">Qualifications</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label for="course name" className="form-label">Interests in Course Name</label>
                            <textarea className='form-control'>
                            </textarea>
                            <div className="form-text"> 
                                PHP, Python, Javascript, AI
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                </form>
                
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Register;