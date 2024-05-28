import {Link} from 'react-router-dom';
import TeacherCourses from './TeacherCourses';
import {Routes as Switch, Route} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = "http://localhost:8000/api";
const teacherId = localStorage.getItem('teacherId');

function TeacherChangePassword()
{
    const[teacherData, setTeacherData] = useState({
        'new_password' : '',
        'confirm_password' : ''     
    })

    const handleChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setTeacherData({
            ...teacherData, //spread operator
            [event.target.name]:event.target.value //key:value pair capturing through Teacher Registration page.
        });
        
    }
    const submitForm=()=>{

        const _FormData = new FormData();

        _FormData.append("teacher", teacherId);

        _FormData.append("new_password", teacherData.new_password);

        _FormData.append("confirm_password", teacherData.confirm_password);
        
        try{
                //sending the data on the Django Framework in the Json format.
                axios.post(baseUrl + '/teacher/change-password/' + teacherId + '/', _FormData,{
                    headers : {
                        'Content-Type' : 'multipart/form-data' ,
                        "Access-Control-Allow-Origin" : "*",
                    }
                }).then((res) =>{
                    console.log(res.data);
                    // window.location.href = "/teacher-add-course";
                    if(res.status === 200){
                        // const Swal = require('sweetalert2');
                        
                Swal.fire({
                title: 'Password has been updated successfully',
                icon: 'success',
                toast: true,
                timer: 3000,
                position: 'top',
                timerProgressBar: true,
                showConfirmButton: false
                })
                window.location.href='/teacher-logout/'
            }
        });
                   
        }
        catch(error){
            console.log('Error submitting form data:',error.res.data);
           
        }

                }
                   

    useEffect(() =>{
        
           
            try{
                axios.get(baseUrl + '/teacher/' + teacherId + '/').then((response)=>{

                    
            
                    if(teacherData.new_password === teacherData.confirm_password){
                        setTeacherData({
                            password : response.data.new_password
                            
                        });
                    }
                    
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
                        <h5 className='card-header'>Change Password</h5>
                        <div className='card-body'>
                                
                                <div className="mb-3 row">
                                    <label for="inputPassword" className="col-sm-2 col-form-label active">New Password</label>
                                    <div className="col-sm-10">
                                    <input type="password" onChange={handleChange} value={teacherData.new_password} name="new_password" className="form-control" id="new_password" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="inputPassword" className="col-sm-2 col-form-label active">Confirm Password</label>
                                    <div className="col-sm-10">
                                    <input type="password" onChange={handleChange} value={teacherData.confirm_password} name="confirm_password" className="form-control" id="confirm_password" />
                                   
                                    </div>
                                </div>
                                    <hr />
                                    <button type='button' onClick={submitForm} className='btn btn-primary'>Update Password</button>
                                    
                            </div>
                        </div>
                 </section>
            </div>
        </div>
    )
}

export default TeacherChangePassword;