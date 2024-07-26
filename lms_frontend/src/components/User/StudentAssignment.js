import {Link} from 'react-router-dom';
import Sidebar from './StudentSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
const Swal = require('sweetalert2');


const baseUrl = "http://localhost:8000/api";
const studentId =localStorage.getItem('studentId');
const teacherId =localStorage.getItem('teacherId');


function StudentAssignment(){

    const {course_id} = useParams(); 
    const[AssignmentData, setAssignmentData] = useState([]);
    const[AssignmentStatus, setAssignmentStatus] = useState('');
    const {teacher_id} = useParams();
    const {student_id} = useParams();

    useEffect(() =>{
        try{
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            axios.get(baseUrl + '/my-assignment/' + studentId).then((response)=>{
            
           console.log(response.data);
           
           setAssignmentData(response.data);
            // }               
            });
        }
        catch(error){
            console.log(error);
          
        }
    }, []);

    useEffect(() => {
        console.log("Assignment Data: ", AssignmentData);
    }, [AssignmentData]);

    const markAsDone = (assignment_id, title, detail, student, teacher) => {
        const _FormData = new FormData();
    
        _FormData.append("student_status", true);
        _FormData.append("title", title);
        _FormData.append("detail", detail);
        _FormData.append("student", student);
        _FormData.append("teacher", teacher);
    
        const _notifData = new FormData();
        _notifData.append('teacher', teacherId); // Use teacherId from localStorage
        _notifData.append('notif_subject', 'assignment completed');
        _notifData.append('notif_for', 'teacher');
        _notifData.append('student', studentId); // Use studentId from localStorage
    
        try {
            // Sending the data to the Django framework in JSON format.
            axios.put(baseUrl + '/update-assignment/' + assignment_id, _FormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*"
                }
            }).then((res) => {
                console.log(res.data);
                if (res.status === 200 || res.status === 201) {
                    Swal.fire({
                        title: 'You have successfully completed this Assignment!',
                        icon: 'success',
                        toast: true,
                        timer: 100000000,
                        type: 'success',
                        position: 'top-right',
                        timerProgessBar: true,
                        showConfirmButton: false
                    });
    
                    axios.post(baseUrl + '/save-notification/', _notifData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((res) => {
                        console.log("Notification Sent");
                    })
                    window.location.reload();
                }
            });
        } catch (error) {
            console.log('Error submitting form data:', error);
        }
    }
    
    

    return(
        <div className="container mt-4">
            <div className="row">
                 <aside className='col-md-3'>
                    <Sidebar />
                 </aside>
                 <section className='col-md-9'></section>
                <div className='card mt-4'>
                    <h5 className='card-header'>My Assignments</h5>
                    <div className='card-body'>
                        <table  className='table table-striped table-hover table-bordered border-primary table-default'>
                            <thead>
                                <tr className='table-secondary'>
                                    <th>Title</th>
                                    <th>Detail</th>
                                    <th>Teacher Name</th>
                                    <th>Action</th>
                                    {/* <th>Action</th> */}
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {AssignmentData.map((row, index) =>
                                <tr key={row.id}>
                                <td>{row.title}</td>   
                                <td>{row.detail}</td>
                                <td><Link to={`/teacher-details/${row.teacher.id}`} >{row.teacher.full_name}</Link></td>
                                <td>
                                    {row.student_status === false &&
                                    <button onClick={()=> markAsDone(row.id, row.title, row.detail, row.student.id, row.teacher.id)} className='btn btn-success btn-sm' type='button'>Mark as Done</button>
                                    }
                                     {row.student_status === true &&
                                     <span className='badge bg-primary'>completed</span>
                                    }
                                </td>
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

export default StudentAssignment;
