import { useRef } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import axios from "axios";
import Courses from './setupCourse';
import Grades from './setupGrade';

export default function InstructorButtons() {

    // uses as reference to see what is written in the text fields
    const courseIDRef = useRef('');
    const courseTitleRef = useRef('');
    const courseInstructorRef = useRef('');
    const addDropStudentIDRef = useRef('');
    const addDropCourseIDRef = useRef('')

    // clears text fields after you submit something
    function clear(){
        courseIDRef.current.value = "";
        courseTitleRef.current.value = "";
        courseInstructorRef.current.value = "";
    }

    // sends post request using info from text fields after clicking add button
    function handleSubmitAdd() {
        console.log("Add");
        const courseDict = {"courseID": courseIDRef.current.value,
                        "courseTitle": courseTitleRef.current.value, 
                        "courseInstructor": courseInstructorRef.current.value}
        console.log(courseDict)
        axios.post("http://127.0.0.1:5000/courseButton", courseDict)
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
        const courseDict = {"courseID": courseIDRef.current.value,
                        "courseTitle": courseTitleRef.current.value, 
                        "courseInstructor": courseInstructorRef.current.value}
        console.log(courseDict)
        axios.put("http://127.0.0.1:5000/courseButton", courseDict)
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
        const courseDict = {"courseID": courseIDRef.current.value}
        console.log(courseDict)
        console.log("poop")
        console.log(courseIDRef.current.value)
        console.log(courseInstructorRef.current.value)
        console.log(courseTitleRef.current.value)
        axios.delete("http://127.0.0.1:5000/courseButton", {data:courseDict}) // no idea why axios makes u do data: for delete request
            .then(
              (result) => {
                console.log(result)
              },
              (error) => {
                console.log(error)
              }
            )
        //clear();
    }
    function handleSubmitAddCourse() {
      console.log("Add");
      const addDropDict = {"addDropStudentID": addDropStudentIDRef.current.value,
                      "addDropCourseID": addDropCourseIDRef.current.value}
      console.log(addDropDict)
      axios.post("http://127.0.0.1:5000/addDropButton", addDropDict)
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
    function handleSubmitDropCourse() {
      console.log("Delete");
      const addDropDict = {"addDropStudentID": addDropStudentIDRef.current.value,
                      "addDropCourseID": addDropCourseIDRef.current.value}
      console.log(addDropDict)
      axios.delete("http://127.0.0.1:5000/addDropButton", {data:addDropDict}) // no idea why axios makes u do data: for delete request
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
                    <p>Course ID:</p><TextField id="outlined-basic" defaultValue="" inputRef={courseIDRef} label="Course ID" variant="outlined" size='small'/>
                </Grid>
                <Grid item xs={4}>
                    <p>Course Title:</p><TextField id="outlined-basic" defaultValue="" inputRef={courseTitleRef} label="Course Title" variant="outlined" size='small'/>
                </Grid>
                <Grid item xs={4}>
                    <p>Course Instructor:</p><TextField id="outlined-basic" defaultValue="" inputRef={courseInstructorRef} label="Course Instructor" variant="outlined" size='small'/>
                </Grid>
            </Grid>
            <div style={{paddingTop: "25px"}}>
                <Button variant="contained" type="submit" onClick={() => { handleSubmitAdd(); Courses();}}>Add</Button>
                <Button variant="contained" type="submit" onClick={() => { handleSubmitEdit(); Courses();}}>Edit</Button>
                <Button variant="contained" type="submit" onClick={() => { handleSubmitDelete(); Courses();}}>Delete</Button>
            </div>
            <Grid container>
                <Grid item xs={6}>
                    <p>Student ID:</p><TextField id="outlined-basic" defaultValue="" inputRef={addDropStudentIDRef} label="Student ID" variant="outlined" size='small'/>
                </Grid>
                <Grid item xs={6}>
                    <p>Course ID:</p><TextField id="outlined-basic" defaultValue="" inputRef={addDropCourseIDRef} label="Course ID" variant="outlined" size='small'/>
                </Grid>
            </Grid>
            <div style={{paddingTop: "25px", paddingBottom:"100px"}}>
                <Button variant="contained" type="submit" onClick={() => { handleSubmitAddCourse(); Grades();}}>Add Student to Course</Button>
                <Button variant="contained" type="submit" onClick={() => { handleSubmitDropCourse(); Grades();}}>Drop Student from Course</Button>
            </div>
        </form>
    </div>
    )
}