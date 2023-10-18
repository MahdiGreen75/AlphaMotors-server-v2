const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;

//middleware 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hey, I am still alive.")
})

app.listen(port, () => {
  console.log(`AlphaMotors server is running on port, ${port}`)
})