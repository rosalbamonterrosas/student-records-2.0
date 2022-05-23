# Student Records - MongoDB, Node.js, and Express
Rosalba Monterrosas

# Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
  - [Versions](#versions)
  - [Deploying the Application](#deploying-the-application)
- [Project Explanation](#project-explanation)
  - [Add Student](#add-student)
  - [Update Student](#update-student)
  - [Delete Student](#delete-student)
  - [Get Student](#get-student)
  - [Search Students](#search-students)

## About the Project

This project contains a main html file, at http://localhost:5678, where the 
user can click on one of the following five options: add a student, update a 
student, delete a student, get a student, or search the students. The following 
HTTP methods are used in the request for each option:

* POST: create a new student and checks for duplicates
* PUT: update a student by record id
* DELETE: delete a student by record id
* GET: display a single student by record id
* GET: list all students, or search for students based on first and/or last name

The frontend interacts with the existing backend (studentserver.js).

### Built With

* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)
* [Node.js](https://nodejs.org/)
* [HTML](https://html.com)
* [CSS](https://www.w3.org/Style/CSS/)
* [Bootstrap](https://getbootstrap.com)
* [JavaScript](https://www.javascript.com/)
* [JQuery](https://jquery.com)
* [Font Awesome](https://fontawesome.com/)

### Versions

* node v17.5.0
* npm v8.4.1
* Bootstrap v5

### Deploying the Application

1.	Install the following
    * node v16.14.0
    * npm v8.4.1
    *	MongoDB

2.	Run the command `npm install` to install all modules listed as dependencies 
in `package.json`

3.	Start MongoDB

4.	Run the command `node studentserver.js` to start the server

## Project Explanation

### Add Student

Clicking on the “Add student” option in the home page opens up the 
addStudent.html file in a new tab. 

The addStudent.html file uses a form to obtain the values of the input fields, 
and sends a request using the POST method and input values to create a new 
student, as shown in the code below.

```
<!-- Form for input fields -->
<form action="/students" method="post">
    <div class="row">
    <!-- First name -->
    <label for="firstName" class="col-4 text-end">First name:</label>
    <input type="text" id="firstName" name="firstName" value="" class="col-4" required>
    </div>
    <br>
    <div class="row">
    <!-- Last name -->
    <label for="lastName" class="col-4 text-end">Last name:</label>
    <input type="text" id="lastName" name="lastName" value="" class="col-4" required>
    </div>
    <br>
    <div class="row">
    <!-- GPA -->
    <label for="gpa" class="col-4 text-end">GPA:</label>
    <input type="number" id="gpa" name="gpa" step="0.01" min="0" max="4" class="col-4" required>
    </div>
    <br>
    <!-- Enrolled radio buttons -->
    <label for="enrolled" class="col-4 text-end">Enrolled:</label>
    
    <input type="radio" id="true" name="enrolled" value=true required>
    <label for="true">True</label>

    <input type="radio" id="false" name="enrolled" value=false>
    <label for="false">False</label> 
    <br><br>
    <div class="row">
    <div class="col-5"></div>
    <!-- Submit button -->
    <input type="submit" value="Submit" class="btn-light col-2">
    </div>
</form> 
```

The function below is the POST method in the studentserver.js file, which
creates a record id based on the current time value, and adds the new student 
to the database if there is no duplicate found.

```
app.post('/students', function(req, res) {
  var recordId = new Date().getTime();
  return addStudent(recordId, req, res);
}); 
```

### Update Student

Next, clicking on the “Update student” option in the home page opens up the 
updateStudent.html file in a new tab. 

The function below depicts that when the form with id 'student_form' is 
submitted in the updateStudent.html file, ajax is used in the 
updateStudentScript.js file to send a request using the PUT method. The url of 
the request includes the record id from the user input. The request body 
includes the first name, last name, gpa, and enrollment status of the student. 
A success or error message is displayed depending on the result of the 
request.

```
$("#student_form").submit((event) => {
    // Get input fields' values
    var recordId = $("#recordId").val();
    var firstName_val = $("#firstName").val();
    var lastName_val = $("#lastName").val();
    var gpa_val = $("#gpa").val();
    var enrolled_val = $('input[name=enrolled]:checked').val();
    $.ajax({
      url: "http://localhost:5678/students/"+recordId,
      type: "put",
      data: { 
        firstName: firstName_val,
        lastName: lastName_val,
        gpa: gpa_val,
        enrolled: enrolled_val
      },
      success: function(response) {
        $("#result").text(JSON.stringify(response));
      },
      error: function(xhr) {
        $("#result").text('error: ' + xhr.responseText);  // error message 
      }
    });
    event.preventDefault();  // Prevent form from resetting
});
```

The function below is the PUT method in the studentserver.js file, which gets 
the record id from the parameter of the request URL. Updates a student's 
document in the database using the first name, last name, gpa, and enrollment 
status of the student included in the request body.

```
app.put('/students/:recordId', function(req, res) {
  var recordId = parseInt(req.params.recordId);
  var obj = createStudentObj(recordId, req);
  return updateStudent(recordId, obj, res);
}); 
```

### Delete Student

Next, clicking on the “Delete student” option in the home page opens up the 
deleteStudent.html file in a new tab. 

The function below depicts that when the form with id 'record_id_form' is 
submitted in the deleteStudent.html file, ajax is used in the 
deleteStudentScript.js file to send a request using the DELETE method. The url 
of the request includes the record id from the user input. A success or error 
message is displayed depending on the result of the request.

```
$("#recordId_form").submit((event) => {
    var recordId = $("#recordId").val();  // get record id input
    $.ajax({
      url: "http://localhost:5678/students/"+recordId,
      type: "delete",
      success: function(response) {
        $("#result").text(JSON.stringify(response));
      },
      error: function(xhr) {
        $("#result").text('error: ' + xhr.responseText);  // error message 
      }
    });
    event.preventDefault();  // Prevent form from resetting
    $("#recordId").val('');  // Clear record id input
});
```

The function below is the DELETE method in the studentserver.js file, which 
gets the record id from the parameter of the request URL. Deletes the student 
in the database pertaining to that record id.

```
app.delete('/students/:recordId', function(req, res) {
  var recordId = parseInt(req.params.recordId);
  return deleteStudent(recordId, res);
});
```

### Get Student

Next, clicking on the “Get student” option in the home page opens up the 
getStudent.html file in a new tab.

The function below depicts that when the form with id 'record_id_form' is 
submitted in the getStudent.html file, ajax is used in the 
getStudentScript.js file to send a request using the GET method. The url of 
the request includes the record id from the user input. A success or error 
message is displayed depending on the result of the request. 

```
$("#recordId_form").submit((event) => {
    var recordId = $("#recordId").val();  // get record id input
    $.ajax({
      url: "http://localhost:5678/students/"+recordId,
      type: "get",
      success: function(response) {
        $("#result").text(JSON.stringify(response));
      },
      error: function(xhr) {
        $("#result").text('error: ' + xhr.responseText);  // error message 
      }
    });
    event.preventDefault();  // Prevent form from resetting
    $("#recordId").val('');  // Clear record id input
});
```

The function below is the GET method in the studentserver.js file for getting a 
single student based on their record id, which gets the record id from the 
parameter of the request URL. Finds the student corresponding to that record id 
in the database and sends the student's data in the response.

```
app.get('/students/:recordId', function(req, res) {
  var recordId = parseInt(req.params.recordId);
  return findStudent(recordId, res);
}); 
```

### Search Students

Lastly, clicking on the “Search students” option in the home page opens up the 
searchStudent.html file in a new tab.

The searchStudent.html file uses a form to obtain the values of the first name 
and last name input fields, and sends a request using the GET method and input 
values to search the students, as shown in the code below.

```
<!-- Form for input fields -->
<form action="/students" method="get">
    <div class="row">
    <!-- First name -->
    <label for="firstName" class="col-4 text-end">First name:</label>
    <input type="text" id="firstName" name="firstName" value="" class="col-4">
    </div>
    <br>
    <div class="row">
    <!-- Last name -->
    <label for="lastName" class="col-4 text-end">Last name:</label>
    <input type="text" id="lastName" name="lastName" value="" class="col-4">
    </div>
    <br>
    <div class="row">
    <div class="col-5"></div>
    <!-- Submit button -->
    <input type="submit" value="Submit" class="btn-light col-2">
    </div>
</form> 
```

The function below is the GET method in the studentserver.js file for 
listing and searching for students, which gets the first name and last name of 
the student from the query parameters if included in the request URL. Searches 
the database to find a match for the first name and/or last name.

```
app.get('/students', function(req, res) {
  var firstName = req.query.firstName;
  var lastName = req.query.lastName;
  return searchStudents(firstName, lastName, res);
});
```
