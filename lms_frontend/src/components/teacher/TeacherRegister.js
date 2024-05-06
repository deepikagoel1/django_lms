import {Link} from 'react-router-dom';
import {useEffect, useState } from 'react';
import axios from 'axios';


function TeacherRegister()
{   
    // useEffect(()=> {
    //     document.title = "Teacher Register";
        
    // });
    const [teacherData, setteacherData] = useState({
        'full_name' : '',
        'email' : '',
        'password' : '',
        'qualification' : '',
        'mobile_no' : '',
        'skills' :'',
        'status' : ''
    });

    // Change Element Value
    const handleChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        // console.log(teacherData);
        setteacherData({
            ...teacherData, //spread operator
            [event.target.name]:event.target.value //key:value pair capturing through Teacher Registration page.
        });
        
    }
    
    //End
    
    //Submit Form Function Creation
    const submitForm=()=>{
        const teacherFormData = new FormData();
        //Creating the list
        teacherFormData.append("full_name", teacherData.full_name)
        teacherFormData.append("email", teacherData.email)
        teacherFormData.append("password", teacherData.password)
        teacherFormData.append("qualification", teacherData.qualification)
        teacherFormData.append("skills", teacherData.skills)
        teacherFormData.append("mobile_no", teacherData.mobile_no)
        try{
            //sending the data on the Django Framework in the Json format.
            axios.post('http://127.0.0.1:8000/api/teacher/', teacherFormData).then((response)=>{
                console.log('Form data submitted successfully:',response.data);
                setteacherData({
                    "full_name" : '',
                    "email" : '',
                    "password" : '',
                    "qualification" : '',
                    "skills" : '',
                    "mobile_no" : '',
                    "status" : "success"
                    // ...teacherData,
                    // 'status' : 'success'
                    
                });
                
            });
        }
        catch(error){
            console.log('Error submitting form data:',error);
            // setteacherData({
            //     ...teacherData,
            //     'status' : 'error'
                
            // });
        };

    };

    useEffect(() => {
        console.log(teacherData);
        document.title = "Teacher Register";
    });

    return(
        
        <div className="container mt-4">
            <div className="row">
                <div className='col-6 offset-3'>
                    
                    {teacherData.status==="success" && <p class='text-success'> Thankyou for Registering as Teacher!!!! </p>}
                    {teacherData.status==="error"  && <p class='text-danger'> Something wrong happened!!!! </p>}
                    
                    <div className='card'>               
                <h3 className='card-header'>Teacher Registration</h3>
                <div className='card-body'>
                <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input value={teacherData.full_name} onChange={handleChange} name="full_name" type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input value={teacherData.email} onChange={handleChange} name="email" type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobileno" className="form-label">Mobile Number</label>
                            <input value={teacherData.mobile_no} onChange={handleChange} name="mobile_no" type="number" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input value={teacherData.password} onChange={handleChange} name="password" type="password" autoComplete="on" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="qualification" className="form-label">Qualifications</label>
                            <input value={teacherData.qualification} onChange={handleChange} type="text" name="qualification" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="course name" className="form-label">Skills</label>
                            <textarea value={teacherData.skills} onChange={handleChange} name="skills" className='form-control'>
                            </textarea>
                            <div className="form-text"> 
                                PHP, Python, Javascript, AI
                            </div>
                        </div>
                        <button onClick={submitForm} type="submit" className="btn btn-primary">Register</button>
                </form>
                
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}


export default TeacherRegister;