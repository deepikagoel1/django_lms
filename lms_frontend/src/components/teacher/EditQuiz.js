import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = "http://localhost:8000/api";
const teacherId =localStorage.getItem('teacherId');


function EditQuiz(){

    const[quizData, setquizData] = useState({
        'title' : '',
        'detail' : '',
    });
    
    const handleChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setquizData({
            ...quizData, //spread operator
            [event.target.name]:event.target.value //key:value pair capturing through Teacher Registration page.
        });
        
    }

    const {quiz_id} = useParams();

    // const {chapter_id} = useParams();

    const submitForm=()=>{

        
        // console.log(teacherLoginData);
        const _FormData = new FormData();

        _FormData.append("quiz", quizData.quiz_id);
        // _FormData.append("course", course_id);
        // _FormData.append("category", 1);
        _FormData.append("teacher", teacherId);

        _FormData.append("title", quizData.title);
        _FormData.append("detail", quizData.detail);

        try{
                //sending the data on the Django Framework in the Json format.
                axios.put(baseUrl + '/teacher-quiz-detail/' + quiz_id +'/', _FormData,{
                    headers : {
                        'Content-Type' : 'multipart/form-data' ,
                        // 'Authorization' : 'Token 547bfe5c66741f3bd44e41ffa701c45ab09b8d3e',
                        "Access-Control-Allow-Origin" : "*",
                    }
                }).then((res) =>{
                    // console.log(res.data);
                    // window.location.href = "/teacher-add-course";
                    if(res.status === 200){
                        // const Swal = require('sweetalert2');
    //For deleting the chapter
                        
                Swal.fire({
                title: 'Data has been updated successfully',
                text: 'You will not be able to recover this Course Image File!',
                icon: 'success',
                toast: true,
                timer: 3000,
                position: 'top',
                timerProgressBar: true,
                showConfirmButton: false
                })
            }
        });
                   
        }
        catch(error){
            console.log('Error submitting form data:',error.res.data);
            // setteacherData({
            //     ...teacherData,
            //     'status' : 'error'
                
            // });
        }

                }
                   

    useEffect(() =>{
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            // Fetch current quiz data
            try{
                axios.get(baseUrl + '/teacher-quiz-detail/' + quiz_id + '/').then((response)=>{
            
                    setquizData({
                        teacher : response.data.teacherId,
                        title : response.data.title,
                        detail : response.data.detail,
                    });
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
                 <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Edit Quiz</h5>
                        <div className='card-body'>
                                
                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label active">Title</label>
                                    <div className="col-sm-10">
                                    <input type="text" value={quizData.title} onChange={handleChange} name = "title" className="form-control" id="title"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="detail" className="col-sm-2 col-form-label">Detail</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' name="detail" value={quizData.detail} onChange={handleChange} id="detail"></textarea>
                                    </div>
                                </div>
                                
                                    <hr />
                                    <button onClick={submitForm} type="button" className="btn btn-primary">Submit</button>
                                
                            </div>
                        </div>
                 </section>
            </div>
        </div>
    )

}

export default EditQuiz;