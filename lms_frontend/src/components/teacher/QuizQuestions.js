import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';


const baseUrl = "http://localhost:8000/api";


function QuizQuestions(){
    
    const[questionData, setQuestionData] = useState([]);
    const {quiz_id} = useParams();
    const[TotalResult, setTotalResult] = useState(0);

       
    useEffect(() =>{
        try{
            //sending the data on the Django Framework in the Json format.
            //Fetching all courses when page loads
            axios.get(baseUrl + '/quiz-questions/' + quiz_id).then((response)=>{
            
            // if(response.data === true){

            // console.log(response.data);
            setQuestionData(response.data);
            setTotalResult(response.data.length);
            // console.log(response.data)
            console.log("Quiz Id",quiz_id);

            // }               
            });
        }
        catch(error){
            console.log('Error submitting form data:',error);
          
        }
    }, []);

    const Swal = require('sweetalert2');
    //For deleting the chapter
    const handleDeleteClick = (question_id) => {
        
        Swal.fire({
          title: 'Are you sure you want to delete this chapter?',
          text: 'You will not be able to recover this Chapter Video!',
          icon: 'info',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.isConfirmed) {
            try{
                axios.delete(baseUrl + '/questions/'+ question_id)
                .then((res) => {
                    // window.location.reload();
                    Swal.fire(
                        'Deleted!',
                        'Your Question has been deleted.',
                        'success'
                      );
                    try{
                        //sending the data on the Django Framework in the Json format.
                        //Fetching all courses when page loads
                        axios.get(baseUrl + '/quiz-questions/' + quiz_id).then((response)=>{
                        
                       
                        setQuestionData(response.data);
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
                    'Something is wrong while deleting your chapter!!',
                    'error'
                  );
            }
            
          } 
          else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Your Chapter Video is safe :)',
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
                <h5 className='card-header'>All Questions ({TotalResult}) <Link className='btn btn-sm btn-success float-end' to={"/teacher-add-questions/"+quiz_id}>Add Questions</Link></h5>
                <div className='card-body'>
                    <table  className='table table-striped table-hover table-bordered border-primary table-default'>
                        <thead>
                            <tr className='table-secondary'>
                                <th>Questions</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questionData.map((row, index) =>
                            <tr key={row.id}>
                            <td><Link to = {'/teacher-add-questions/' + row.id}>{row.questions}</Link></td>
                            <td>
                                <Link  to = {"/teacher-edit-question/" + row.id} className='btn btn-info text-white ms-2 mt-2'><i className="bi bi-pencil-square"></i></Link>
                                <button onClick={() => handleDeleteClick (row.id)} to = {"/delete-question/" + row.id}  className='btn btn-danger ms-2 mt-2'><i className="bi bi-trash3-fill"></i></button>
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

export default QuizQuestions;
