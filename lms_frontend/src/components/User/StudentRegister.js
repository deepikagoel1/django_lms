import {Link} from 'react-router-dom';
import {useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000/api/student/";

function StudentRegister()
{
    const [studentData, setstudentData] = useState({
        'full_name' : '',
        'email' : '',
        'password' : '' ,
        'qualification' : '',
        'mobile_no' : '',
        'interested_categories' : '',
        'status' : ''
    });

    // Change Element Value
    const handleChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        // console.log(studentData);
        setstudentData({
            ...studentData, //spread operator
            [event.target.name]:event.target.value //key:value pair capturing through Teacher Registration page.
        });
        
    }

    //Submit Form Function Creation
    const submitForm=()=>{
        const studentFormData = new FormData;
        //Creating the list
        studentFormData.append("full_name", studentData.full_name)
        studentFormData.append("email", studentData.email)
        studentFormData.append("password", studentData.password)
        studentFormData.append("qualification", studentData.qualification)
        studentFormData.append("mobile_no", studentData.mobile_no)
        studentFormData.append("interested_categories", studentData.interested_categories)

        try{
            //sending the data on the Django Framework in the Json format.
            axios.post(baseUrl, studentFormData).then((response)=>{
                console.log('Form data submitted successfully:',response.data);
                setstudentData({
                    "full_name" : '',
                    "email" : '',
                    "password" : '',
                    "qualification" : '',
                    "interested_categories" : '',
                    "mobile_no" : '',
                    "status" : "success"
                  
                    
                });
                
            });
        }
        catch(error){
            console.log('Error submitting form data:',error);
            setstudentData({
                // ...studentData,
                'status' : 'error'
                
            });
        };

    };

    useEffect(() => {
        // console.log(studentData);
        document.title = "Student Register";
    });

    const studentLoginStatus=localStorage.getItem('student  LoginStatus')
    if(studentLoginStatus==='true'){
        window.location.href = '/student-dashboard';
    }

    return(
        
        <div className="container mt-4">
            <div className="row">
                <div className='col-6 offset-3'>
                
                {/* {studentData.status==="" && <p className='text-info'> It is mandatory to fill all the fields!!!! </p>} */}
                {studentData.status==="success" && <p className='text-success'> Thankyou for Registering as Student!!!! </p>}
                {studentData.status==="error"  && <p className='text-danger'> Something wrong happened!!!! </p>}
                    

                    <div className='card'>               
                <h3 className='card-header'>User Registration</h3>
                <div className='card-body'>
                
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" value={studentData.full_name} onChange={handleChange} name="full_name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" value={studentData.email} onChange={handleChange} name="email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Password</label>
                    <input type="text" className="form-control" value={studentData.password} onChange={handleChange} name="password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="qualification" className="form-label">Qualifications</label>
                    <input type="text" className="form-control" value={studentData.qualification} onChange={handleChange} name="qualification"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="qualification" className="form-label">Mobile Number</label>
                    <input type="text" className="form-control" value={studentData.mobile_no} onChange={handleChange} name="mobile_no"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="course name" className="form-label">Interests in Course Name</label>
                    <textarea className='form-control' value={studentData.interested_categories} onChange={handleChange} name="interested_categories">
                    </textarea>
                    <div className="form-text"> 
                        PHP, Python, Javascript, AI
                    </div>
                </div>
                <button onClick={submitForm} type="button" className="btn btn-primary">Register</button>
                
                
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default StudentRegister;