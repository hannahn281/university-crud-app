import { useRef } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import axios from "axios";
import Grades from './setupGrade';

export default function GradeButtons() {

    // uses as reference to see what is written in the text fields
    const gradeStudentIDRef = useRef('');
    const gradeCourseIDRef = useRef('');
    const gradeRef = useRef('');

    // clears text fields after you submit something
    function clear(){
        gradeStudentIDRef.current.value = "";
        gradeCourseIDRef.current.value = "";
        gradeRef.current.value = "";
    }

    // sends post request using info from text fields after clicking add button
    function handleSubmitAdd() {
        console.log("Add");
        const gradeDict = {"gradeStudentID": gradeStudentIDRef.current.value,
                        "gradeCourseID": gradeCourseIDRef.current.value, 
                        "grade": gradeRef.current.value}
        console.log(gradeDict)
        axios.post("http://127.0.0.1:5000/gradeButton", gradeDict)
            .then(
              (result) => {
                console.log(result)
              },
              (error) => {
                console.log(error)
              }
            )
        clear();
    }

    // sends put request using info from text fields after clicking edit button
    function handleSubmitEdit() {
        console.log("Edit");
        const gradeDict = {"gradeStudentID": gradeStudentIDRef.current.value,
            "gradeCourseID": gradeCourseIDRef.current.value, 
            "grade": gradeRef.current.value}
        axios.put("http://127.0.0.1:5000/gradeButton", gradeDict)
            .then(
              (result) => {
                console.log(result)
              },
              (error) => {
                console.log(error)
              }
            )
        clear();
    }

    // sends delete request based on info in text fields after clicking delete button
    function handleSubmitDelete() {
        console.log("Delete");
        const gradeDict = {"gradeStudentID": gradeStudentIDRef.current.value,
        "gradeCourseID": gradeCourseIDRef.current.value}
        console.log(gradeDict)
        axios.delete("http://127.0.0.1:5000/gradeButton", {data:gradeDict}) // no idea why axios makes u do data: for delete request
            .then(
              (result) => {
                console.log(result)
              },
              (error) => {
                console.log(error)
              }
            )
        clear();
    }

    return(
    <div>
        <form onSubmit={(e) => {
            //const buttonName = e.nativeEvent.submitter.name;
        }}>
            <Grid container>
                <Grid item xs={4}>
                    <p>Student ID:</p><TextField id="outlined-basic" defaultValue="" inputRef={gradeStudentIDRef} label="Student ID" variant="outlined" size='small'/>
                </Grid>
                <Grid item xs={4}>
                    <p>Course ID:</p><TextField id="outlined-basic" defaultValue="" inputRef={gradeCourseIDRef} label="Course ID" variant="outlined" size='small'/>
                </Grid>
                <Grid item xs={4}>
                    <p>Grade:</p><TextField id="outlined-basic" defaultValue="" inputRef={gradeRef} label="Grade" variant="outlined" size='small'/>
                </Grid>
            </Grid>
            <div style={{paddingTop: "25px", paddingBottom:"100px"}}>
                <Button variant="contained" type="submit" onClick={() => { handleSubmitAdd(); Grades();}}>Add</Button>
                <Button variant="contained" type="submit" onClick={() => { handleSubmitEdit(); Grades();}}>Edit</Button>
                <Button variant="contained" type="submit" onClick={() => { handleSubmitDelete(); Grades();}}>Delete</Button>
            </div>
        </form>
    </div>
    )
}