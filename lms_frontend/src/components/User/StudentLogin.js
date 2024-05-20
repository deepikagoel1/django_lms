import {Link} from 'react-router-dom';
import {useEffect, useState } from 'react';
import axios from 'axios';
const baseUrl = "http://127.0.0.1:8000/api";

function StudentLogin()
{
    const [studentLoginData, setstudentLoginData] = useState({
        email : '',
        password : ''
    });

    const [errorMsgs, seterrorMsgs] = useState('');

    const handleChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setstudentLoginData({
            ...studentLoginData, //spread operator
            [event.target.name]:event.target.value //key:value pair capturing through student Registration page.
        });
    }

    const submitForm=()=>{
        // console.log(studentLoginData);
        const studentFormData = new FormData;
        studentFormData.append("email", studentLoginData.email)
        studentFormData.append("password", studentLoginData.password)
        try{
                //sending the data on the Django Framework in the Json format.
                axios.post(baseUrl + '/student-login/', studentFormData).then((response)=>{
                    // console.log('Form data submitted successfully:',response.data);
                    // setstudentLoginData({
                    //     "email" : '',
                    //     "password" : '',
                                    
                    // });
                    if(response.data.bool === true){
                        localStorage.setItem('studentLoginStatus', true);
                        localStorage.setItem('studentId', response.data.student_id);
                        window.location.href = '/student-dashboard';
                    }
                    else{
                        seterrorMsgs('You had entered Invalid Email or Password!!!! Please check again!!!')
                    }
                });
            }
            catch(error){
                console.log('Error submitting form data:',error);
                // setstudentData({
                //     ...studentData,
                //     'status' : 'error'
                    
                // });
            };

    }

    const studentLoginStatus=localStorage.getItem('studentLoginStatus');
    if(studentLoginStatus==='true'){
        window.location.href = '/student-dashboard';
    }

    useEffect(() => {
        document.title = 'student login'
    });
    return(
        
        <div className="container mt-4">
            <div className="row">
                <div className='col-6 offset-3'>
                    <div className='card'>               
                <h3 className='card-header'>Student Login</h3>
                <div className='card-body'>
                    {errorMsgs && <p className='text-danger'> {errorMsgs} </p>}
                {/* <form> */}
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input value={studentLoginData.email} onChange={handleChange} name="email" type="email" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input value={studentLoginData.password} onChange={handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1"/>
                        </div>
                        {/* <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
                        </div> */}
                        <button onClick={submitForm} type="button" className="btn btn-primary">Login</button>
                 {/* </form> */}
                
                </div>
            </div>
        </div>
    </div>
</div>
    )
}

export default StudentLogin;