import React, {  useEffect, useRef } from "react";
window.d3 = require('d3')
const functionPlot = require('function-plot')
const math = require("mathjs");
const Showdata = props => {
  const functiongraph = useRef(null);
  useEffect(() => {
    functionPlot({
      target: functiongraph.current,
      width: 725,
      height: 400,
      data: [{
        fn: props.data.fn.replace("e",math.e),
        color: "green",
        graphType: 'polyline'
      },
      {
        points: [
          [props.data.x, props.data.y]
        ],
        fnType: 'points',
        graphType: 'scatter',
        color: "red",
        attr: { r: "3" },
      }],
    })
  })
  return (
  <div ref={functiongraph}></div>
  );
};
export default Showdata;