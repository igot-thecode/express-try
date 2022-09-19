console.log('Loading Server...')
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')

const app = express()

const PORT = 3000
const db = require('./db.json')

//load middleware

//internal
app.use(logger('dev')) //passes on next
app.use(helmet())

//making web root directory
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

//404 page
app.get('*', (req, res, err) => {
  res.send('File Not Found Hoser.')
})

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})


function gracefulShutdown() {
  // clean up and prepare to die
  server.close(() => {
    console.log('Server is closed.')
  })
}

process.on('SIGINT', () => {
  console.log('Received SIGINT')
  gracefulShutdown()
})