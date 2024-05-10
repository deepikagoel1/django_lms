import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = "http://localhost:8000/api";


function EditChapter(){

    const[chapterData, setChapterData] = useState({
        'course':'',
        'title' : '',
        'description' : '',
        'prev_video' : '',
        'video' : '', 
        'remarks' : ''
    });

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

    // const {course_id} = useParams();
    const {chapter_id} = useParams();

    const submitForm=()=>{
      
        // console.log(teacherLoginData);
        const _FormData = new FormData();
        
        _FormData.append('course', chapterData.course);
        _FormData.append("title", chapterData.title);
        _FormData.append("description", chapterData.description);
        _FormData.append('remarks', chapterData.remarks);
        if(chapterData.video !== ""){
            _FormData.append("video", chapterData.video);
        }

        try{
                //sending the data on the Django Framework in the Json format.
                axios.put(baseUrl + '/chapter/'+ chapter_id, _FormData,{
                    headers : {
                        'Content-Type' : 'multipart/form-data' ,
                        // 'Authentication' : 'Token 547bfe5c66741f3bd44e41ffa701c45ab09b8d3e'
                        // "Access-Control-Allow-Origin" : "*",
                    }
                }).then((res) =>{
                    // console.log(res.data);
                    // window.location.href = "/edit-chapter/1";
                    if(res.status === 200){
                        // const Swal = require('sweetalert2');
    //For deleting the chapter
                        
                Swal.fire({
                title: 'Data has been updated successfully',
                text: 'You will not be able to recover this Chapter Video!',
                icon: 'success',
                toast: true,
                timer: 3000,
                position: 'top',
                timerProgressBar: true,
                showConfirmButton: false
                })
            }
        }

    );
                   
        }
        catch(error){
            console.log('Error submitting form data:',error.res.data);
            // setteacherData({
            //     ...teacherData,
            //     'status' : 'error'
                
            // });
        }

};

    useEffect(() =>{
        try{
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            axios.get(baseUrl + '/chapter/'+ chapter_id).then((response)=>{
            
            // if(response.data === true){

            // console.log(response.data);
            setChapterData({
                course : response.data.course,
                title : response.data.title,
                description : response.data.description,
                prev_video : response.data.video,
                remarks : response.data.remarks,
                video : ''
            });
           

            // }               
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
                        <h5 className='card-header'>Edit Chapter</h5>
                        <div className='card-body'>
                            
                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label active">Title</label>
                                    <div className="col-sm-10">
                                    <input type="text" value={chapterData.title} onChange={handleChange} name = "title" className="form-control" id="title"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' value={chapterData.description} onChange={handleChange} name="description"  id="description"></textarea>
                                    </div>
                                </div>
                                
                               
                                <div className="mb-3 row">
                                    <label htmlFor="inputFile" className="col-sm-2 col-form-label active">Video</label>
                                    
                                    <div className="col-sm-10">
                                    {chapterData.prev_video &&
                                    <video controls width="100%" height="100%" className='mt-2'>
                                    <source src={chapterData.prev_video} type="video/mp4" />
                                    </video>
                                    }
                                    
                                    </div>
                                    
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="remarks" className="col-sm-2 col-form-label">Remarks</label>
                                    <div className="col-sm-10">
                                    <textarea className='form-control' value={chapterData.remarks} onChange={handleChange} name="remarks" placeholder='This video is focused on basic Introduction' id="remarks"></textarea>
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

export default EditChapter;