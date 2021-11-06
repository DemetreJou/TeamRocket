import React from "react";
import Chart from "react-google-charts";
import "./DataChart.css";

function DataChart(props) {
  return (
    <div className="DataChart">
      <Chart
        chartType={props.chartType}
        loader={<div>Loading Chart</div>}
        data={[
          ["Dinosaur", "Length"],
          ["Acrocanthosaurus (top-spined lizard)", 12.2],
          ["Albertosaurus (Alberta lizard)", 9.1],
          ["Allosaurus (other lizard)", 12.2],
          ["Apatosaurus (deceptive lizard)", 22.9]
        ]}
        options={{
          title: "Lengths of dinosaurs, in meters",
          legend: { position: "none" }
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}

export default DataChart;
