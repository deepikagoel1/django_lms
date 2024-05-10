import {Link} from 'react-router-dom';
import TeacherCourses from './TeacherCourses';
import {Routes as Switch, Route} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState,useEffect} from 'react';
import axios from 'axios';

const baseUrl = "http://localhost:8000/api";
const teacherId =localStorage.getItem('teacherId');
// console.log('teacher id', teacherId);


function AddCourses()
{
    const [cats, setCats] = useState([]);
    const[courseData, setCourseData] = useState({
        'category' : '',
        'title' : '',
        'description' : '',
        'f_img' : '',
        'techs' : ''
    });


    useEffect(() =>{
        try{
            //sending the data on the Django Framework in the Json format.
            axios.get(baseUrl + '/course-category/',{
                headers : {
                    'Content-Type' : 'multipart/form-data' ,
                    // 'Authorization' : 'Token 547bfe5c66741f3bd44e41ffa701c45ab09b8d3e',
                    "Access-Control-Allow-Origin" : "*",
                }
            }).then((response)=>{
            
            // if(response.data === true){

            // console.log(response.data);
            setCats(response.data);
            // console.log(response.data)

            // }               
            });
        }
        catch(error){
            console.log('Error submitting form data:',error);
          
        }
    }, []);
    

    // console.log(cats);

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
    // console.log(courseData);
    
    const submitForm=async()=>{

        
        // console.log(teacherLoginData);
        const _FormData = new FormData();

        _FormData.append("category", courseData.category);
        _FormData.append("teacher", teacherId);
        // _FormData.append("category", 1);
        // _FormData.append("teacher", 1);
        _FormData.append("title", courseData.title);
        _FormData.append("description", courseData.description);
        _FormData.append("feature_img", courseData.f_img, courseData.f_img.name);
        _FormData.append('techs', courseData.techs);

        // _FormData.append("category", 1);
        // _FormData.append("teacher", 1);
        // _FormData.append("title", "this is new course");
        // _FormData.append("description", "testing");
        // _FormData.append("feature_img", courseData.f_img, courseData.f_img.name);
        // _FormData.append('techs', courseData.techs);

        // console.log("Category", courseData.category);


        try{
                //sending the data on the Django Framework in the Json format.
                await axios.post(baseUrl + '/course/', _FormData,{
                    headers : {
                        'Content-Type' : 'multipart/form-data' ,
                        // 'Authorization' : 'Token 547bfe5c66741f3bd44e41ffa701c45ab09b8d3e',
                        "Access-Control-Allow-Origin" : "*",
                    }
                }).then((res) =>{
                    // console.log(res.data);
                    window.location.href = "/teacher-add-course";
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
                        <h5 className='card-header'>Add Course</h5>
                        <div className='card-body'>
                                <div className="mb-3 row">
                                    <label htmlFor="category" className="col-sm-2 col-form-label active">Category</label>
                                    <div className="col-sm-10">
                                    <select name = "category" onChange={handleChange} className="form-control">
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
                                    <input type="text" onChange={handleChange} name = "title" className="form-control" id="title"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' name="description" onChange={handleChange} id="description"></textarea>
                                    </div>
                                </div>
                                
                               
                                <div className="mb-3 row">
                                    <label htmlFor="inputFile" className="col-sm-2 col-form-label active">Featured Image</label>
                                    <div className="col-sm-10">
                                    <input type="file" onChange={handleFileChange} name="f_img" id="file" className="form-control" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Technologies</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control'onChange={handleChange} name="techs" 
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

export default AddCourses;