import Header from './Header';
import Home from './Home';
import About from './About';
import Footer from './Footer';
import CourseDetail from './CourseDetail';
import {Routes as Switch, Route} from 'react-router-dom';
import TeacherDetails from './TeacherDetails';


//Importing list of All Courses
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import PopularTeachers from './PopularTeachers';
import CategoryCourses from './CategoryCourses';
import TeacherSkillCourses from './TeacherSkillCourses';


//Importing from User Module
import StudentLogin from './User/StudentLogin';
import StudentRegister from './User/StudentRegister';
import StudentDashboard from './User/StudentDashboard';
import StudentCourses from './User/StudentCourses';
import StudentFavoriteCourses from './User/StudentFavoriteCourses';
import StudentRecommendedCourses from './User/StudentRecommendedCourses';
import StudentProfileSetting from './User/StudentProfileSetting';
import StudentChangePassword from './User/StudentChangePassword';
import StudentLogout from './User/StudentLogout';

//Importing from Teacher Module
import TeacherLogin from './teacher/TeacherLogin';
import TeacherDashboard from './teacher/TeacherDashboard';
import TeacherRegister from './teacher/TeacherRegister';
import TeacherProfileSetting from './teacher/TeacherProfileSetting';
import TeacherCourses from './teacher/TeacherCourses';
import AddCourses from './teacher/AddCourses';
import TeacherChangePassword from './teacher/TeacherChangePassword';
import MyUsers from './teacher/MyUsers';
import TeacherLogout from './teacher/TeacherLogout';
import AddChapter from './teacher/AddChapter';
import CourseChapter from './teacher/CourseChapter';
import EditChapter from './teacher/EditChapter';
import EditCourse from './teacher/EditCourse';


function Main() {
  return (
    <div className="App">
        
      <Header />
      <Switch>
        <Route path = "/" element = {<Home />} />
        {/* <Route path = "/about" element = {<About />} /> */}
        <Route path = "/teacher-details/:teacher_id" element = {<TeacherDetails />} />
        <Route path = "/all-courses/" element = {<AllCourses />} />
        <Route path = "/popular-courses/" element = {<PopularCourses />} />
        <Route path = "/popular-teachers/" element = {<PopularTeachers />} />
        <Route path = "/category-courses/:category_slug/" element = {<CategoryCourses />} />

        {/* Student Dashboard Links */}
        <Route path = "/detail/:course_id/" element = {<CourseDetail />} />
        <Route path = "/student-login/" element = {<StudentLogin />} />
        <Route path = "/student-register/" element = {<StudentRegister />} />
        <Route path = "/student-dashboard/" element = {<StudentDashboard />} />
        <Route path = "/student-courses/" element = {<StudentCourses />} />
        <Route path = "/student-favorite-courses/" element = {<StudentFavoriteCourses />} />
        <Route path = "/student-recommended-courses/" element = {<StudentRecommendedCourses />} />
        <Route path = "/student-profile-setting/" element = {<StudentProfileSetting />} />
        <Route path = "/student-change-password/" element = {<StudentChangePassword />} />
        <Route path = "/student-logout/" element = {<StudentLogout />} />


        {/* Teacher Dashboard Links */}
        <Route path = "/teacher-login/" element = {<TeacherLogin />} />
        <Route path = "/teacher-dashboard/" element = {<TeacherDashboard />} />
        <Route path = "/teacher-register/" element = {<TeacherRegister />} />
        <Route path = "/teacher-profile-setting/" element = {<TeacherProfileSetting />} />
        <Route path = "/teacher-courses/" element = {<TeacherCourses />} />
        <Route path = "/teacher-add-course/" element = {<AddCourses />} />
        <Route path = "/teacher-change-password/" element = {<TeacherChangePassword />} />
        <Route path = "/teacher-myusers/" element = {<MyUsers />} />
        <Route path = "/teacher-logout/" element = {<TeacherLogout />} />
        <Route path = "/add-chapter/:course_id/" element = {<AddChapter />} />
        <Route path = "/all-chapters/:course_id" element = {<CourseChapter />} />
        <Route path = "/edit-chapter/:chapter_id" element = {<EditChapter />} />
        <Route path = "/edit-course/:course_id" element = {<EditCourse />} />
        <Route path = "/teacher-skill-courses/:skill_name/:teacher_id" element = {<TeacherSkillCourses />} />

      </Switch>
      <Footer />
      
      
    </div>
  );
}

export default Main;