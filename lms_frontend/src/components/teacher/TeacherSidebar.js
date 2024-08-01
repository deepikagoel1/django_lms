import {Link, useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherSidebar()
{
    const teacherId =localStorage.getItem('teacherId');
    const [notifData, setNotifData] = useState([]);
    const {quiz_id} = useParams();
    
    useEffect(()=>{
        //Fetch Courses
        try{
            axios.get(baseUrl + '/teacher/fetch-all-notifications/' + teacherId +"/").then((res)=>{
                console.log(res);
                setNotifData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }


    },[]);
    return (
        <section className='col-md-9'>
        <div className="card" style={{"width": "18rem"}}>
        <h5 className='card-header'>Teacher Dashboard</h5>
        <ul className="list-group list-group-flush">
            <div className="list-group-item">
            <Link to={`/teacher-dashboard/${teacherId}/`} className='list-group-item list-group-item-action'>Teacher Dashboard</Link>
            <Link to="/teacher-courses" className='list-group-item list-group-item-action'> Teacher Courses</Link>
            <Link to="/teacher-add-course" className='list-group-item list-group-item-action'> Add Courses</Link>
            <Link to="/teacher-user-details" className='list-group-item list-group-item-action'> My Users
            <span  className = "float-end badge bg-danger mt-2">{notifData.length} </span></Link>   
            <Link to={`/teacher-all-quiz/`} className='list-group-item list-group-item-action'> All Quiz </Link>   
            <Link to="/teacher-add-quiz" className='list-group-item list-group-item-action'> Add Quiz </Link>                                   
            <Link to="/teacher-profile-setting" className='list-group-item list-group-item-action'> Profile Settings</Link>
            <Link to="/teacher-change-password" className='list-group-item list-group-item-action'> Change Password</Link>
            <Link to="/teacher-logout" className='list-group-item list-group-item-action'> Logout</Link>

            
            </div>
        </ul>
        
        </div>
        </section>
    )
}

export default TeacherSidebar;