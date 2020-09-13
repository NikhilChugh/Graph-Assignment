import React, { useState, useEffect } from "react";
import "./App.scss";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import axios from "axios";

const App = () => {
  const [graphData, setGraphData] = useState([]);
  const [type, setType] = useState("A");

  const filterCumulativeData = (data) => {
    let sumMay = 0;
    let countMay = 0;
    let sumJun = 0;
    let countJun = 0;
    let sumJul = 0;
    let countJul = 0;
    let sumAug = 0;
    let countAug = 0;
    let sumSept = 0;
    let countSept = 0;
    let sumOct = 0;
    let countOct = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].Date === "May") {
        sumMay += Number(data[i].Number);
        countMay++;
      }
      if (data[i].Date === "Jun") {
        sumJun += Number(data[i].Number);
        countJun++;
      }
      if (data[i].Date === "Jul") {
        sumJul += Number(data[i].Number);
        countJul++;
      }
      if (data[i].Date === "Aug") {
        sumAug += Number(data[i].Number);
        countAug++;
      }
      if (data[i].Date === "Sept") {
        sumSept += Number(data[i].Number);
        countSept++;
      }
      if (data[i].Date === "Oct") {
        sumOct += Number(data[i].Number);
        countOct++;
      }
    }
    return [
      {
        type: data[0].Type,
        avg: countMay !== 0 ? Math.floor(sumMay / countMay) : 0,
        month: "May",
      },
      {
        type: data[0].Type,
        avg: countJun !== 0 ? Math.floor(sumJun / countJun) : 0,
        month: "Jun",
      },
      {
        type: data[0].Type,
        avg: countJul !== 0 ? Math.floor(sumJul / countJul) : 0,
        month: "Jul",
      },
      {
        type: data[0].Type,
        avg: countAug !== 0 ? Math.floor(sumAug / countAug) : 0,
        month: "Aug",
      },
      {
        type: data[0].Type,
        avg: countSept !== 0 ? Math.floor(sumSept / countSept) : 0,
        month: "Sept",
      },
      {
        type: data[0].Type,
        avg: countOct !== 0 ? Math.floor(sumOct / countOct) : 0,
        month: "Oct",
      },
    ];
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:4000/api/data/graphData?type=${type}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        if (res.data.responseStatus.statusCode === 0) {
          const data = filterCumulativeData(res.data.responseData);
          setGraphData(data);
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  }, [type]);

  const typeChangeHandler = (e) => {
    setType(e.target.value);
  };

  console.log(graphData);

  if (graphData) {
    return (
      <>
        <div className="selectBox-container">
          <strong>Select Type: </strong>
          <select onChange={typeChangeHandler}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div>
        <div className="barChart">
          <BarChart width={730} height={350} data={graphData}>
            <XAxis dataKey="month" axisLine = {false} tickLine = {false} />
            <YAxis axisLine = {false}  tickLine = {false}/>
            <Tooltip />
            <Bar dataKey="avg" fill="orange" barSize={35} />
          </BarChart>
        </div>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default App;
