import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = "http://localhost:8000/api";
const teacherId =localStorage.getItem('teacherId');


function EditCourse(){

    const [cats, setCats] = useState([]);
    const[courseData, setCourseData] = useState({
        'category' : '',
        'title' : '',
        'description' : '',
        'f_img' : '',
        'techs' : '',
        'prev_fimg' : ''
    });
    
    const handleChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setCourseData({
            ...courseData, //spread operator
            [event.target.name]:event.target.value //key:value pair capturing through Teacher Registration page.
        });
        
    }

    const handleFileChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setCourseData({
            ...courseData, //spread operator
            [event.target.name]:event.target.files[0] //key:value pair capturing through Teacher Registration page.
            
        });
    }

    const {course_id} = useParams();
    const {teacher_id} = useParams();

    // const {chapter_id} = useParams();

    const submitForm=()=>{

        
        // console.log(teacherLoginData);
        const _FormData = new FormData();

        _FormData.append("category", courseData.category);
        // _FormData.append("course", course_id);
        // _FormData.append("category", 1);
        _FormData.append("teacher", teacherId);

        _FormData.append("title", courseData.title);
        _FormData.append("description", courseData.description);
        if(courseData.f_img !==''){
            _FormData.append("feature_img", courseData.f_img, courseData.f_img.name);
        }
        
        _FormData.append('techs', courseData.techs);

        try{
                //sending the data on the Django Framework in the Json format.
                axios.put(baseUrl + '/teacher-courses-detail/' + course_id, _FormData,{
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
            }
        });
                   
        }
        catch(error){
            console.log('Error submitting form data:',error.res.data);
            // setteacherData({
            //     ...teacherData,
            //     'status' : 'error'
                
            // });
        }

                }
                   

    useEffect(() =>{
        try{

            axios.get(baseUrl + '/course-category')
            .then((res) =>{
                setCats(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            // Fetch current course data
            try{
                axios.get(baseUrl + '/teacher-courses-detail/' + course_id).then((response)=>{
            
                    // if(response.data === true){
        
                    // console.log(response.data);
                    setCourseData({
                        category : response.data.category,
                        course : response.data.course,
                        title : response.data.title,
                        description : response.data.description,
                        prev_fimg : response.data.feature_img,
                        techs : response.data.techs,
                        f_img : ''
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
                        <h5 className='card-header'>Edit Course</h5>
                        <div className='card-body'>
                                <div className="mb-3 row">
                                    <label htmlFor="category" className="col-sm-2 col-form-label active">Category</label>
                                    <div className="col-sm-10">
                                    <select name = "category" value={courseData.category} onChange={handleChange} className="form-control">
                                    {cats.map((category, index) => {
                                        return <option key={index}
                                            value = {category.id}>{category.title}
                                        </option>
                                    })}
                                    </select>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label active">Title</label>
                                    <div className="col-sm-10">
                                    <input type="text" value={courseData.title} onChange={handleChange} name = "title" className="form-control" id="title"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' name="description" value={courseData.description} onChange={handleChange} id="description"></textarea>
                                    </div>
                                </div>
                                
                               
                                <div className="mb-3 row">
                                    <label htmlFor="inputFile" className="col-sm-2 col-form-label active">Featured Image</label>
                                    <div className="col-sm-10">
                                    <input type="file" onChange={handleFileChange} name="f_img" id="file" className="form-control" />
                                    {courseData.prev_fimg &&
                                        <img src={courseData.prev_fimg} alt={courseData.title} width="250" height="300" type="file/png" className='mt-2' />
                                    
                                    }
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Technologies</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' value={courseData.techs} onChange={handleChange} name="techs" 
                                    placeholder='PHP, Python, Javascript, Javascript, HTML, CSS' id="techs"></textarea>
                                    </div>
                                </div>
                                    <hr />
                                    <button onClick={submitForm} type="button" className="btn btn-primary">Submit</button>
                                
                            </div>
                        </div>
                 </section>
            </div>
        </div>
    )

}

export default EditCourse;