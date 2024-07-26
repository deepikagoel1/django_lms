import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000/api";

function StudentSidebar()
{
    const [notifData, setNotifData] = useState([]);
    const studentId = localStorage.getItem('studentId');
    useEffect(()=>{
        //Fetch Courses
        try{
            axios.get(baseUrl + '/student/fetch-all-notifications/' + studentId +"/").then((res)=>{
                console.log(res);
                setNotifData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }


    },[]);
    return (
        <div className="card" style={{"width": "18rem"}}>
        <h5 className='card-header'>Student Dashboard</h5>
        <ul className="list-group list-group-flush">
            <div className="list-group-item">
            <Link to={`/student-dashboard/${studentId}/`} className='list-group-item list-group-item-action'>Student Dashboard</Link>
            <Link to="/student-courses" className='list-group-item list-group-item-action'> My Courses</Link>
            <Link to="/student-favorite-courses" className='list-group-item list-group-item-action'> Favorite Courses</Link>
            <Link to="/student-recommended-courses" className='list-group-item list-group-item-action'> Recommended Courses</Link> 
            <Link to="/student-assignments/" className='list-group-item list-group-item-action'> My Assignments
            <span  className = "float-end badge bg-danger mt-2">{notifData.length} </span></Link>                 
            <Link to="/student-profile-setting" className='list-group-item list-group-item-action'> Profile Settings</Link>
            <Link to="/student-change-password" className='list-group-item list-group-item-action'> Change Password</Link>
            <Link to="/student-logout" className='list-group-item list-group-item-action'> Logout</Link>
            </div>
        </ul>
        </div>
    )
}

export default StudentSidebar;