import {Link} from 'react-router-dom';
import TeacherCourses from './TeacherCourses';
import {Routes as Switch, Route} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState,useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const baseUrl = "http://localhost:8000/api";
// const teacherId =localStorage.getItem('teacherId');

// console.log('teacher id', teacherId);

function AddQuizQuestions()
{
    const[questionData, setQuestionData] = useState({
        quiz : '',
        questions : '',
        ans1 : '',
        ans2 : '',
        ans3 : '',
        ans4 : '',
        right_ans : ''
    });



    // console.log(cats);

    const handleChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setQuestionData({
            ...questionData, //spread operator
            [event.target.name]:event.target.value //key:value pair capturing through Teacher Registration page.
        });
        
    }

    const Swal = require('sweetalert2');
    const {quiz_id} = useParams();
    

    const submitForm=()=>{
      
        // console.log(teacherLoginData);
        const _FormData = new FormData();
        
        _FormData.append('quiz', quiz_id);
        _FormData.append("questions", questionData.questions);
        _FormData.append("ans1", questionData.ans1);
        _FormData.append("ans2", questionData.ans2);
        _FormData.append("ans3", questionData.ans3);
        _FormData.append("ans4", questionData.ans4);
        _FormData.append("right_ans", questionData.right_ans);


        try{
                
                //sending the data on the Django Framework in the Json format.
                axios.post(baseUrl + '/quiz-questions/' + quiz_id, _FormData,{
                    
                    headers : {
                        'Content-Type' : 'multipart/form-data' ,
                        // 'Authentication' : 'Token 547bfe5c66741f3bd44e41ffa701c45ab09b8d3e'
                        // "Access-Control-Allow-Origin" : "*",
                    }
                }).then((res) =>{
                    // console.log(res.data);
                    if(res.status === 200 || res.status === 201){
                        Swal.fire({
                            title: "Questions has been added",
                            icon : 'success',
                            toast :  true,
                            timer : 30000,
                            position : 'top-right',
                            timerProgressBar : true,
                            showConfirmButton : false
                         });
                    }
                    window.location.reload();
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
                        <h5 className='card-header'>Add Questions <Link className='btn btn-sm btn-success float-end' to={"/teacher-all-quiz/"}>All Questions</Link></h5>
                        <div className='card-body'>
                            
                                <div className="mb-3 row">
                                    <label htmlFor="questions" className="col-sm-2 col-form-label">Question</label>
                                    <div className="col-sm-10">
                                    <textarea className="form-control" onChange={handleChange} name="questions" id="questions"></textarea>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="ans1" className="col-sm-2 col-form-label">Answer 1</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' onChange={handleChange} name="ans1" id="ans1"></textarea>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="ans2" className="col-sm-2 col-form-label">Answer 2</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' onChange={handleChange} name="ans2"  id="ans2"></textarea>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="ans3" className="col-sm-2 col-form-label">Answer 3</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' onChange={handleChange} name="ans3"  id="ans3"></textarea>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="ans4" className="col-sm-2 col-form-label">Answer 4</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' onChange={handleChange} name="ans4"  id="ans4"></textarea>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="right_ans" className="col-sm-2 col-form-label">Right Answer</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' onChange={handleChange} name="right_ans"  id="right_ans"></textarea>
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

export default AddQuizQuestions;