import {Link} from 'react-router-dom';
import TeacherCourses from './TeacherCourses';
import {Routes as Switch, Route} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState,useEffect} from 'react';
import axios from 'axios';
const Swal = require('sweetalert2');

const baseUrl = "http://localhost:8000/api";
const teacherId =localStorage.getItem('teacherId');
// console.log('teacher id', teacherId);


function AddQuiz()
{
    const[quizData, setQuizData] = useState({
        'title' : '',
        'detail' : ''
    });


    
    const handleChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setQuizData({
            ...quizData, //spread operator
            [event.target.name]:event.target.value //key:value pair capturing through Teacher Registration page.
        });
        
    }
    
    const submitForm=async()=>{

        
        // console.log(teacherLoginData);
        const _FormData = new FormData();

        _FormData.append("teacher", teacherId);
        _FormData.append("title", quizData.title);
        _FormData.append("detail", quizData.detail);

        try{
                //sending the data on the Django Framework in the Json format.
                await axios.post(baseUrl + '/quiz/', _FormData,{
                    headers : {
                        'Content-Type' : 'multipart/form-data' ,
                        // 'Authorization' : 'Token 547bfe5c66741f3bd44e41ffa701c45ab09b8d3e',
                        "Access-Control-Allow-Origin" : "*",
                    }
                }).then((res) =>{
                    // console.log(res.data);
                    window.location.href = "/teacher-add-quiz";
                    console.log(res.data);
                    // window.location.href = "/teacher-add-course";
                    if(res.status === 200 || res.status === 201){
                    Swal.fire({
                      title: 'The Assignment has been added!',
                      icon: 'success',
                      toast: true,
                      timer: 100000000,
                      type: 'success',
                      position: 'top-right',
                      timerProgressBar: true,
                      showConfirmButton: false,
                 
                });
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

    };


    return(
        
        <div className="container mt-4">
            <div className="row">
                 <aside className='col-md-3'>
                    <TeacherSidebar />
                 </aside>
                 <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Add Quiz</h5>
                        <div className='card-body'>
                                
                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label active">Title</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} name = "title" className="form-control" id="title"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="detail" className="col-sm-2 col-form-label">Detail</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' name="detail" onChange={handleChange} id="detail"></textarea>
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

export default AddQuiz;