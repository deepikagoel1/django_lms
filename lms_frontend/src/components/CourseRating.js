import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import {useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';


const baseUrl = "http://localhost:8000/api";
const siteUrl = "http://localhost:8000/";

function CourseRating({no_of_Star = 5}){
    const [rating, setRating] = useState();
    const [hoverFill, setHoverFill] = useState();
     
    
    
    const handleClick = (getCurrentId) => {
        console.log(getCurrentId)
        setRating(getCurrentId)
    }
    const handleMouseEnter = (getCurrentId) => {
        console.log(getCurrentId)
        setHoverFill(getCurrentId)
    }
    const handleMouseLeave = () => {
        setHoverFill(rating)
    }

    return(
        <div>
        <h1> Course Rating </h1>

        {
            [...Array(no_of_Star)].map((_, index) =>{
                index += 1
                const active = index <= (hoverFill || rating);
                return <FaStar size={80} 
                    key = {index}
                    className= {active ? 'active' : 'inactive'}
                    style = {{
                                    color : active ? "yellow" : "gray"
                            }}
                onClick={() =>handleClick(index)}
                onMouseEnter = {() => handleMouseEnter(index)}
                onMouseLeave = {() => handleMouseLeave(index)}
                />
            
            })
        }
        
        </div>
    )
}

export default CourseRating;