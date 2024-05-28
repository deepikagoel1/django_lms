import {Link} from 'react-router-dom';


function TeacherSidebar()
{
    const teacherId =localStorage.getItem('teacherId');
    return (
        <div className="card" style={{"width": "18rem"}}>
        <h5 className='card-header'>Teacher Dashboard</h5>
        <ul className="list-group list-group-flush">
            <div className="list-group-item">
            <Link to={`/teacher-dashboard/${teacherId}/`} className='list-group-item list-group-item-action'>Teacher Dashboard</Link>
            <Link to="/teacher-courses" className='list-group-item list-group-item-action'> Teacher Courses</Link>
            <Link to="/teacher-add-course" className='list-group-item list-group-item-action'> Add Courses</Link>
            <Link to="/teacher-user-details" className='list-group-item list-group-item-action'> My Users</Link>       
            <Link to="/teacher-profile-setting" className='list-group-item list-group-item-action'> Profile Settings</Link>
            <Link to="/teacher-change-password" className='list-group-item list-group-item-action'> Change Password</Link>
            <Link to="/teacher-logout" className='list-group-item list-group-item-action'> Logout</Link>
            
            </div>
        </ul>
        </div>
    )
}

export default TeacherSidebar;