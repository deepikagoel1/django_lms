import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const baseUrl = "http://localhost:8000/api";

function TeacherSkillCourses(){
    const[courseData, setCourseData] = useState([]);
    const {skill_name, teacher_id} = useParams();

    useEffect(() =>{
        try{
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            axios.get(baseUrl + '/course/?skill_name=' + skill_name + '&teacher=' + teacher_id).then((response)=>{
           
            setCourseData(response.data);
                          
            });
        }
        catch(error){
            console.log(error);
          
        }
    }, []);

    return(
        <div className='container mt-3'>
        {/* Latest Courses */}
        <h3 className="pb-1 mb-4"> {skill_name.trim()}</h3> 
        <div className="row mb-4" >
        {courseData && courseData.map((course, index) => 
            <div className="col-md-3 mb-4" key={index}>
                <div className="card" >
                        <Link to={`/detail/${course.id}`}><img src={course.feature_img} className="card-img-top" alt={course.title}/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
                    </div>
                </div>
            </div>
            )}
            

        </div>
        {/* End Latest Courses */}

        {/*Pagination Start*/}

        <nav aria-label="Page navigation example mt-5">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
</nav>

        {/* End Pagination */}

        </div>
    );
}

export default TeacherSkillCourses;