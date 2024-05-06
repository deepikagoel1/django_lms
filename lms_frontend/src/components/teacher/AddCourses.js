import {Link} from 'react-router-dom';
import TeacherCourses from './TeacherCourses';
import {Routes as Switch, Route} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';

function AddCourses()
{
    return(
        
        <div className="container mt-4">
            <div className="row">
                 <aside className='col-md-3'>
                    <TeacherSidebar />
                 </aside>
                 <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Add Course</h5>
                        <div className='card-body'>
                                <div className="mb-3 row">
                                    <label for="full name" className="col-sm-2 col-form-label active">Title</label>
                                    <div className="col-sm-10">
                                    <input type="text" className="form-control" id="fullname"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control'></textarea>
                                    </div>
                                </div>
                                
                                <div className="mb-3 row">
                                    <label for="inputFile" className="col-sm-2 col-form-label active">Course Video</label>
                                    <div className="col-sm-10">
                                    <input type="file" className="form-control" id="inputfile" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="inputFile" className="col-sm-2 col-form-label active">Course Image</label>
                                    <div className="col-sm-10">
                                    <input type="file" className="form-control" id="inputfile" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="description" className="col-sm-2 col-form-label">Technologies</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control'></textarea>
                                    </div>
                                </div>
                                    <hr />
                                    <button className='btn btn-primary'>Submit</button>
                                
                            </div>
                        </div>
                 </section>
            </div>
        </div>
    )
}

export default AddCourses;