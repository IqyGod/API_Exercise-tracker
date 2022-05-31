const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

let mongoose = require('mongoose');
let mongo = require('mongodb');

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})


// 01 - set up db
//mongo url: mongodb+srv://Giselle:G@cluster0.im2ul.mongodb.net/?retryWrites=true&w=majority
let uri = 'mongodb+srv://Giselle:G@cluster0.im2ul.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

// 02 - create a model -> 2 tables not in 1 
let ExerciseSchema = new mongoose.Schema({
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: String
})

let UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  log: [ExerciseSchema] //题目要求的
})

let User = mongoose.model('User', UserSchema)
let Exercise = mongoose.model('Exercise', ExerciseSchema)


// 03 - url parameter
let bodyParser = require('body-parser')


// body parser is midlleware function, parse req into index.html!!
app.post('/api/users', bodyParser.urlencoded({ extended: false }), (req,res) => {
  // 'username' comes from index.html => name='username'

// insert data in db
  let newUser = new User(
    {username: req.body.username}
  ) 
  
  // retrieve data
   newUser.save((error, data) => {
      if (!error) {
        let responseObject = {}
        responseObject['username'] = data.username
        responseObject['_id'] = data.id
        res.json(responseObject)
      }
    })
  })


// get an array of user+id : .find() 
// 1st argu : finding parameter
// 2nd argu : call back function
app.get('/api/users', (req,res) => {
  User.find({}, (error, arrayOfUsers) => {
    if (!error) {
      res.json(arrayOfUsers)
    }
  }) 
})



/* Add exercise session */
app.post('/api/users/:_id/exercises', bodyParser.urlencoded({ extended: false }), (req,res) => {

  let newExercise = new Exercise({
    description: req.body.description,
    duration: parseInt(req.body.duration),
    date: new Date(req.body.date).toDateString() // transfer yyyy-mm-dd to UTC string, 'Tue May 24 2022'
  })

  // if no date input => current date
  if (req.body.date === '') {
    newExercise.date = new Date().toDateString()
  }
    
  // [:_id] !!!  拜托你眼睛看清楚啦！！
  // .findByIdAndUpdate() has 4 arguments
  User.findByIdAndUpdate(
    req.body['_id'], // 1st - finding parameter
    {$push : {log: newExercise}}, // 2nd - updated part
    {new: true}, // 3rd - apply to newest ? boolean
    (error, updatedData) => { // 4th - call back function
      if (!error) {        
        let responseObject = {}
        responseObject['username'] = updatedData.username
        responseObject['description'] = newExercise.description
        responseObject['duration'] = newExercise.duration
        responseObject['_id'] = updatedData.id
        responseObject['date'] = newExercise.date 
        
        // 别忘了res.json()
        res.json(responseObject) 
      } 
    }
  )
})



app.get('/api/users/:_id/logs', (req, res) => {
  let input = req.params['_id']

  User.findById(input, (error, result) => {
    if (!error) {
      let responseObject = {
        
        username: result.username,
        count: result.log.length,
        _id: result.id,
        log: [{
          description: result.description,
          duration: result.duration,
          date: result.date
        }]
      }
      res.json(responseObject)
    }
  })
})