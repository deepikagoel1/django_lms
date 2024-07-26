import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';

const baseUrl = "http://localhost:8000/api";

const teacherId =localStorage.getItem('teacherId');
// console.log('teacher id', teacherId);

function AllQuiz(){

    const[quizData, setQuizData] = useState([]);
       
    useEffect(() =>{
        try{
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            axios.get(baseUrl + '/teacher-quiz/' + teacherId).then((response)=>{
            
            // if(response.data === true){

            // console.log(response.data);
            setQuizData(response.data);
            // console.log(response.data)

            // }               
            });
        }
        catch(error){
            console.log('Error submitting form data:',error);
          
        }
    }, []);

    // console.log(quizData);

    return(
        <div className="container mt-4">
            <div className="row">
                 <aside className='col-md-3'>
                    <TeacherSidebar />
                 </aside>
                 <section className='col-md-9'></section>
                <div className='card mt-4'>
                    <h5 className='card-header'>ALL Quiz</h5>
                    <div className='card-body'>
                        <table  className='table table-striped table-hover table-bordered border-primary table-default'>
                            <thead>
                                <tr className='table-secondary'>
                                    <th>Name</th>
                                    <th>Total Questions</th>
                                    <th>Action</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {quizData.map((row, index) =>
                                <tr key={row.id}>
                                <td> <Link to ={"/all-questions/" + row.id}>{row.title}</Link></td>
                                <td><Link to = "#"> 123 </Link></td>
                                <td>
                                    <button type="button" className='btn btn-danger btn-sm'>Delete</button>
                                    <Link className='btn btn-info btn-sm ms-2' to = "#">Edit Questions</Link>
                                    <Link className='btn btn-success btn-sm ms-2' to = "#">Add Questions</Link>
                                </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default AllQuiz;
