import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';

function TeacherDetails() {
  return (
    <div className="card mt-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src="/logo512.png" className="img-fluid img-thumbnail" alt="Teacher's Image" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">(Teacher Name)</h5>
            <p className="card-text">
              Using a combination of grid and utility classes, cards can be made
              horizontal in a mobile-friendly and responsive way. In the example
              below, we remove the grid gutters with .g-0 and use .col-md-*
              classes to make the card horizontal at the md breakpoint. Further
              adjustments may be needed depending on your card content.
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
            <div className="list-group list-group-flush">
                <Link to="/detail/1" className="list-group-item list-group-item-action">PHP Course 1</Link>
                <Link to="/detail/1" className="list-group-item list-group-item-action">PHP Course 2</Link>
                <Link to="/detail/1" className="list-group-item list-group-item-action">Python Course 1</Link>
                <Link to="/detail/1" className="list-group-item list-group-item-action">Python Course 2</Link>
                <Link to="/detail/1" className="list-group-item list-group-item-action">Javascript Course 1</Link>
                <Link to="/detail/1" className="list-group-item list-group-item-action">Javascript Course 2</Link>
            </div>
          
        
    </div>

</div>
  );
}

export default TeacherDetails;
