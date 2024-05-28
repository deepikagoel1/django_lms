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

function TeacherProfileSetting()
{
    const [profile, setProfile] = useState([]);
    const[teacherData, setTeacherData] = useState({
        'full_name' : '',
        'email' : '',
        'password' : '',
        'qualification' : '',
        'mobile_no' : '',
        'skills' : '',
        'bio' : '',
        'prev_profile_img' : ''
    });
    
    const handleChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setTeacherData({
            ...teacherData, //spread operator
            [event.target.name]:event.target.value //key:value pair capturing through Teacher Registration page.
        });
        
    }

    const handleFileChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setTeacherData({
            ...teacherData, //spread operator
            [event.target.name]:event.target.files[0] //key:value pair capturing through Teacher Registration page.
            
        });
    }

    // const {chapter_id} = useParams();

    const submitForm=()=>{

        
        // console.log(teacherLoginData);
        const _FormData = new FormData();

        _FormData.append("full_name", teacherData.full_name);
        // _FormData.append("course", course_id);
        // _FormData.append("category", 1);
        _FormData.append("teacher", teacherId);

        _FormData.append("email", teacherData.email);
        _FormData.append("qualification", teacherData.qualification);
        _FormData.append("mobile_no", teacherData.mobile_no);
        _FormData.append("skills", teacherData.skills);
        _FormData.append("bio", teacherData.bio);
        if(teacherData.profile_img !==''){
            _FormData.append("profile_img", teacherData.profile_img, teacherData.profile_img.name);
        }
        
        try{
                //sending the data on the Django Framework in the Json format.
                axios.put(baseUrl + '/teacher/' + teacherId + '/', _FormData,{
                    headers : {
                        'Content-Type' : 'multipart/form-data' ,
                        // 'Authorization' : 'Token 547bfe5c66741f3bd44e41ffa701c45ab09b8d3e',
                        "Access-Control-Allow-Origin" : "*",
                    }
                }).then((res) =>{
                    // console.log(res.data);
                    // window.location.href = "/teacher-add-course";
                    if(res.status === 200){
                        // const Swal = require('sweetalert2');
    //For deleting the chapter
                        
                Swal.fire({
                title: 'Data has been updated successfully',
                text: 'You will not be able to recover this Course Image File!',
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
            // setTeacherData({
            //     ...teacherData,
            //     'status' : 'error'
                
            // });
        }

                }
                   

    useEffect(() =>{
        try{

            axios.get(baseUrl + '/teacher')
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
                axios.get(baseUrl + '/teacher/' + teacherId).then((response)=>{
            
                    // if(response.data === true){
        
                    // console.log(response.data);
                    setTeacherData({
                        full_name : response.data.full_name,
                        email : response.data.email,
                        qualification : response.data.qualification,
                        mobile_no : response.data.mobile_no,
                        skills : response.data.skills,
                        bio : response.data.bio,
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
                    <TeacherSidebar />
                 </aside>
                 <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Teacher Profile Setting</h5>
                        <div className='card-body'>
                                <div className="mb-3 row">
                                    <label for="full name" className="col-sm-2 col-form-label active">Full Name</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} value={teacherData.full_name} name="full_name" className="form-control" id="fullname"/>
                                    </div>
                                </div>
                                
                                <div className="mb-3 row">
                                    <label for="email" className="col-sm-2 col-form-label active">Email</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} value={teacherData.email} name="email" className="form-control" id="email" disabled/>
                                    </div>
                                </div>
                             
                                <div className="mb-3 row">
                                    <label for="Qualification" className="col-sm-2 col-form-label active">Qualification</label>
                                    <div className="col-sm-10">
                                    <input type="qualification" onChange={handleChange} value={teacherData.qualification} name="qualification" className="form-control" id="qualification" />
                                    </div>
                                    <div id="text" className='form-text'>Btech|BCA|MCA|Mtech|MBA
                                        
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="mobileno" className="col-sm-2 col-form-label active">Mobile Number</label>
                                    <div className="col-sm-10">
                                    <input type="mobileno" onChange={handleChange} value={teacherData.mobile_no} name="mobile_no" className="form-control" id="mobileno" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="skills" className="col-sm-2 col-form-label">Skills</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' onChange={handleChange} value={teacherData.skills} name="skills"></textarea>
                                    </div>
                                    <div id="text" className='form-text'>PHP, Python, Javascript, etc.
                                        
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="bio" className="col-sm-2 col-form-label">Bio</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' onChange={handleChange} value={teacherData.bio} name="bio"></textarea>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="inputFile" className="col-sm-2 col-form-label active">Profile Photo</label>
                                    <div className="col-sm-10">
                                    <input type="file" onChange={handleFileChange} name="profile_img" id="profile_img" className="form-control" />
                                    {teacherData.prev_profile_img &&
                                        <img src={teacherData.prev_profile_img} width="250" height="300" type="file/png" className='mt-2' />
                                    
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

export default TeacherProfileSetting;