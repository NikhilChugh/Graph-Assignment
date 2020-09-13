const express = require("express");
const {sendSuccessResponse, sendErrorResponse} = require('./utils/reqResFormat');
const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const router = express.Router();

const filePath = path.join(__dirname, "./data/Data.csv");


router.get("/graphData", async (req, res) => {
try{
  let dataArray = [];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  fs.createReadStream(filePath)
    .pipe(csv.parse({ headers: true, ignoreEmpty: true }))
    .transform((row) => ({
      Index: row["?Index"],
      Type: row.Type,
      Number: row.Number,
      Date:
        months[
          (row.Date.split("/")[1].split("")[0] === "0"
            ? row.Date.split("/")[1].split("")[1]
            : row.Date.split("/")[1]) - 1
        ],
    }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => {
      if(row.Type === req.query.type){
      dataArray.push(row);
      }
    })
    .on("end", (rowCount) => {
      console.log(`Parsed ${rowCount} rows`);
      res.status(200).send(sendSuccessResponse(dataArray, 0));
    });
} 
catch(e){
    res.status(400).send(sendErrorResponse(e, 1))
}
});

module.exports = router;
