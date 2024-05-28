import {Link} from 'react-router-dom';
import TeacherCourses from './TeacherCourses';
import {Routes as Switch, Route} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = "http://localhost:8000/api";

function TeacherDashboard()
{
    const [dashboardData, setDashboardData] = useState([]);
    
    const teacherId =localStorage.getItem('teacherId');

    useEffect(()=>{
        try{
            axios.get(baseUrl + '/teacher/dashboard/' + teacherId + '/').then((res)=>{
                console.log("Response Data:", res.data);
                setDashboardData(res.data);
                
            })
        }
        catch (error){
            console.log(error);
        }
    }, [])

    useEffect(() => {
        console.log("Dashboard Data: ", setDashboardData);
    }, [dashboardData]);
    return(
        
        <div className="container mt-4">
            <div className="row">
                 <aside className='col-md-3'>
                    <TeacherSidebar />
                 </aside>
                 <section className='col-md-9'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='card border-primary'>
                                <h5 className='card-header bg-primary text-white'> Total Courses </h5>
                                <div className='card-body'> 
                                    <h3><Link to="/teacher-courses">{dashboardData.total_teacher_courses || 0}</Link></h3>
                                </div>
                            </div>
                        </div>
                            <div className='col-md-4'>
                                <div className='card border-success'>
                                    <h5 className='card-header bg-success text-white'> Total Students </h5>
                                    <div className='card-body'>
                                        <h3><Link to="/teacher-user-details">{dashboardData.total_teacher_students || 0}</Link></h3>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='card border-info'>
                                    <h5 className='card-header bg-info text-white'> Total Chapters </h5>
                                    <div className='card-body'>
                                        <h3><Link to="/teacher-courses">{dashboardData.total_teacher_chapters || 0}</Link></h3>
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                 </section>
            </div>
        </div>
    )
}

export default TeacherDashboard;