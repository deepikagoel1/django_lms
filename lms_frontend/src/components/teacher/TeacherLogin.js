import {Link} from 'react-router-dom';
import {useEffect, useState } from 'react';
import axios from 'axios';
const baseUrl = "http://127.0.0.1:8000/api";

function TeacherLogin()
{
    const [teacherLoginData, setteacherLoginData] = useState({
        email : '',
        password : ''
    });

    const handleChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setteacherLoginData({
            ...teacherLoginData, //spread operator
            [event.target.name]:event.target.value //key:value pair capturing through Teacher Registration page.
        });
    }

    const submitForm=()=>{
        // console.log(teacherLoginData);
        const teacherFormData = new FormData;
        teacherFormData.append("email", teacherLoginData.email)
        teacherFormData.append("password", teacherLoginData.password)
        try{
                //sending the data on the Django Framework in the Json format.
                axios.post(baseUrl + '/teacher-login/', teacherFormData).then((response)=>{
                    // console.log('Form data submitted successfully:',response.data);
                    // setteacherLoginData({
                    //     "email" : '',
                    //     "password" : '',
                                    
                    // });
                    if(response.data.bool === true){
                        localStorage.setItem('teacherLoginStatus', true);
                        window.location.href = '/teacher-dashboard';
                    }
                    
                });
            }
            catch(error){
                console.log('Error submitting form data:',error);
                // setteacherData({
                //     ...teacherData,
                //     'status' : 'error'
                    
                // });
            };

    }

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus==='true'){
        window.location.href = '/teacher-dashboard';
    }

    useEffect(() => {
        document.title = 'Teacher login'
    });
    return(
        
        <div className="container mt-4">
            <div className="row">
                <div className='col-6 offset-3'>
                    <div className='card'>               
                <h3 className='card-header'>Teacher Login</h3>
                <div className='card-body'>
                <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input value={teacherLoginData.email} onChange={handleChange} name="email" type="email" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input value={teacherLoginData.password} onChange={handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1"/>
                        </div>
                        {/* <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
                        </div> */}
                        <button onClick={submitForm} type="button" className="btn btn-primary">Login</button>
                 </form>
                
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherLogin;