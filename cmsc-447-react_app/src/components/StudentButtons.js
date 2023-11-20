import { useRef } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import axios from "axios";
import Students from './setupStudent';

export default function StudentButtons() {

    // uses as reference to see what is written in the text fields
    const studentIDRef = useRef('');
    const studentNameRef = useRef('');
    const creditsEarnedRef = useRef('');

    // clears text fields after you submit something
    function clear(){
        studentIDRef.current.value = "";
        studentNameRef.current.value = "";
        creditsEarnedRef.current.value = "";
    }

    // sends post request using info from text fields after clicking add button
    function handleSubmitAdd() {
        console.log("Add");
        const studDict = {"studentID": studentIDRef.current.value, 
                        "studentName": studentNameRef.current.value, 
                        "creditsEarned": creditsEarnedRef.current.value}
        console.log(studDict)
        axios.post("http://127.0.0.1:5000/studentButton", studDict)
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
        const studDict = {"studentID": studentIDRef.current.value, 
                        "studentName": studentNameRef.current.value, 
                        "creditsEarned": creditsEarnedRef.current.value}
        console.log(studDict)
        axios.put("http://127.0.0.1:5000/studentButton", studDict)
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
        const studDict = {"studentID": studentIDRef.current.value}
        console.log(studDict)
        axios.delete("http://127.0.0.1:5000/studentButton", {data:studDict}) // no idea why axios makes u do data: for delete request
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
                    <p>Student ID:</p><TextField id="outlined-basic" defaultValue="" inputRef={studentIDRef} label="Student ID" variant="outlined" size='small'/>
                </Grid>
                <Grid item xs={4}>
                    <p>Name:</p><TextField id="outlined-basic" defaultValue="" inputRef={studentNameRef} label="Name" variant="outlined" size='small'/>
                </Grid>
                <Grid item xs={4}>
                    <p>Credits Earned:</p><TextField id="outlined-basic" defaultValue="" inputRef={creditsEarnedRef} label="Credits Earned" variant="outlined" size='small'/>
                </Grid>
            </Grid>
            <div style={{paddingTop: "25px", paddingBottom:"100px"}}>
                <Button name="Add" type="submit" variant="contained" onClick={() => { handleSubmitAdd(); Students();}}>Add</Button>
                <Button name="Edit" type="submit" variant="contained" onClick={() => { handleSubmitEdit(); Students();}}>Edit</Button>
                <Button name="Delete" type="submit" variant="contained" onClick={() => { handleSubmitDelete(); Students();}}>Delete</Button>
            </div>
        </form>
        </div>
    )
}