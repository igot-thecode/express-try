console.log('Loading Server...')
const express = require('express')
const app = express()
const PORT = 3000

//load middleware

//REST routes
//CRUDL
//C post(server id)

//R get 1

//U put(client id, full replace), patch(partial replace)

//D delete

//L get all

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

// let msg = new SpeechSynthesisUtterance('Hello World!')
// window.speechSynthesis.speak(msg)