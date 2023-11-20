import { useRef } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import axios from "axios";
import Instructors from './setupInstructor';

export default function InstructorButtons() {

    // uses as reference to see what is written in the text fields
    const instructorIDRef = useRef('');
    const instructorNameRef = useRef('');
    const courseDepartmentRef = useRef('');

    // clears text fields after you submit something
    function clear(){
        instructorIDRef.current.value = "";
        instructorNameRef.current.value = "";
        courseDepartmentRef.current.value = "";
    }

    // sends post request using info from text fields after clicking add button
    function handleSubmitAdd() {
        console.log("Add");
        const instDict = {"instructorID": instructorIDRef.current.value,
                        "instructorName": instructorNameRef.current.value, 
                        "courseDepartment": courseDepartmentRef.current.value}
        console.log(instDict)
        axios.post("http://127.0.0.1:5000/instructorButton", instDict)
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
        const instDict = {"instructorID": instructorIDRef.current.value,
                        "instructorName": instructorNameRef.current.value, 
                        "courseDepartment": courseDepartmentRef.current.value}
        console.log(instDict)
        axios.put("http://127.0.0.1:5000/instructorButton", instDict)
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
        const instDict = {"instructorID": instructorIDRef.current.value}
        console.log(instDict)
        axios.delete("http://127.0.0.1:5000/instructorButton", {data:instDict}) // no idea why axios makes u do data: for delete request
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
                    <p>Instructor ID:</p><TextField id="outlined-basic" defaultValue="" inputRef={instructorIDRef} label="Instructor ID" variant="outlined" size='small'/>
                </Grid>
                <Grid item xs={4}>
                    <p>Instructor Name:</p><TextField id="outlined-basic" defaultValue="" inputRef={instructorNameRef} label="Instructor Name" variant="outlined" size='small'/>
                </Grid>
                <Grid item xs={4}>
                    <p>Course Department:</p><TextField id="outlined-basic" defaultValue="" inputRef={courseDepartmentRef} label="Course Department" variant="outlined" size='small'/>
                </Grid>
            </Grid>
            <div style={{paddingTop: "25px", paddingBottom:"100px"}}>
                <Button variant="contained" type="submit" onClick={() => { handleSubmitAdd(); Instructors();}}>Add</Button>
                <Button variant="contained" type="submit" onClick={() => { handleSubmitEdit(); Instructors();}}>Edit</Button>
                <Button variant="contained" type="submit" onClick={() => { handleSubmitDelete(); Instructors();}}>Delete</Button>
            </div>
        </form>
    </div>
    )
}