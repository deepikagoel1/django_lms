import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000/api";

function PopularTeachers(){
    const [teacher, setTeacher] = useState('')
    useEffect(()=>{
        const response = axios.get(baseUrl + '/teacher/',{
            headers: {
                allowedHeaders: ['Content-Type', 'Authorization'],
                token : '547bfe5c66741f3bd44e41ffa701c45ab09b8d3e',
                'Access-Control-Allow-Origin' : '*',
                 methods: ['GET', 'POST', 'PUT', 'DELETE'],
                'Access-Control-Allow-Headers' : 'Origin, X-Requested-With,Content-Type, Accept'
            },
        }).then((response)=>{
            
            console.log(response.data);
        }).catch(err=>{
            console.log(err);
        });
       
    },[]);
    return(
        <div className='container mt-3'>
        {/* Latest Courses */}
        <h3 className="pb-1 mb-4">Popular Teachers</h3> 
        <div className="row mb-4">
            <div className="col-md-3 mb-4">
                <div className="card" >
                        <Link to="/teacher-details/1"><img src="teacher.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/teacher-details/1">Teacher Name</Link></h5>
                    </div>
                    <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: 4.5/5</span>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card" >
                        <Link to="/teacher-details/1"><img src="teacher.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/teacher-details/1">Teacher Name</Link></h5>
                    </div>
                    <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: 4.5/5</span>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card" >
                        <Link to="/teacher-details/1"><img src="teacher.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/teacher-details/1">Teacher Name</Link></h5>
                    </div>
                    <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: 4.5/5</span>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card" >
                        <Link to="/teacher-details/1"><img src="teacher.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/teacher-details/1">Teacher Name</Link></h5>
                    </div>
                    <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: 4.5/5</span>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card" >
                        <Link to="/teacher-details/1"><img src="teacher.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/teacher-details/1">Teacher Name</Link></h5>
                    </div>
                    <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: 4.5/5</span>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card" >
                        <Link to="/teacher-details/1"><img src="teacher.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/teacher-details/1">Teacher Name</Link></h5>
                    </div>
                    <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: 4.5/5</span>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card" >
                        <Link to="/teacher-details/1"><img src="teacher.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/teacher-details/1">Teacher Name</Link></h5>
                    </div>
                    <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: 4.5/5</span>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card" >
                        <Link to="/teacher-details/1"><img src="teacher.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/teacher-details/1">Teacher Name</Link></h5>
                    </div>
                    <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: 4.5/5</span>
                            
                        </div>
                    </div>
                </div>
            </div>


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

export default PopularTeachers;