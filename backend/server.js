const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {FRONTEND_URL, PORT, loginDB, passwordDB} = require('./config')
const songRoutes = require('./routes/songRoutes')
const authRoutes = require('./routes/authRoutes')
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: [FRONTEND_URL],
  credentials: true
}))
app.use('/api', songRoutes)
app.use('/api', authRoutes)

async function start() {
  try {
    
    await mongoose.connect(
      `mongodb+srv://${loginDB}:${passwordDB}@cluster.zirubkr.mongodb.net/songs`
    )

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}...`)
    })
 
  } catch(e) {
    console.log(e)
  }
}

start()