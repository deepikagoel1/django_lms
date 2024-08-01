import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
import CheckQuizInCourse from './CheckQuizInCourse';

const baseUrl = "http://localhost:8000/api";

const teacherId =localStorage.getItem('teacherId');
// console.log('teacher id', teacherId);

function AssignQuiz(){

    const[quizData, setQuizData] = useState([]);
    // const[TotalResult, setTotalResult] = useState([]);
    const {course_id} = useParams();
    const[courseData, setCourseData] = useState([]);
    const[AssignStatus, setAssignStatus] = useState();
    const Swal = require('sweetalert2');


    useEffect(() =>{
        try{
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            axios.get(baseUrl + '/teacher-quiz/' + teacherId).then((response)=>{
            
            // if(response.data === true){

            // console.log(response.data);
            setQuizData(response.data);
            // console.log(response.data)

            // }               
            });
        }
        catch(error){
            console.log('Error submitting form data:',error);
          
        }

        try{
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            axios.get(baseUrl + '/course/' + course_id).then((response)=>{
            
            setCourseData(response.data);
           
            // console.log(response.data)
            });
        }
        catch(error){
            console.log('Error submitting form data:',error);
          
        }

    }, []);

    // console.log(quizData);

    const {quiz_id} = useParams();

    //Quiz assign to course

    const assignQuiz = (quiz_id)=>{
        const _FormData = new FormData();
        
        _FormData.append("teacher", teacherId);
        _FormData.append("course", course_id);
        _FormData.append("quiz", quiz_id);
        try{
          //sending the data on the Django Framework in the Json format.
          axios.post(baseUrl + '/quiz-assign-course/', _FormData,{
              headers : {
                  'Content-Type' : 'multipart/form-data' ,
                  "Access-Control-Allow-Origin" : "*"
              }
          }).then((res) =>{
              console.log(res.data);
              // window.location.href = "/teacher-add-course";
              if(res.status === 200 || res.status === 201){
              Swal.fire({
                title: 'Quiz is successfully assigned in the Course!',
                icon: 'success',
                toast: true,
                timer: 1000000,
                type: 'success',
                position: 'top-right'
              });
            //   setAssignStatus('success');
              window.location.reload()
            }
          });
             
      }
      catch(error){
          console.log('Error submitting form data:',error);
          // setteacherData({
          //     ...teacherData,
          //     'status' : 'error'
              
          // });
        }

    }
        

    return(
        <div className="container mt-4">
            <div className="row">
                 <aside className='col-md-3'>
                    <TeacherSidebar />
                 </aside>
                 <section className='col-md-9'></section>
                <div className='card mt-4'>
                    <h5 className='card-header'>Assign Quiz <span className='text-primary'> ({courseData.title}) </span> </h5>
                    <div className='card-body'>
                        <table  className='table table-striped table-hover table-bordered border-primary table-default'>
                            <thead>
                                <tr className='table-secondary'>
                                    <th>Name</th>
                                    <th>Action</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {quizData.map((row, index) =>
                                <tr key={row.id}>
                                <td> <Link to ={"/teacher-all-quiz/" + row.id}>{row.title}</Link></td>
                                <td>
                                    <CheckQuizInCourse quiz = {row.id} course = {course_id} />
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

export default AssignQuiz;
