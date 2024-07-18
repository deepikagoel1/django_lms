import {Link} from 'react-router-dom';
import Sidebar from './StudentSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


const baseUrl = "http://localhost:8000/api";
const studentId =localStorage.getItem('studentId');


function StudentCourses(){

    const {course_id} = useParams(); 
    const teacher_id = useParams();
    const[courseData, setcourseData] = useState([]);

    useEffect(() =>{
        try{
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            axios.get(baseUrl + '/fetch-enrolled-courses/' + studentId).then((response)=>{
            
           console.log(response.data);
           
           setcourseData(response.data);
            // }               
            });
        }
        catch(error){
            console.log(error);
          
        }
    }, []);

    useEffect(() => {
        console.log("Course Data: ", courseData);
    }, [courseData]);

    return(
        <div className="container mt-4">
            <div className="row">
                 <aside className='col-md-3'>
                    <Sidebar />
                 </aside>
                 <section className='col-md-9'></section>
                <div className='card mt-4'>
                    <h5 className='card-header'>My Courses</h5>
                    <div className='card-body'>
                        <table  className='table table-striped table-hover table-bordered border-primary table-default'>
                            <thead>
                                <tr className='table-secondary'>
                                    <th>Name</th>
                                    <th>Created By</th>
                                    <th>Description</th>
                                    <th>Techs</th>
                                    {/* <th>Action</th> */}
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {courseData.map((row, index) =>
                                <tr key={row.course.id}>
                                <td><Link to = {`/detail/${row.course.id}`} >{row.course.title}</Link></td>
                                <td><Link to={`/teacher-details/${row.course.teacher.id}`} >{row.course.teacher.full_name}</Link></td>
                                <td>{row.course.description}</td>
                                <td>{row.course.techs}</td>
                                {/* <td>
                                    <button type="button" className='btn btn-danger btn-sm active'>Remove Enrollment</button>
                                </td> */}
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default StudentCourses;
