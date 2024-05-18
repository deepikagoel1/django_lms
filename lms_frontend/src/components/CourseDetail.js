import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import {useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = "http://localhost:8000/api";
const siteUrl = "http://localhost:8000/";

function CourseDetail() {

  const[chapterData, setChapterData] = useState([]);
  const[courseData, setCourseData] = useState([]);
  const[teacherData, setTeacherData] = useState([]);
  const[relatedCourseData, setrelatedCourseData] = useState([]);
  const[techListData, setTechListData] = useState([]);

  const {course_id} = useParams(); 
  //let is used for the blog.
  //const is used for whole of the document.
  const teacherId =localStorage.getItem('teacherId');

  const {chapter_id} = useParams();

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
        // console.log(response.data)
        });
    }
    catch(error){
        console.log('Error submitting form data:',error);
      
    }


}, []);

  // console.log(relatedCourseData);

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
            <p className="card-text">
              <small className="text-muted">
                Technologies:&nbsp;
                {techListData.map((tech, index) => 
                      <Link to={`/category-courses/${tech.trim()}`} className="badge badge-pill text-dark bg-info ms-2 mr-2">{tech}</Link>
                )}
                 
              </small>
            </p>
            <p className="card-text">
              <small className="text-muted">
                Duration (in hours): 3 hrs 30 minutes
              </small>
            </p>
            <p className="card-text">
              <small className="text-muted">Total Students Enrolled: 500</small>
            </p>
            <p className="card-text">
              <small className="text-muted">Rating: 4.5/5</small>
            </p>
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
            <div className="modal fade" id="videoModal1" tabIndex="1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{chapter.title}</h5>
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
