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

//Importing from User Module
import Login from './User/Login';
import Register from './User/Register';
import Dashboard from './User/Dashboard';
import MyCourses from './User/MyCourses';
import FavoriteCourses from './User/FavoriteCourses';
import RecommendedCourses from './User/RecommendedCourses';
import ProfileSetting from './User/ProfileSetting';
import ChangePassword from './User/ChangePassword';

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

function Main() {
  return (
    <div className="App">
        
      <Header />
      <Switch>
        <Route path = "/" element = {<Home />} />
        {/* <Route path = "/about" element = {<About />} /> */}
        <Route path = "/teacher-details/:teacher_id" element = {<TeacherDetails />} />
        <Route path = "/all-courses" element = {<AllCourses />} />
        <Route path = "/popular-courses" element = {<PopularCourses />} />
        <Route path = "/popular-teachers" element = {<PopularTeachers />} />
        <Route path = "/category-courses/:category_slug" element = {<CategoryCourses />} />

        {/* Student Dashboard Links */}
        <Route path = "/detail/:course_id" element = {<CourseDetail />} />
        <Route path = "/student-login" element = {<Login />} />
        <Route path = "/student-register" element = {<Register />} />
        <Route path = "/student_dashboard" element = {<Dashboard />} />
        <Route path = "/my-courses" element = {<MyCourses />} />
        <Route path = "/favorite-courses" element = {<FavoriteCourses />} />
        <Route path = "/recommended-courses" element = {<RecommendedCourses />} />
        <Route path = "/profile-setting" element = {<ProfileSetting />} />
        <Route path = "/change-password" element = {<ChangePassword />} />

        {/* Teacher Dashboard Links */}
        <Route path = "/teacher-login" element = {<TeacherLogin />} />
        <Route path = "/teacher-dashboard" element = {<TeacherDashboard />} />
        <Route path = "/teacher-register" element = {<TeacherRegister />} />
        <Route path = "/teacher-profile-setting" element = {<TeacherProfileSetting />} />
        <Route path = "/teacher-courses" element = {<TeacherCourses />} />
        <Route path = "/teacher-add-course" element = {<AddCourses />} />
        <Route path = "/teacher-change-password" element = {<TeacherChangePassword />} />
        <Route path = "/teacher-myusers" element = {<MyUsers />} />
        <Route path = "/teacher-logout" element = {<TeacherLogout />} />
        <Route path = "/add-chapter/:course_id" element = {<AddChapter />} />

      </Switch>
      <Footer />
      
      
    </div>
  );
}

export default Main;