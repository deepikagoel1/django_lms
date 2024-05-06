import {Link} from 'react-router-dom';
import TeacherCourses from './TeacherCourses';
import {Routes as Switch, Route} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';

function TeacherProfileSetting()
{
    return(
        
        <div className="container mt-4">
            <div className="row">
                 <aside className='col-md-3'>
                    <TeacherSidebar />
                 </aside>
                 <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Teacher Profile Setting</h5>
                        <div className='card-body'>
                                <div className="mb-3 row">
                                    <label for="full name" className="col-sm-2 col-form-label active">Full Name</label>
                                    <div className="col-sm-10">
                                    <input type="text" className="form-control" id="fullname"/>
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
                                <div className="mb-3 row">
                                    <label for="skills" className="col-sm-2 col-form-label">Skills</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control'></textarea>
                                    </div>
                                    <div id="text" className='form-text'>PHP, Python, Javascript, etc.
                                        
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

export default TeacherProfileSetting;