import {Link} from 'react-router-dom';
import StudentCourses from './StudentCourses';
import {Routes as Switch, Route} from 'react-router-dom';
import Sidebar from './StudentSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = "http://localhost:8000/api";
const studentId = localStorage.getItem('studentId');

function StudentProfileSetting()
{

    const [profile, setProfile] = useState([]);
    const[studentData, setStudentData] = useState({
        'full_name' : '',
        'interested_categories' : '',
        'password' : '',
        'email' : '',
        'mobile_num' : '',
        'qualification' : '',
        'prev_profile_img' : ''
    });
    
    const handleChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setStudentData({
            ...studentData, //spread operator
            [event.target.name]:event.target.value //key:value pair capturing through student Registration page.
        });
        
    }

    const handleFileChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setStudentData({
            ...studentData, //spread operator
            [event.target.name]:event.target.files[0] //key:value pair capturing through student Registration page.
            
        });
    }

    // const {chapter_id} = useParams();

    const submitForm=()=>{

        
        // console.log(studentLoginData);
        const _FormData = new FormData();

        _FormData.append("full_name", studentData.full_name);
        // _FormData.append("course", course_id);
        // _FormData.append("category", 1);
        _FormData.append("student", studentId);

        _FormData.append("email", studentData.email);
        _FormData.append("password", studentData.password);
        _FormData.append("qualification", studentData.qualification);
        _FormData.append("mobile_no", studentData.mobile_no);
        _FormData.append("interested_categories", studentData.interested_categories);
        
        if(studentData.profile_img !==''){
            _FormData.append("profile_img", studentData.profile_img, studentData.profile_img.name);
        }
        
        try{
                //sending the data on the Django Framework in the Json format.
                axios.put(baseUrl + '/student/' + studentId + '/', _FormData,{
                    headers : {
                        'Content-Type' : 'multipart/form-data' ,
                        // 'Authorization' : 'Token 547bfe5c66741f3bd44e41ffa701c45ab09b8d3e',
                        "Access-Control-Allow-Origin" : "*",
                    }
                }).then((res) =>{
                    // console.log(res.data);
                    // window.location.href = "/student-add-course";
                    if(res.status === 200){
                        // const Swal = require('sweetalert2');
    //For deleting the chapter
                        
                Swal.fire({
                title: 'Data has been updated successfully',
                text: 'You will not be able to recover this Profile Image File!',
                icon: 'success',
                toast: true,
                timer: 3000,
                position: 'top',
                timerProgressBar: true,
                showConfirmButton: false
                })
                // window.location.reload();
            }
        });
                   
        }
        catch(error){
            console.log('Error submitting form data:',error.res.data);
            // setStudentData({
            //     ...studentData,
            //     'status' : 'error'
                
            // });
        }

                }
                   

    useEffect(() =>{
        try{

            axios.get(baseUrl + '/student')
            .then((res) =>{
                setProfile(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            // Fetch current course data
            try{
                axios.get(baseUrl + '/student/' + studentId + '/').then((response)=>{
            
                    // if(response.data === true){
        
                    // console.log(response.data);
                    setStudentData({
                        full_name : response.data.full_name,
                        email : response.data.email,
                        qualification : response.data.qualification,
                        mobile_no : response.data.mobile_no,
                        interested_categories : response.data.interested_categories,
                        prev_profile_img : response.data.profile_img,
                        profile_img : ''
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
                    <Sidebar />
                 </aside>
                 <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Student Profile Setting</h5>
                        <div className='card-body'>
                                <div className="mb-3 row">
                                    <label for="full name" className="col-sm-2 col-form-label active">Full Name</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} value={studentData.full_name} name="full_name" className="form-control" id="fullname"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="email" className="col-sm-2 col-form-label active">Email</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} value={studentData.email} name="email" className="form-control" id="email" disabled/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="qualification" className="col-sm-2 col-form-label active">Qualification</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} value={studentData.qualification} name="qualification" className="form-control" id="qualification"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="mobile_no" className="col-sm-2 col-form-label active">Mobile Number</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} value={studentData.mobile_no} name="mobile_no" className="form-control" id="mobile_no"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="interested_categories" className="col-sm-2 col-form-label active">Interested Categories</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} value={studentData.interested_categories} name="interested_categories" className="form-control" id="interest_categories"/>
                                    </div>
                                </div>
                                 

                                <div className="mb-3 row">
                                    <label for="inputFile" className="col-sm-2 col-form-label active">Profile Photo</label>
                                    <div className="col-sm-10">
                                    <input type="file" onChange={handleFileChange} name="profile_img" id="profile_img" className="form-control" />
                                    {studentData.prev_profile_img &&
                                        <img src={studentData.prev_profile_img} width="250" height="300" type="file/png" className='mt-2' />
                                    
                                    }
                                    </div>
                                </div>
                                    <hr />
                                    <button onClick={submitForm} className='btn btn-primary' type='button'>Update Profile</button>
                                
                            </div>
                        </div>
                 </section>
            </div>
        </div>
    )
}

export default StudentProfileSetting;