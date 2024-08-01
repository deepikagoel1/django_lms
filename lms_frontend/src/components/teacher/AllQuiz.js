import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';

const baseUrl = "http://localhost:8000/api";

const teacherId =localStorage.getItem('teacherId');
// console.log('teacher id', teacherId);

function AllQuiz(){

    const[quizData, setQuizData] = useState([]);
    const[TotalResult, setTotalResult] = useState([]);
    useEffect(() =>{
        try{
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            axios.get(baseUrl + '/teacher-quiz/' + teacherId).then((response)=>{
            
            // if(response.data === true){

            // console.log(response.data);
            setQuizData(response.data);
            setTotalResult(response.data.length);
            // console.log(response.data)

            // }               
            });
        }
        catch(error){
            console.log('Error submitting form data:',error);
          
        }
    }, []);

    // console.log(quizData);

    const {quiz_id} = useParams();

    const Swal = require('sweetalert2');
    //For deleting the chapter
    const handleDeleteClick = (quiz_id) => {
        
        Swal.fire({
          title: 'Are you sure you want to delete this quiz?',
          text: 'You will not be able to recover this Quiz!',
          icon: 'info',
        //   type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.isConfirmed) {
            try{
                axios.delete(baseUrl + '/quiz/'+ quiz_id)
                .then((res) => {
                    // window.location.reload();
                    Swal.fire(
                        'Deleted!',
                        'Your Quiz has been deleted.',
                        'success'
                      );
                    try{
                        //sending the data on the Django Framework in the Json format.
                        //Fetching all courses when page loads
                        axios.get(baseUrl +  '/teacher-quiz/'+ teacherId).then((response)=>{
                        
                       
                        setQuizData(response.data);
                        setTotalResult(response.data.length);
                        // console.log(response.data)
            
                        // }               
                        });
                    }
                    catch(error){
                        console.log('Error submitting form data:',error);
                      
                    }
                });
              
            }
            catch(error){
                Swal.fire(
                    'Error!',
                    'Something is wrong while deleting your quiz!!',
                    'error'
                  );
            }
            
          } 
          else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Your Quiz is safe :)',
              'error'
            )
          }
        });
      }



    return(
        <div className="container mt-4">
            <div className="row">
                 <aside className='col-md-3'>
                    <TeacherSidebar />
                 </aside>
                 <section className='col-md-9'></section>
                <div className='card mt-4'>
                    <h5 className='card-header'>All Questions ({TotalResult})</h5>
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
                                <td> <Link to ={"/teacher-quiz-questions/" + row.id}>{row.title}</Link></td>
                                <td><Link to = "#"> 123 </Link></td>
                                <td>
                                    <Link className='btn btn-info btn-sm ms-2' to = {"/teacher-edit-quiz/"+ row.id}>Edit Questions</Link>
                                    <button onClick={() => handleDeleteClick (row.id)} to = {"/delete-quiz/" + row.id}  className='btn btn-danger ms-2 mt-2'><i className="bi bi-trash3-fill"></i></button>
                                    <Link className='btn btn-success btn-sm ms-2' to = {"/teacher-add-questions/"+ row.id}>Add Questions</Link>
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
