import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";

// identifies columns and what the attribute fields are called for datagrid table 
const cols = [
    {
      field: 'id',
      headerName: 'Course ID',
      editable: true, 
      flex: 1
    },
    {
      field: 'course_title',
      headerName: 'Course Title',
      editable: true, 
      flex: 1
    },
    {
      field: 'course_instructor',
      headerName: 'Course Instructor',
      flex: 1,
      editable: true,
    },
  ];
  
// const rows = [
//     {id: 1, course_title: 'default', course_instructor: 'i hate life'},
// ];
  
export default function Courses() {
  
  // using useState and useEffect hooks to set the rows in the datagrid using info retrieved from the database 
  const [courses, setCourses] = useState({id: 1, course_title: 'Loading...', course_instructor: '0'})
  
  useEffect(() => {
    axios({
        method: "GET",
        url:"http://127.0.0.1:5000/courses",
        })
        .then(
          (result) => {
            setCourses(result.data)
          },
          (error) => {
            console.log(error)
          }
        )
  }, [])

  return(
  <DataGrid rows = {courses} columns={cols}></DataGrid>)
}