import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';

const baseUrl = "http://localhost:8000/api";


const teacherId =localStorage.getItem('teacherId');
// console.log('teacher id', teacherId);

function TeacherCourses(){

    const[courseData, setCourseData] = useState([]);
       
    useEffect(() =>{
        try{
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            axios.get(baseUrl + '/teacher-courses/' + teacherId).then((response)=>{
            
            // if(response.data === true){

            // console.log(response.data);
            setCourseData(response.data);
            // console.log(response.data)

            // }               
            });
        }
        catch(error){
            console.log('Error submitting form data:',error);
          
        }
    }, []);

    // console.log(courseData);

    return(
        <div className="container mt-4">
            <div className="row">
                 <aside className='col-md-3'>
                    <TeacherSidebar />
                 </aside>
                 <section className='col-md-9'></section>
                <div className='card mt-4'>
                    <h5 className='card-header'>Teacher Courses</h5>
                    <div className='card-body'>
                        <table  className='table table-striped table-hover table-bordered border-primary table-default'>
                            <thead>
                                <tr className='table-secondary'>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Total Enrolled</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courseData.map((course, index) =>
                                <tr key={course.title}>
                                <td><Link to={"/all-chapters/"+ course.id}>{course.title}</Link></td>
                                <td><img src = {course.feature_img} width="100" className="rounded" alt={course.title} /></td>
                                <td><Link to="/">678</Link></td>
                                <td>
                                    <button type="button" className='btn btn-danger btn-sm'>Delete</button>
                                    <Link className='btn btn-success btn-sm ms-2' to ={"/add-chapter/" + course.id}>Add Chapter</Link>
                                </td>
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

export default TeacherCourses;
