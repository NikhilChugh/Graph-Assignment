const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const graphData = require('./routes');
const port = process.env.port || 4000;

app.use(express.static(path.join(__dirname, 'public/build')))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/build", "index.html"));
 });

app.use(express.json());
app.use(cors());

app.use('/api/data', graphData)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
