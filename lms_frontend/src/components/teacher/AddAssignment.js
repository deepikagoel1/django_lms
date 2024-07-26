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

const Swal = require('sweetalert2');

function AddAssignment()
{
    const[AssignmentData, setAssignmentData] = useState({
        'title' : '',
        'detail' : ''
    });



    // console.log(cats);

    const handleChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setAssignmentData({
            ...AssignmentData, //spread operator
            [event.target.name]:event.target.value //key:value pair capturing through Teacher Registration page.
        });
        
    }

    const handleFileChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setAssignmentData({
            ...AssignmentData, //spread operator
            [event.target.name]:event.target.files[0] //key:value pair capturing through Teacher Registration page.
            
        });
    }
    // console.log(AssignmentData);

    const {teacher_id} = useParams();
    const {student_id} = useParams();

    const submitForm=()=>{
      
        // console.log(teacherLoginData);
        const _FormData = new FormData();
        
        _FormData.append('teacher', teacher_id);
        _FormData.append('student', student_id);
        _FormData.append("title", AssignmentData.title);
        _FormData.append("detail", AssignmentData.detail);

        try{
                
                //sending the data on the Django Framework in the Json format.
                axios.post(baseUrl + '/student-assignment/' + teacher_id + '/' + student_id, _FormData,{
                    
                    headers : {
                        'Content-Type' : 'multipart/form-data' ,
                        // 'Authentication' : 'Token 547bfe5c66741f3bd44e41ffa701c45ab09b8d3e'
                        // "Access-Control-Allow-Origin" : "*",
                    }
                }).then((res) =>{
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

                //Save Notification Data
                const _notifData = new FormData();
                _notifData.append('teacher', teacher_id);
                _notifData.append('notif_subject', 'assignment');
                _notifData.append('notif_for', 'student');
                _notifData.append('student', student_id);
                axios.post(baseUrl + '/save-notification/', _notifData, {
                    headers : {
                        'Content-Type' : 'multipart/form-data'
                    }

                })
                .then((res) => {
                    console.log("Notification Added");
                })
                
                //End Notification
                window.location.reload();   
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
                        <h5 className='card-header'>Add Assignment</h5>
                        <div className='card-body'>
                            
                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label active">Title</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} name = "title" className="form-control" id="title"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Detail</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' onChange={handleChange} name="detail"  id="detail"></textarea>
                                    </div>
                                </div>
                                
                                    {/* <hr /> */}
                                    <button onClick={submitForm} type="button" className="btn btn-primary">Submit</button>
                                
                            </div>
                        </div>
                 </section>
            </div>
        </div>
    )
}

export default AddAssignment;