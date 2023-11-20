// Importing modules
import React, { useEffect, useState } from "react";
import "./App.css";
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import Students from './components/setupStudent';
import Grades from './components/setupGrade';
import Instructors from './components/setupInstructor';
import Courses from './components/setupCourse';
import StudentButtons from './components/StudentButtons';
import GradeButtons from './components/GradeButtons';
import InstructorButtons from './components/InstructorButtons';
import CourseButtons from './components/CourseButtons'
 
function App() {
    return (
        <div className="App">
            <div style={{width:"80%", margin:"auto"}}>
                <h1>Students Table</h1>
                <Students></Students>
                <StudentButtons></StudentButtons>
            </div>
            
            <div style={{width:"80%", margin:"auto"}}>
                <h1>Courses Table</h1>
                <Courses></Courses>
                <CourseButtons></CourseButtons>
            </div>

            <div style={{width:"80%", margin:"auto"}}>
                <h1>Instructors Table</h1>
                <Instructors></Instructors>
                <InstructorButtons></InstructorButtons>
            </div>
            
            <div style={{width:"80%", margin:"auto"}}>
                <h1>Grades Table</h1>
                <Grades></Grades>
                <GradeButtons></GradeButtons>
            </div>
        </div>
    );
}
 
export default App;
