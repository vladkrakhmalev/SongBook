const express = require('express')
const mongoose = require('mongoose')
const app = express()
const songsRoutes = require('./routes/songs')
const PORT = 3001

app.use(express.json())
app.use(songsRoutes)

async function start() {
  try {
    
    await mongoose.connect(
      'mongodb+srv://vladkrakhmalev:9NS-dPd-C5n-XMA@cluster.zirubkr.mongodb.net/songs'
    )

    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`)
    })
 
  } catch(error) {
    console.log(error)
  }
}

start()