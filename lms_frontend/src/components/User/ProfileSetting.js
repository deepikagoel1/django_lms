import {Link} from 'react-router-dom';
import MyCourses from './MyCourses';
import {Routes as Switch, Route} from 'react-router-dom';
import Sidebar from './Sidebar';

function ProfileSetting()
{
    return(
        
        <div className="container mt-4">
            <div className="row">
                 <aside className='col-md-3'>
                    <Sidebar />
                 </aside>
                 <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Profile Setting</h5>
                        <div className='card-body'>
                                <div className="mb-3 row">
                                    <label for="full name" className="col-sm-2 col-form-label active">Full Name</label>
                                    <div className="col-sm-10">
                                    <input type="text" className="form-control" id="fullname"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="interest" className="col-sm-2 col-form-label active">Interest</label>
                                    <div className="col-sm-10">
                                    <input type="text" className="form-control" id="interest"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="email" className="col-sm-2 col-form-label active">Email</label>
                                    <div className="col-sm-10">
                                    <input type="text" className="form-control" id="email"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="inputPassword" className="col-sm-2 col-form-label active">Password</label>
                                    <div className="col-sm-10">
                                    <input type="password" className="form-control" id="inputPassword" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="inputFile" className="col-sm-2 col-form-label active">Profile Photo</label>
                                    <div className="col-sm-10">
                                    <input type="file" className="form-control" id="inputfile" />
                                    </div>
                                </div>
                                    <hr />
                                    <button className='btn btn-primary'>Update Profile</button>
                                
                            </div>
                        </div>
                 </section>
            </div>
        </div>
    )
}

export default ProfileSetting;