from flask import Flask, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import json

# making app cross-origin so it can communicate server to server
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///cmsc_447_indiv_project.db"
# initialize the app with the extension
db = SQLAlchemy(app)


# creating the db tables
class Student(db.Model):
    __tablename__ = "Student"
    id = db.Column("id", db.Integer, primary_key=True, nullable=False)
    student_name = db.Column("student_name", db.String, nullable=False)
    credits_earned = db.Column("credits_earned", db.Integer, db.CheckConstraint(
        "typeof(credits_earned) = 'integer' and credits_earned >= 0"))
    grades = db.relationship('Grade', backref='Student', cascade="all, delete") # when student is deleted, grades delete

class Course(db.Model):
    __tablename__ = "Course"
    id = db.Column("id", db.Integer, primary_key=True, nullable=False)
    course_title = db.Column("course_title", db.String, nullable=False)
    course_instructor = db.Column(db.Integer, db.ForeignKey('Instructor.id'), nullable=False)
    grades = db.relationship('Grade', backref='Course',cascade="all, delete") # when course is deleted, grades delete

class Instructor(db.Model):
    __tablename__ = "Instructor"
    id = db.Column("id", db.Integer, primary_key=True, nullable=False)
    instructor_name = db.Column("instructor_name", db.String, nullable=False)
    course_department = db.Column("course_department", db.String, nullable=False)
    courses = db.relationship('Course', backref='Instructor',cascade="all, delete") # when instructor is deleted, courses delete

class Grade(db.Model):
    __tablename__ = "Grade"
    id = db.Column("id", db.Integer, primary_key=True, nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey('Student.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('Course.id'), nullable=False)
    grade_value = db.Column(db.Integer, db.CheckConstraint(
        "typeof(grade_value) = 'integer' and grade_value >= 0 and grade_value <= 100"), nullable=True)


# end points for getting database info to display it onto the four tables
# queries each table and returns info as an array for the datagrid to display via useEffect
@app.route("/students")
def displayStudent():
    res = []
    for student in Student.query.all():
        d = {}
        for column in student.__table__.columns:
            d[column.name] = getattr(student, column.name)
        res.append(d)
    return(res)

@app.route("/courses")
def displayCourse():
    res = []
    for course in Course.query.all():
        d = {}
        for column in course.__table__.columns:
            d[column.name] = getattr(course, column.name)
        res.append(d)
    return(res)

@app.route("/instructors")
def displayInstructor():
    res = []
    for instructor in Instructor.query.all():
        d = {}
        for column in instructor.__table__.columns:
            d[column.name] = getattr(instructor, column.name)
        res.append(d)
    return(res)

@app.route("/grades")
def displayGrade():
    res = []
    for grade in Grade.query.all():
        d = {}
        for column in grade.__table__.columns:
            d[column.name] = getattr(grade, column.name)
        res.append(d)
    return(res)


# end points to add/edit/delete from the tables via buttons
@app.route("/studentButton", methods =['POST', 'PUT', 'DELETE'])
def studentButton():
    if request.method == "POST":
        data = json.loads(request.data)
        id = data['studentID']
        name = data['studentName']
        credits = data['creditsEarned']
        # takes post's request data to make new student
        new_student = Student(id=id,student_name=name,credits_earned=credits)
        
        try:
            db.session.add(new_student)
            db.session.commit()
            return "Added"
        except:
            return "Invalid Input"
    
    elif request.method == "PUT":
        data = json.loads(request.data)
        id = data['studentID']
        # tries to find student via ID, if exists, then change the attributes
        edited_student = Student.query.get_or_404(id)
        edited_student.student_name = request.json['studentName']
        edited_student.credits_earned = request.json['creditsEarned']
        
        try:
            db.session.commit()
            return "Edited"
        except:
            return "Could not edit: Student ID Does Not Exist"
    
    elif request.method == "DELETE":
        data = json.loads(request.data)
        id = data['studentID']
        # tries to find student via ID, if exists, then delete student
        deleted_student = Student.query.get_or_404(id) 
        
        try:
            db.session.delete(deleted_student)
            db.session.commit()
            return "Deleted"
        except:
            return "Could not delete: Student ID Does Not Exist"
    else:
        return
    
@app.route("/courseButton", methods =['POST', 'PUT', 'DELETE'])
def courseButton():
    if request.method == "POST":
        data = json.loads(request.data)
        id = data['courseID']
        title = data['courseTitle']
        instructor = data['courseInstructor']
        # checks if instructor for course exists, if so, then use request data to make new course
        exists = Instructor.query.get(instructor)
        if exists != None:
            new_course = Course(id=id,course_title=title,course_instructor=instructor) 
        
        try:
            db.session.add(new_course)
            db.session.commit()
            return "Added"
        except:
            return "Invalid Input"
    
    elif request.method == "PUT":
        data = json.loads(request.data)
        id = data['courseID']
        # tries to find course via ID, if exists, then change the attributes
        edited_course = Course.query.get_or_404(id)
        edited_course.course_title = request.json['courseTitle']
        edited_course.course_instructor = request.json['courseInstructor']
        
        try:
            db.session.commit()
            return "Edited"
        except:
            return "Could not edit: Course or Instructor ID Does Not Exist"
    
    elif request.method == "DELETE":
        data = json.loads(request.data)
        id = data['courseID']
        # tries to find course via ID, if exists, then delete course
        deleted_course = Course.query.get_or_404(id)
        
        try:
            db.session.delete(deleted_course)
            db.session.commit()
            return "Deleted"
        except:
            return "Could not delete: Course ID Does Not Exist"
    else:
        return

@app.route("/instructorButton", methods =['POST', 'PUT', 'DELETE'])
def instructorButton():
    if request.method == "POST":
        data = json.loads(request.data)
        id = data['instructorID']
        name = data['instructorName']
        department = data['courseDepartment']
        # takes post's request data to make new instructor
        new_instructor = Instructor(id=id,instructor_name=name,course_department=department)
        
        try:
            db.session.add(new_instructor)
            db.session.commit()
            return "Added"
        except:
            return "Invalid Input"
    
    elif request.method == "PUT":
        data = json.loads(request.data)
        id = data['instructorID']
        # tries to find instructor via ID, if exists, then change the attributes
        edited_instructor = Instructor.query.get_or_404(id)
        edited_instructor.instructor_name = request.json['instructorName']
        edited_instructor.course_department = request.json['courseDepartment']
        try:
            db.session.commit()
            return "Edited"
        except:
            return "Could not edit: Instructor ID Does Not Exist"
    
    elif request.method == "DELETE":
        data = json.loads(request.data)
        id = data['instructorID']
        # tries to find instructor via ID, if exists, then delete instructor
        deleted_instructor = Instructor.query.get_or_404(id)
        try:
            db.session.delete(deleted_instructor)
            db.session.commit()
            return "Deleted"
        except:
            return "Could not delete: Instructor ID Does Not Exist"
    else:
        return
    
@app.route("/gradeButton", methods =['POST', 'PUT', 'DELETE'])
def gradeButton():
    if request.method == "POST":
        data = json.loads(request.data)
        stud_id = data['gradeStudentID']
        course_id = data['gradeCourseID']
        grade = data['grade']
        
        # checks that the student exists, the course exists, and there isnt already a grade for that student+course combo
        # once thats clear, use request data to make grade
        stud_exists = Student.query.get(stud_id)
        course_exists = Course.query.get(course_id)
        found_grade = Grade.query.filter(Grade.student_id == stud_id, Grade.course_id == course_id).first()
        new_grade = None
        if stud_exists != None and course_exists != None and found_grade == None:
            new_grade = Grade(student_id=stud_id,course_id=course_id,grade_value=grade)        
        
        try:
            db.session.add(new_grade)
            db.session.commit()
            return "Added"
        except:
            return "Invalid Input"
   
    elif request.method == "PUT":
        data = json.loads(request.data)
        stud_id = data['gradeStudentID']
        course_id = data['gradeCourseID']
        
        # tries to find grade via student and course id, if exists, then change the attributes
        found_grade = Grade.query.filter(Grade.student_id == stud_id, Grade.course_id == course_id).first()
        found_id = None
        if found_grade != None:
            found_id = found_grade.id
        edited_grade = Grade.query.get_or_404(found_id)
        edited_grade.grade_value = request.json['grade']
        
        try:
            db.session.commit()
            return "Edited"
        except:
            return "Could not edit: Grade for this Student and Course Does Not Exist"
    
    elif request.method == "DELETE":
        data = json.loads(request.data)
        stud_id = data['gradeStudentID']
        course_id = data['gradeCourseID']

        # tries to find grade via student and course id, if exists, then delete
        found_grade = Grade.query.filter(Grade.student_id == stud_id, Grade.course_id == course_id).first()
        found_id = None
        if found_grade != None:
            found_id = found_grade.id
        deleted_grade = Grade.query.get_or_404(found_id)
        
        try:
            db.session.delete(deleted_grade)
            db.session.commit()
            return "Deleted"
        except:
            return "Could not delete: Grade for this Student and Course Does Not Exist"
    else:
        return

@app.route("/addDropButton", methods =['POST', 'DELETE'])
def addDropButton():
    if request.method == "POST":
        data = json.loads(request.data)
        stud_id = data['addDropStudentID']
        course_id = data['addDropCourseID']

        # checks that the student exists, the course exists, and there isnt already a grade for that student+course combo
        # once thats clear, use request data to make grade without grade value (since they just joined the class)
        stud_exists = Student.query.get(stud_id)
        course_exists = Course.query.get(course_id)
        found_grade = Grade.query.filter(Grade.student_id == stud_id, Grade.course_id == course_id).first()
        added_grade = None
        if stud_exists != None and course_exists != None and found_grade == None:
            added_grade = Grade(student_id=stud_id,course_id=course_id,grade_value=0)   
        
        try:
            db.session.add(added_grade)
            db.session.commit()
            return "Added"
        except:
            return "Invalid Input"
    
    elif request.method == "DELETE":
        data = json.loads(request.data)
        stud_id = data['addDropStudentID']
        course_id = data['addDropCourseID']

        # tries to find grade via student and course id, if exists, then "drop" student from course (delete grade)
        found_grade = Grade.query.filter(Grade.student_id == stud_id, Grade.course_id == course_id).first()
        found_id = None
        if found_grade != None:
            found_id = found_grade.id
        deleted_grade = Grade.query.get_or_404(found_id)
        
        try:
            db.session.delete(deleted_grade)
            db.session.commit()
            return "Deleted"
        except:
            return "Could not drop: Student is not in this course"
    else:
        return


# creating the tables and adding examples 
with app.app_context():
    #create DB
    db.drop_all()
    db.create_all()

    # adding as examples
    example1 = Student(id = 1, student_name="Hannah Nguyen", credits_earned=106)
    example2 = Student(id = 2, student_name="Rebecca Nguyen", credits_earned=120)
    example3 = Instructor(id = 1234, instructor_name="Samit Shivadekar", course_department = "Computer Science")
    example4 = Course(id = 3456, course_title="Software Engineering I", course_instructor = 1234)
    example5 = Grade(student_id = 1, course_id=3456, grade_value = 95)
    example6 = Grade(student_id = 2, course_id=3456, grade_value = 98)
    db.session.add(example1)
    db.session.add(example2)
    db.session.add(example3)
    db.session.add(example4)
    db.session.add(example5)
    db.session.add(example6)
    db.session.commit()

# main (not exactly sure if this does anything)
if __name__ == "__main__":
    app.run(debug=True)