import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';


const baseUrl = "http://localhost:8000/api";




function ViewAssignment(){
    
    const[AssignmentData, setAssignmentData] = useState([]);
    // const {course_id} = useParams();
    // const {chapter_id} = useParams();
    const[TotalResult, setTotalResult] = useState(0);

    const {teacher_id} = useParams();
    const {student_id} = useParams();
    const {assignment_id} = useParams();
       
    useEffect(() =>{
        try{
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            axios.get(baseUrl + '/student-assignment/' + teacher_id + '/' + student_id).then((response)=>{
            
            // if(response.data === true){

            // console.log(response.data);
            setAssignmentData(response.data);
            setTotalResult(response.data.length);
            // console.log(response.data)
            console.log("Assignment_id",assignment_id);

            // }               
            });

            
        }
        catch(error){
            console.log('Error submitting form data:',error);
          
        }
    }, []);
    

    
    return(
        <div className="container mt-4">
        <div className="row">   
             <aside className='col-md-3'>
                <TeacherSidebar />
             </aside>
             <section className='col-md-9'></section>
            <div className='card mt-4'>
                <h5 className='card-header'>All Assignments ({TotalResult}) <Link className='btn btn-sm btn-success float-end' to={`/teacher-add-assignment/${student_id}/${teacher_id}/`}>Add Assignment</Link></h5>
                <div className='card-body'>
                    <table  className='table table-striped table-hover table-bordered border-primary table-default'>
                        <thead>
                            <tr className='table-secondary'>
                                <th>Title</th>
                                <th>Detail</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AssignmentData.map((row, index) =>
                            <tr key={row.id}>
                            <td>{row.title}</td>   
                            <td>{row.detail}</td>
                            <td>
                            {row.student_status === false &&
                             <span className='badge bg-warning'>InComplete Asignments</span>
                                            }
                            {row.student_status === true &&
                            <span className='badge bg-success'>Completed</span>
                            }
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

export default ViewAssignment;
