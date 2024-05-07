import {Link} from 'react-router-dom';
import {useEffect, useState } from 'react';
import axios from 'axios';
// const baseUrl = "http://127.0.0.1:8000/api";

function TeacherLogout()
{
    localStorage.removeItem('teacherLoginStatus')
    
    window.location.href = '/teacher-login';
    
    return(
        <div></div>
    );
}

export default TeacherLogout;