console.log('Loading Server...')
const PORT = 3000
const db = require('./db.json')

const express = require('express')
const logger = require('morgan')
const app = express()


//load middleware
//internal
app.use(logger('dev')) //passes on next
app.use(express.static('public')) //does not pass on next
//external

//bodyparsee
//helmet

//REST routes
//CRUDL
//C post(server id)
app.post('/TODO', (req, res) => {
  res.send('Got a POST request')
  // change db
  // write to file
  // return success
  // TODO AFTER getting post to work correctly change to put here
  // and on client
})

//R get all logs /logs?courseId=cs4660&uvuId=10111111
app.get('/api/v1/logs', (req, res) => {
  const {courseId, uvuId} = req.query
  // res.send(`get Logs ${courseId} ${uvuId}`)

  // get the data from the json file
  // filter for what you need
  // send it back

})

//U put(client id, full replace), patch(partial replace)
// app.put('/user', (req, res) => {
//   res.send('Got a PUT request at /user')
// })

//D delete
// app.delete('/user', (req, res) => {
//   res.send('Got a DELETE request at /user')
// })

//L get all courses
app.get('/api/v1/courses', (req, res) => {
  // const {courseId, uvuId} = req.query
  // res.send(`get Logs ${courseId} ${uvuId}`)

  // get the data from the json file
  // filter for what you need
  // send it back

})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

// let msg = new SpeechSynthesisUtterance('Hello World!')
// window.speechSynthesis.speak(msg)