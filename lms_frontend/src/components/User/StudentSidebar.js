import {Link} from 'react-router-dom';


function StudentSidebar()
{
    return (
        <div className="card" style={{"width": "18rem"}}>
        <h5 className='card-header'>Dashboard</h5>
        <ul className="list-group list-group-flush">
            <div className="list-group-item">
            <Link to="/student-dashboard" className='list-group-item list-group-item-action'>Student Dashboard</Link>
            <Link to="/student-courses" className='list-group-item list-group-item-action'> My Courses</Link>
            <Link to="/student-favorite-courses" className='list-group-item list-group-item-action'> Favorite Courses</Link>
            <Link to="/student-recommended-courses" className='list-group-item list-group-item-action'> Recommended Courses</Link>         
            <Link to="/student-profile-setting" className='list-group-item list-group-item-action'> Profile Settings</Link>
            <Link to="/student-change-password" className='list-group-item list-group-item-action'> Change Password</Link>
            <Link to="/student-logout" className='list-group-item list-group-item-action'> Logout</Link>
            </div>
        </ul>
        </div>
    )
}

export default StudentSidebar;