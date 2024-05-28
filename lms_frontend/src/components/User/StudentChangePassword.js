import {Link} from 'react-router-dom';
import StudentCourses from './StudentCourses';
import {Routes as Switch, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = "http://localhost:8000/api";
const studentId = localStorage.getItem('studentId');

function StudentChangePassword()
{
    const[studentData, setstudentData] = useState({
        'new_password' : '',
        'confirm_password' : ''     
    })

    const handleChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setstudentData({
            ...studentData, //spread operator
            [event.target.name]:event.target.value //key:value pair capturing through student Registration page.
        });
        
    }
    const submitForm=()=>{

        const _FormData = new FormData();

        _FormData.append("student", studentId);

        _FormData.append("new_password", studentData.new_password);

        _FormData.append("confirm_password", studentData.confirm_password);
        
        try{
                //sending the data on the Django Framework in the Json format.
                axios.post(baseUrl + '/student/change-password/' + studentId + '/', _FormData,{
                    headers : {
                        'Content-Type' : 'multipart/form-data' ,
                        "Access-Control-Allow-Origin" : "*",
                    }
                }).then((res) =>{
                    console.log(res.data);
                    // window.location.href = "/student-add-course";
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
                window.location.href='/student-logout/'            }
        });
                   
        }
        catch(error){
            console.log('Error submitting form data:',error.res.data);
           
        }

                }
                   

    useEffect(() =>{
        
           
            try{
                axios.get(baseUrl + '/student/' + studentId + '/').then((response)=>{

                    
            
                    if(studentData.new_password === studentData.confirm_password){
                        setstudentData({
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
                    <studentSidebar />
                 </aside>
                 <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Change Password</h5>
                        <div className='card-body'>
                                
                                <div className="mb-3 row">
                                    <label for="inputPassword" className="col-sm-2 col-form-label active">New Password</label>
                                    <div className="col-sm-10">
                                    <input type="password" onChange={handleChange} value={studentData.new_password} name="new_password" className="form-control" id="new_password" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="inputPassword" className="col-sm-2 col-form-label active">Confirm Password</label>
                                    <div className="col-sm-10">
                                    <input type="password" onChange={handleChange} value={studentData.confirm_password} name="confirm_password" className="form-control" id="confirm_password" />
                                   
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

export default StudentChangePassword;