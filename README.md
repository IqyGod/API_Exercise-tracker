# API_Exercise-tracker

This time is about to build an Exercise Tracker with Javascript and database storage.
<br>We connect to a MongoDB database and set up 2 models for storing __users__ and __exercise sessions__. 
<br>Then we can create express routes to __add__ and __retrieve__ data from the database which users can access through form POST and url GET routes.

Project boilerplate on freeCodeCamp:  
https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker

<img src="https://user-images.githubusercontent.com/99662300/171178064-512a8818-a92a-434e-b482-f60b58c7be2f.png" width=50% height=50%>

## Built with
- Node.js
- Express.js
- MongoDB

## User Story
1 - I can create a user by posting form data username to __/api/exercise/new-user__ and returned will be an object with username and _id
<br> 2 - I can get an array of all users by getting __api/exercise/users__ with the same info as when creating a user
<br> 3 - I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to __/api/exercise/add__. If no date supplied it will use current date. App will return the user object with the exercise fields added
<br> 4 - I can retrieve a full exercise log of any user by getting __/api/exercise/log__ with a parameter of userId(_id). App will return the user object with added array log and count (total exercise count)
<br> 5 - Styling and Final Touches

## Stretch Goals
- As a user, they can create thier username in databse
- As a registered user, they can update any other activities interested under thier username
- As a user, they can easily access to and retrieve all thier activies updated, including count of logs - how many activities have be registered. 


## Solution Link
https://project-exercisetracker.godherea.repl.co/
