import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';

function MyUsers(){
    return(
        <div className="container mt-4">
            <div className="row">
                 <aside className='col-md-3'>
                    <TeacherSidebar />
                 </aside>
                 <section className='col-md-9'></section>
                <div className='card mt-4'>
                    <h5 className='card-header'>User List</h5>
                    <div className='card-body'>
                        <table  className='table table-striped table-hover table-bordered border-primary table-default'>
                            <thead>
                                <tr className='table-secondary'>
                                    <th>Name</th>
                                    <th>Enrolled Course</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td>Php Development</td>
                                <td><Link to="/">Deepika Goel</Link></td>
                                <td>
                                    <button className='btn btn-danger btn-sm active'>Delete</button>
                                </td>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default MyUsers;
