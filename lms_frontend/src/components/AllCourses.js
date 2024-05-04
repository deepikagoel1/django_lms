import {Link} from 'react-router-dom';


function AllCourses(){
    return(
        <div className='container mt-3'>
        {/* Latest Courses */}
        <h3 className="pb-1 mb-4">Latest Courses </h3> 
        <div className="row mb-4">
            <div className="col-md-3 mb-4">
                <div className="card" >
                        <Link to="/detail/1"><img src="python.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
                    </div>
                    <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: 4.5/5</span>
                            <span className='float-end'>Views: 18945</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card" >
                        <Link to="/detail/1"><img src="python.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
                    </div>
                    <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: 4.5/5</span>
                            <span className='float-end'>Views: 18945</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card" >
                        <Link to="/detail/1"><img src="python.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
                    </div>
                    <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: 4.5/5</span>
                            <span className='float-end'>Views: 18945</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card" >
                        <Link to="/detail/1"><img src="python.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
                    </div>
                    <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: 4.5/5</span>
                            <span className='float-end'>Views: 18945</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card" >
                        <Link to="/detail/1"><img src="python.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
                    </div>
                    <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: 4.5/5</span>
                            <span className='float-end'>Views: 18945</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card" >
                        <Link to="/detail/1"><img src="python.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
                    </div>
                    <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: 4.5/5</span>
                            <span className='float-end'>Views: 18945</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card" >
                        <Link to="/detail/1"><img src="python.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
                    </div>
                    <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: 4.5/5</span>
                            <span className='float-end'>Views: 18945</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card" >
                        <Link to="/detail/1"><img src="python.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                    <h5 className="card-title"><Link to="/detail/1">Course Title</Link></h5>
                    </div>
                    <div className='card-footer'>
                        <div className='title'>
                            <span>Rating: 4.5/5</span>
                            <span className='float-end'>Views: 18945</span>
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

export default AllCourses;