import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import {useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import CourseRating from "./CourseRating";


const baseUrl = "http://localhost:8000/api";
const siteUrl = "http://localhost:8000/";
const Swal = require('sweetalert2');

function CourseDetail() {

  const[chapterData, setChapterData] = useState([]);
  const[courseData, setCourseData] = useState([]);
  const[teacherData, setTeacherData] = useState([]);
  const[relatedCourseData, setrelatedCourseData] = useState([]);
  const[techListData, setTechListData] = useState([]);
  const[userLoginStatus, setUserLoginStatus] = useState();
  const[EnrollState, setEnrollState] = useState();
  const {course_id} = useParams(); 
  const [rating2, setRating2] = useState();
  const [hoverFill, setHoverFill] = useState();
  const[ratingData, setRatingData] = useState({
    'rating' : '',
    'reviews' : ''
  });
  const[ratingStatus, setRatingStatus] = useState();
  const[avgratingstatus, setAvgratingstatus] = useState(0);
  //let is used for the blog.
  //const is used for whole of the document.
  const studentId =localStorage.getItem('studentId');

  // const {chapter_id} = useParams();
  const no_of_Star = 5;

  useEffect(() =>{
    try{
        //sending the data on the Django Framework in the Json format.
        //Fetching all courses when page loads
        axios.get(baseUrl + '/course/' + course_id).then((response)=>{
        
        setCourseData(response.data);
        setChapterData(response.data.course_chapters);
        setTeacherData(response.data.teacher);
        setrelatedCourseData(JSON.parse(response.data.related_videos));
        setTechListData(response.data.tech_list);
        if(response.data.course_rating !== '' && response.data.course_rating != null){
          setAvgratingstatus(response.data.course_rating)
        }
        
        // console.log(response.data)
        });
    }
    catch(error){
        console.log('Error submitting form data:',error);
      
    }

    // Fetching Enroll Status
    try{
      //sending the data on the Django Framework in the Json format.
      //Fetching all courses when page loads
      axios.get(baseUrl + '/fetch-enroll-status/' + course_id + '/'+ studentId).then((response)=>{
        if (response.data.bool === true){
            console.log(response)
            setEnrollState('success')
        }
      // setEnrollState('success');
      console.log(response.data)
      });
  }
  catch(error){
      console.log('Error submitting form data:',error);
    
  }

    const studentLoginStatus=localStorage.getItem('studentLoginStatus');
    if(studentLoginStatus==='true'){
        setUserLoginStatus('success')
    }

    }, []);

  // console.log(relatedCourseData);

  const EnrollCourse = ()=>{
        const _FormData = new FormData();
        

        _FormData.append("course", course_id);
        _FormData.append("student", studentId);
        try{
          //sending the data on the Django Framework in the Json format.
          axios.post(baseUrl + '/student-enroll-courses/', _FormData,{
              headers : {
                  'Content-Type' : 'multipart/form-data' ,
                  "Access-Control-Allow-Origin" : "*"
              }
          }).then((res) =>{
              console.log(res.data);
              // window.location.href = "/teacher-add-course";
              if(res.status === 200 || res.status === 201){
              Swal.fire({
                title: 'You have successfully enrolled in this Course!',
                icon: 'success',
                toast: true,
                timer: 1000000,
                type: 'success',
                position: 'top-right'
              });
              
              window.location.reload()
            }
          });
             
      }
      catch(error){
          console.log('Error submitting form data:',error);
          // setteacherData({
          //     ...teacherData,
          //     'status' : 'error'
              
          // });
      }

  }

  const submitForm=()=>{
      
    // console.log(teacherLoginData);
    const _FormData = new FormData();
    
    _FormData.append('course', course_id);
    _FormData.append("student", studentId);
    _FormData.append("rating", ratingData.rating);
    _FormData.append("remarks", ratingData.remarks);

    try{
            
            //sending the data on the Django Framework in the Json format.
            axios.post(baseUrl + '/course-rating/' + course_id + '/', _FormData,{
                
                headers : {
                    'Content-Type' : 'multipart/form-data' ,
                    // 'Authentication' : 'Token 547bfe5c66741f3bd44e41ffa701c45ab09b8d3e'
                    "Access-Control-Allow-Origin" : "*"
                }
            }).then((res) =>{
                console.log(res.data);
                if(res.status === 200 || res.status === 201){
                  Swal.fire({
                    title: 'You have successfully rated this Course!',
                    icon: 'success',
                    toast: true,
                    timer: 1000000,
                    type: 'success',
                    position: 'top-right',
                    timerProgressBar: true
                  });
                  
                  window.location.reload()
                }
                // window.location.href = "/add-chapter/"+{chapter_id};
                // window.location.reload();
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


  const handleClick = (index) => {
    console.log(index)

    setRating2(index)
    setRatingData(prev => ({ ...prev, rating: index }));

      }
      const handleMouseEnter = (index) => {
          console.log(index)
          setHoverFill(index)
      }
      const handleMouseLeave = () => {
          setHoverFill(rating2)
      }
      const handleChange=(event) =>{
        console.log(event.target.name, event.target.value)
        // console.log()
        
        setRatingData({
            ...ratingData, //spread operator
            [event.target.name]:event.target.value
        })
        
    }

    // Fetching Rating Status
    try{
      //sending the data on the Django Framework in the Json format.
      //Fetching all courses when page loads
      axios.get(baseUrl + '/fetch-course-rating/' + course_id +'/' + studentId).then((response)=>{
        if (response.data.bool === true){
            console.log(response)
            setRatingStatus('success')
        }
      // setEnrollState('success');
      console.log(response.data)
      });
  }
  catch(error){
      console.log('Error submitting form data:',error);
    
  }

      
  return (
    <div className="card text-right">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={courseData.feature_img} className="img-fluid img-thumbnail" alt="Course Image"/>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{courseData.title}</h5>
            <p className="card-text">
              {courseData.description}
            </p>
            <p className="card-text">
              <small className="text-muted">
                Course By: <Link to={`/teacher-details/${teacherData.id}`}>{teacherData.full_name}</Link>
              {/* Teacher data is returning id as the primary key. */}
              </small>
            </p>
            <p className="card-text fw-bold">
              
                Technologies:&nbsp;
                {techListData.map((tech, index) => 
                      <Link to={`/category-courses/${tech.trim()}`} className="badge badge-pill text-dark bg-info ms-2 mr-2">{tech}</Link>
                )}
                 
            </p>
            <p className="card-text fw-bold">
              
                Duration (in hours): 3 hrs 30 minutes
              
            </p>
            <p className="card-text fw-bold">
              Total Students Enrolled: &nbsp;
                      {courseData.total_enrolled_students} 
                    
            </p>
            <p className="card-text fw-bold">
              Average Rating:&nbsp; {avgratingstatus.toFixed(1)}/5
              <br></br>
              <br></br>
              {EnrollState === 'success' && userLoginStatus === 'success' &&
              <>
              {ratingStatus !== 'success' &&
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ratingModal">
              Rate this Course
            </button>
              }
               {ratingStatus === 'success' &&
               
              <small className="badge badge-pill text-dark bg-warning ms-2 mr-2"> 
                
                You had already rated this Course!
              </small>
              
              }
               {/* <Link to={`/course-rating/${course_id}`} className="btn btn-sm ms-4 btn-success">Rate Course from Here</Link> */}
              <div className="modal fade" id="ratingModal" tabIndex="-1" aria-labelledby="ratingModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-md" >
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="ratingModalLabel">Rate here for {courseData.title}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <span aria-hidden="true">&times;</span>

                  </div>
                  <div className="modal-body">
                    <p>
                      <form>
                    <div className="form-group mb-2">
                          {/* <h1> Course Rating </h1> */}
                          
                            {
                                [...Array(no_of_Star)].map((_, index) =>{
                                    index += 1

                                    const active = index <= (hoverFill || rating2);
                                    return <FaStar  size={50} 
                                        key = {index}
                                        className= {active ? 'active' : 'inactive'}
                                        
                                        style = {{
                                                  color : active ? "yellow" : "gray"
                                                }}
                                    onClick={() => handleClick(index) }
                                    onMouseEnter = {() => handleMouseEnter(index)}
                                    onMouseLeave = {() => handleMouseLeave(index)}
                                    
                                    />
                                
                                })
                            }
                            </div>
                               <h5 className = "mt-4"> You had provided Course Rating: </h5>
                               <div className="form-group mb-2">
                              <label for="count" className="col-form-label mt-4">Number of Stars:</label>
                              <div className="col-sm-10 ms-5">
                              <input className="form-control"
                                type="number"
                                value={rating2}
                                
                              />
                              </div>
                            </div>
                            <div className="form-group mb-2">
                              <label for="remarks" className="mt-4">Feedback</label>
                              <div className="col-sm-10">
                              <textarea className="form-control mt-2 ms-5" onChange={handleChange} name="remarks" id="remarks" rows ='5' placeholder="Enter your Feedback for the course" />
                              </div>
                          </div>
                              <button type="button" onClick={submitForm} className="btn btn-success mt-4">Submit</button>
                        </form>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </>
              } 
              </p>
                         
            {userLoginStatus === 'success' && EnrollState !== 'success' && 
            <p>
              <button onClick={EnrollCourse} type="button" className="btn btn-primary">
                Enroll in this Course
              </button> 
            </p>
              }

              {EnrollState === 'success' && userLoginStatus === 'success' &&
              <p>
              <span className="badge badge-pill text-dark bg-info ms-2 mr-2">
                You are already Enrolled in this Course
              </span> 
              </p>
              } 

            {userLoginStatus !== 'success' &&
            <p>
              <Link to="/student-login/" className="badge badge-pill text-dark bg-info ms-2 mr-2">Please Login to enroll in this Course</Link> 
            </p>
            }
            
          
          </div>
        </div>
      </div>
      {/*Course Video */}
      <div className="card mt-4 offset-0">
        <div className="card-header">Content Videos</div>
        <ul className="list-group list-group-flush">
          {chapterData.map((chapter, index) =>
          <li className="list-group-item">{chapter.title}
          <span className="float-end">
            <span className="me-3">1 hr 30 mins</span>
                <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#videoModal1"> <i className="bi-youtube"></i></button>
            </span>
            {/* <!--Starting Video Modal --> */}
            <div className="modal fade" id="videoModal1" tabIndex="1" aria-labelledby="ratingModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="ratingModalLabel">{chapter.title}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                  <div className="ratio ratio-16x9">
                      <iframe src={chapter.video} title={chapter.title} allowFullScreen></iframe>
                  </div>
                  </div>
                  
                </div>
              </div>
            </div>
            {/* <!--Ending Video Modal --> */}
          </li> 

          )} 
        </ul>
      </div>
      {/* End Course Video */}

      <h3 className="pb-1 mb-4 mt-5"> Related Courses <a href="#" className="float-end">See All </a>
      </h3>
      <div className="row mb-4">
      {relatedCourseData.map((rcourse, index) =>
        <div className="col-md-3">
          <div className="card" style={{ width: "18rem", fontSize: "20px", padding: "20px", backgroundColor: "light", color: "white",}}>
            <Link target="__blank" to={`/detail/${rcourse.pk}`}>
            <img src={`${siteUrl}media/${rcourse.fields.feature_img}`} className="img-fluid img-thumbnail" alt={rcourse.fields.title}/>
            {/* Since we have related_videos as indirect linked with the chapters so we have to fetch the media path correctly and from first level which is course. */}
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link target="__blank" to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}</Link>
                {/* For new tab we have created the target as __blank */}
              </h5>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}

export default CourseDetail;
