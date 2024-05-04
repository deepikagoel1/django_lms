import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';

function RecommendedCourses(){
    return(
        <div className="container mt-4">
            <div className="row">
                 <aside className='col-md-3'>
                    <Sidebar />
                 </aside>
                 <section className='col-md-9'></section>
                <div className='card mt-4'>
                    <h5 className='card-header'>Recommended Courses</h5>
                    <div className='card-body'>
                        <table  className='table table-striped table-hover table-bordered border-primary table-default'>
                            <thead>
                                <tr className='table-secondary'>
                                    <th>Name</th>
                                    <th>Created By</th>
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

export default RecommendedCourses;
