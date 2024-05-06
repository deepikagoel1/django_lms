import {Link} from 'react-router-dom';
import MyCourses from './MyCourses';
import {Routes as Switch, Route} from 'react-router-dom';
import Sidebar from './Sidebar';

function ChangePassword()
{
    return(
        
        <div className="container mt-4">
            <div className="row">
                 <aside className='col-md-3'>
                    <Sidebar />
                 </aside>
                 <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>ChangePassword</h5>
                        <div className='card-body'>
                                
                                <div className="mb-3 row">
                                    <label for="inputPassword" className="col-sm-2 col-form-label active">New Password</label>
                                    <div className="col-sm-10">
                                    <input type="password" className="form-control" id="inputPassword" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="inputPassword" className="col-sm-2 col-form-label active">Confirm Password</label>
                                    <div className="col-sm-10">
                                    <input type="password" className="form-control" id="inputPassword" />
                                    </div>
                                </div>
                                    <hr />
                                    <button className='btn btn-primary'>Update Password</button>
                                
                            </div>
                        </div>
                 </section>
            </div>
        </div>
    )
}

export default ChangePassword;