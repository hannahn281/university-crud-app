import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";

// identifies columns and what the attribute fields are called for datagrid table 
const cols = [
    {
      field: 'id',
      headerName: 'Instructor ID',
      editable: true, 
      flex: 1
    },
    {
      field: 'instructor_name',
      headerName: 'Instructor Name',
      editable: true, 
      flex: 1
    },
    {
      field: 'course_department',
      headerName: 'Course Department',
      flex: 1,
      editable: true,
    },
  ];
  
// const rows = [
//     {id: 1, instructor_name: "Hanhan", course_department: "default"},
// ];
  
export default function Instructors() {

  // using useState and useEffect hooks to set the rows in the datagrid using info retrieved from the database 
  const [instructors, setInstructors] = useState({id: 1, instructor_name: 'Loading...', course_department: '0'})
  
  useEffect(() => {
    axios({
        method: "GET",
        url:"http://127.0.0.1:5000/instructors",
        })
        .then(
          (result) => {
            setInstructors(result.data)
          },
          (error) => {
            console.log(error)
          }
        )
  }, [])

  return(
  <DataGrid rows = {instructors} columns={cols}></DataGrid>)
}