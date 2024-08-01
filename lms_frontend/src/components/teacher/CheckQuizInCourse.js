import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';

const baseUrl = "http://localhost:8000/api";

const teacherId =localStorage.getItem('teacherId');
// console.log('teacher id', teacherId);

function CheckQuizInCourse(props){

    const[quizData, setQuizData] = useState([]);

    const Swal = require('sweetalert2');

    //Fetch Courses when page loads

    useEffect(() =>{
        try{
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            axios.get(`${baseUrl}/fetch-quiz-assign-status/${props.quiz}/${props.course}`).then((response)=>{
            
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

       

    }, []);

    

    //Quiz assign to course

    const assignQuiz = (quiz_id)=>{
        const _FormData = new FormData();
        
        _FormData.append("teacher", teacherId);
        _FormData.append("course", props.course);
        _FormData.append("quiz", props.quiz);
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
        
                                <td>
                                    {quizData.bool === false &&
                                    <button onClick={() => assignQuiz (props.quiz)} className='btn btn-success ms-2 mt-2'>Assign Quiz</button>
                                    }

                                    {quizData.bool === true &&
                                    <span className='text-success'>Assigned</span>
                                    }   

                                    </td>
                            
    )
} 

export default CheckQuizInCourse;
