import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const baseUrl = "http://localhost:8000/api";

function DeleteChapter(){
    return (
    <h3> Delete Chapter </h3>
    );
}

export default DeleteChapter;