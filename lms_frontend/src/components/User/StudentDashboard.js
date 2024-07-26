import {Link} from 'react-router-dom';
import StudentCourses from './StudentCourses';
import {Routes as Switch, Route} from 'react-router-dom';
import Sidebar from './StudentSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = "http://localhost:8000/api";

function StudentDashboard()
{
    const [dashboardData, setDashboardData] = useState([]);
    
    const studentId =localStorage.getItem('studentId');


    useEffect(()=>{
        try{
            axios.get(baseUrl + '/student/dashboard/' + studentId + '/').then((res)=>{
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
                    <Sidebar />
                 </aside>
                 <section className='col-md-9'>
                    <div className='row'>
                        <div className='col-md-4 mb-4'>
                            <div className='card border-primary'>
                                <h5 className='card-header bg-primary text-white'> Total Enrolled Courses </h5>
                                <div className='card-body'> 
                                    <h3><Link to="/student-courses/">{dashboardData.total_enrolled_courses || 0}</Link></h3>
                                </div>
                            </div>
                        </div>
                            <div className='col-md-4'>
                                <div className='card border-success'>
                                    <h5 className='card-header bg-success text-white'> Favorite Courses </h5>
                                    <div className='card-body'>
                                        <h3><Link to="/student-favorite-courses/">{dashboardData.total_favorite_courses || 0}</Link></h3>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='card border-info'>
                                    <h5 className='card-header bg-info text-white'> Completed Assignments </h5>
                                    <div className='card-body'>
                                        <h3><Link to="/student-assignments/">{dashboardData.completed_assignments || 0}</Link></h3>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-4'>
                                <div className='card border-info'>
                                    <h5 className='card-header bg-info text-white'> Pending Assignments </h5>
                                    <div className='card-body'>
                                        <h3><Link to="/student-assignments/">{dashboardData.pending_assignments || 0}</Link></h3>
                                    </div>
                                </div>
                            </div>

                    </div>
                 </section>
            </div>
        </div>
    )
}


export default StudentDashboard;