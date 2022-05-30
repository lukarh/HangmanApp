const express = require('express')

const app = express()

app.get('/', (req, res) => {
  console.log('Here')
  //// Can combine Statuses with Send Requests ////
  // res.sendStatus(500)
  // res.status(500).send('Hi')
  // res.status(500).json({ message: "Error" })

  //// Download 
  // res.download("server.js")

  //// Rendering
  //res.render('index')

  res.send('Hi')

})

const wordsRouter = require('./routes/words.js')

app.use('/words', wordsRouter)

app.listen(5000)