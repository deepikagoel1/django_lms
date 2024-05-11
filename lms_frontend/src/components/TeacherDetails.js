import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import {useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = "http://localhost:8000/api";
const siteUrl = "http://localhost:8000/";

const teacherId =localStorage.getItem('teacherId');


function TeacherDetails() {
  
  const[courseData, setCourseData] = useState([]);
  const[teacherData, setTeacherData] = useState([]);
  const {course_id} = useParams();
  const {teacher_id} = useParams();
       
    useEffect(() =>{
        try{
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            axios.get(baseUrl + '/teacher/' + teacher_id).then((response)=>{
            console.log(response);
            setTeacherData(response.data);
            setCourseData(response.data.teacher_courses);
            
            });
        }
        catch(error){
            console.log('Error submitting form data:',error);
          
        }
    }, []);

  return (
    <div className="card mt-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src="/logo512.png" className="img-fluid img-thumbnail" alt="Teacher's Image" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{teacherData.full_name}</h5>
            <p className="card-text">
              {teacherData.bio}
            </p>
            
            <p className="card-text">Skills: <Link to="/category-courses/1">PHP</Link>,  
            <Link to="/teacher-details/1">Python</Link>, <Link to="/teacher-details/1">Javascript</Link>
            </p>
            <p className="card-text">Recent Course: <Link to="/teacher-details/1">ReactJS Course</Link></p>
            <p className="card-text">Rating: 4.5/5</p>
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-header">Course List</div>
        
        {courseData.map((course, index) =>
            <div className="list-group list-group-flush">
            
                <Link to={`/detail/${course.id}`} className="list-group-item list-group-item-action">{course.title}</Link>
                {/* <Link to="/detail/1" className="list-group-item list-group-item-action">PHP Course 2</Link>
                <Link to="/detail/1" className="list-group-item list-group-item-action">Python Course 1</Link>
                <Link to="/detail/1" className="list-group-item list-group-item-action">Python Course 2</Link>
                <Link to="/detail/1" className="list-group-item list-group-item-action">Javascript Course 1</Link>
                <Link to="/detail/1" className="list-group-item list-group-item-action">Javascript Course 2</Link> */}
            
            </div>
        )}
          
        
    </div>

</div>
  );
}

export default TeacherDetails;
