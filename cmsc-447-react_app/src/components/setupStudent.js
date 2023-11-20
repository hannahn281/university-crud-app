import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";

// identifies columns and what the attribute fields are called for datagrid table 
const cols = [
    {
      field: 'id',
      headerName: 'Student ID',
      editable: true, 
      flex: 1
    },
    {
      field: 'student_name',
      headerName: 'Student Name',
      editable: true, 
      flex: 1
    },
    {
      field: 'credits_earned',
      headerName: 'Credits Earned',
      flex: 1,
      editable: true,
    },
  ];
  
// const rows = [
//     {id: 1, student_name: 'default', credits_earned: 0},
// ];
  
export default function Students() {

  // using useState and useEffect hooks to set the rows in the datagrid using info retrieved from the database 
  const [students, setStudents] = useState({id: 1, student_name: 'Loading...', credits_earned: 0})
  
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/students")
        .then(
          (result) => {
            setStudents(result.data)
          },
          (error) => {
            console.log(error)
          }
        )
  }, [])

  return(
  <DataGrid rows = {students} columns={cols}></DataGrid>)
}