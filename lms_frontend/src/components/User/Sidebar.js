import {Link} from 'react-router-dom';


function Sidebar()
{
    return (
        <div className="card" style={{"width": "18rem"}}>
        <h5 className='card-header'>Dashboard</h5>
        <ul className="list-group list-group-flush">
            <div className="list-group-item">
            <Link to="/student_dashboard" className='list-group-item list-group-item-action'>User Dashboard</Link>
            <Link to="/my-courses" className='list-group-item list-group-item-action'> My Courses</Link>
            <Link to="/favorite-courses" className='list-group-item list-group-item-action'> Favorite Courses</Link>
            <Link to="/recommended-courses" className='list-group-item list-group-item-action'> Recommended Courses</Link>         
            <Link to="/profile-setting" className='list-group-item list-group-item-action'> Profile Settings</Link>
            <Link to="/change-password" className='list-group-item list-group-item-action'> Change Password</Link>
            <Link to="/login" className='list-group-item list-group-item-action'> Logout</Link>
            </div>
        </ul>
        </div>
    )
}

export default Sidebar;