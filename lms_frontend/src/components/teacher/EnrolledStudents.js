import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


const baseUrl = "http://localhost:8000/api";
const teacherId =localStorage.getItem('teacherId');



function EnrolledStudents(){

    const {course_id} = useParams(); 
    const[studentData, setStudentData] = useState([]);

    useEffect(() =>{
        try{
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            axios.get(baseUrl + '/fetch-enrolled-students/' + course_id).then((response)=>{
            
           console.log(response.data);
           
           setStudentData(response.data);
            // }               
            });
        }
        catch(error){
            console.log(error);
          
        }
    }, []);


    return (
        <div className="container mt-4">
            <div className="row">
                 <section className='col-md-9'></section>
                <div className='card mt-4'>
                    <h5 className='card-header'>Enrolled Student Details</h5>
                    <div className='card-body'>
                        <table  className='table table-striped table-hover table-bordered border-primary table-default'>
                            <thead>
                                <tr className='table-secondary'>
                                    <th>Name</th>
                                    <th>Qualification</th>
                                    <th>Interested Categories</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.map((row, index) =>
                                
                                <tr>
                                <td>{row.student.full_name}</td>
                                <td>{row.student.qualification}</td>
                                <td>{row.student.interested_categories}</td>
                                <td>
                                    <Link to ="/student/" className='btn btn-danger btn-sm'>View</Link>
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

export default EnrolledStudents;