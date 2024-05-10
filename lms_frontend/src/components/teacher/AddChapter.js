import {Link} from 'react-router-dom';
import TeacherCourses from './TeacherCourses';
import {Routes as Switch, Route} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState,useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const baseUrl = "http://localhost:8000/api";
// const teacherId =localStorage.getItem('teacherId');

// console.log('teacher id', teacherId);


function AddChapter()
{
    const[chapterData, setChapterData] = useState({
        'title' : '',
        'description' : '',
        'video' : '',
        'remarks' : ''
    });



    // console.log(cats);

    const handleChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setChapterData({
            ...chapterData, //spread operator
            [event.target.name]:event.target.value //key:value pair capturing through Teacher Registration page.
        });
        
    }

    const handleFileChange=(event) =>{
        // console.log(event.target.name, event.target.value)
        
        setChapterData({
            ...chapterData, //spread operator
            [event.target.name]:event.target.files[0] //key:value pair capturing through Teacher Registration page.
            
        });
    }
    // console.log(chapterData);

    const {course_id} = useParams();
    const {chapter_id} = useParams();

    const submitForm=()=>{
      
        // console.log(teacherLoginData);
        const _FormData = new FormData();
        
        _FormData.append('course', course_id);
        _FormData.append("title", chapterData.title);
        _FormData.append("description", chapterData.description);
        _FormData.append("video", chapterData.video);
        _FormData.append('remarks', chapterData.remarks);

        try{
                //sending the data on the Django Framework in the Json format.
                axios.post(baseUrl + '/chapter/' + chapter_id, _FormData,{
                    headers : {
                        'Content-Type' : 'multipart/form-data' ,
                        // 'Authentication' : 'Token 547bfe5c66741f3bd44e41ffa701c45ab09b8d3e'
                        // "Access-Control-Allow-Origin" : "*",
                    }
                }).then((res) =>{
                    console.log(res.data);
                    // window.location.href = "/add-chapter/"+{chapter_id};
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
                        <h5 className='card-header'>Add Chapter</h5>
                        <div className='card-body'>
                            
                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label active">Title</label>
                                    <div className="col-sm-10">
                                    <input type="text" onChange={handleChange} name = "title" className="form-control" id="title"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' onChange={handleChange} name="description"  id="description"></textarea>
                                    </div>
                                </div>
                                
                               
                                <div className="mb-3 row">
                                    <label htmlFor="inputFile" className="col-sm-2 col-form-label active">Video</label>
                                    <div className="col-sm-10">
                                    {/* <object
                                                width="500"
                                                height="400"
                                                className="form-control"
                                                type="video/mp4" 
                                                name="video" id="video"
                                                onChange={handleFileChange} 
                                                placeholder='No File is Uploaded'
                                                >
                                                
                                    </object> */}
                                    <input type="file" onChange={handleFileChange} placeholder='No File is Uploaded' name="video" id="video" className="form-control" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Remarks</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' onChange={handleChange} name="remarks" placeholder='This video is focused on basic Introduction' id="remarks"></textarea>
                                    </div>
                                </div>
                                    {/* <hr /> */}
                                    <button onClick={submitForm} type="button" className="btn btn-primary">Submit</button>
                                
                            </div>
                        </div>
                 </section>
            </div>
        </div>
    )
}

export default AddChapter;