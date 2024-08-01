import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = "http://localhost:8000/api";


function EditQuestion(){

    const[questionData, setQuestionData] = useState({
        quiz : '',
        questions : '',
        ans1 : '',
        ans2 : '',
        ans3 : '',
        ans4 : '',
        right_ans : ''
    });


    const handleChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setQuestionData({
            ...questionData, //spread operator
            [event.target.name]:event.target.value //key:value pair capturing through Teacher Registration page.
        });
        
    }

    const Swal = require('sweetalert2');
    const {quiz_id} = useParams();
    const {question_id} = useParams();

    const submitForm=()=>{
      
        // console.log(teacherLoginData);
        const _FormData = new FormData();
        
        // _FormData.append('id', questionData.id);
        _FormData.append("questions", questionData.questions);
        _FormData.append("ans1", questionData.ans1);
        _FormData.append("ans2", questionData.ans2);
        _FormData.append("ans3", questionData.ans3);
        _FormData.append("ans4", questionData.ans4);
        _FormData.append("right_ans", questionData.right_ans);

        try{
                //sending the data on the Django Framework in the Json format.
                axios.put(baseUrl + '/questions/'+ question_id, _FormData,{
                    headers : {
                        'Content-Type' : 'multipart/form-data' ,
                        // 'Authentication' : 'Token 547bfe5c66741f3bd44e41ffa701c45ab09b8d3e'
                        // "Access-Control-Allow-Origin" : "*",
                    }
                }).then((res) =>{
                    console.log(res.data);
                    // window.location.href = "/edit-chapter/1";
                    if(res.status === 200){
                        // const Swal = require('sweetalert2');
    //For deleting the chapter
                        
                Swal.fire({
                title: 'Question has been updated successfully',
                icon: 'success',
                toast: true,
                timer: 3000,
                position: 'top',
                timerProgressBar: true,
                showConfirmButton: false
                })
            }
        }

    );
                   
        }
        catch(error){
            console.log('Error submitting form data:',error.res.data);
            // setteacherData({
            //     ...teacherData,
            //     'status' : 'error'
                
            // });
        }

};

    useEffect(() =>{
        try{
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            axios.get(baseUrl + '/questions/'+ question_id).then((response)=>{
            
            // if(response.data === true){

            console.log(response.data);
            setQuestionData({
                questions : response.data.questions,
                ans1 : response.data.ans1,
                ans2 : response.data.ans2,
                ans3 : response.data.ans3,
                ans4 : response.data.ans4,
                right_ans : response.data.right_ans
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
                        <h5 className='card-header'>Edit Question</h5>
                        <div className='card-body'>
                            
                                <div className="mb-3 row">
                                    <label htmlFor="questions" className="col-sm-2 col-form-label active">Question</label>
                                    <div className="col-sm-10">
                                    <input type="text" value={questionData.questions} onChange={handleChange} name = "questions" className="form-control" id="questions"/>
                                    </div>
                                </div>
                                
                                <div className="mb-3 row">
                                    <label htmlFor="ans1" className="col-sm-2 col-form-label active">Answer 1</label>
                                    <div className="col-sm-10">
                                    <input type="text" value={questionData.ans1} onChange={handleChange} name = "ans1" className="form-control" id="ans1"/>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="ans2" className="col-sm-2 col-form-label active">Answer 2</label>
                                    <div className="col-sm-10">
                                    <input type="text" value={questionData.ans2} onChange={handleChange} name = "ans2" className="form-control" id="ans2"/>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="ans3" className="col-sm-2 col-form-label active">Answer 3</label>
                                    <div className="col-sm-10">
                                    <input type="text" value={questionData.ans3} onChange={handleChange} name = "ans3" className="form-control" id="ans3"/>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="ans4" className="col-sm-2 col-form-label active">Answer 4</label>
                                    <div className="col-sm-10">
                                    <input type="text" value={questionData.ans4} onChange={handleChange} name = "ans4" className="form-control" id="ans4"/>
                                    </div>
                                </div>
                                
                                <div className="mb-3 row">
                                    <label htmlFor="right_ans" className="col-sm-2 col-form-label active">Right Answer</label>
                                    <div className="col-sm-10">
                                    <input type="text" value={questionData.right_ans} onChange={handleChange} name = "right_ans" className="form-control" id="right_ans"/>
                                    </div>
                                </div>

                                    <button onClick={submitForm} type="button" className="btn btn-primary">Submit</button>
                                
                            </div>
                        </div>
                 </section>
            </div>
        </div>
    )

}

export default EditQuestion;