import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";

// identifies columns and what the attribute fields are called for datagrid table 
const cols = [
    {
      field: 'id',
      headerName: 'Grade ID',
      editable: true, 
      flex: 1
    },
    {
      field: 'student_id',
      headerName: 'Student ID',
      editable: true, 
      flex: 1
    },
    {
      field: 'course_id',
      headerName: 'Course ID',
      editable: true, 
      flex: 1
    },
    {
      field: 'grade_value',
      headerName: 'Grade',
      flex: 1,
      editable: true,
    },
  ];
  
// const rows = [
//     {id: 1, student_id: 1, course_id: 1, grade: 0},
// ];
  
export default function Grades() {

  // using useState and useEffect hooks to set the rows in the datagrid using info retrieved from the database 
  const [grades, setGrades] = useState({id: 1, student_id:0, course_id: 1, grade_value: 0})
  
  useEffect(() => {
    axios({
        method: "GET",
        url:"http://127.0.0.1:5000/grades",
        })
        .then(
          (result) => {
            setGrades(result.data)
          },
          (error) => {
            console.log(error)
          }
        )
  }, [])

  return(
  <DataGrid rows = {grades} columns={cols}></DataGrid>)
}