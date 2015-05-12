"use strict";
function draw(data) {
  var width = 600,
      barHeight = 40;
  var max = d3.max(data, (function(d) {
    return d.temp;
  }));
  var xScale = d3.scale.linear().domain([0, max]).range([100, width]);
  var chart = d3.select('.main').attr('width', width).attr('height', barHeight * data.length);
  var g = chart.selectAll('g').data(data).enter().append('g').attr('transform', (function(d, i) {
    return "translate(0," + i * barHeight + ")";
  }));
  g.append("rect").attr('width', (function(d) {
    return xScale(d.temp);
  })).attr('height', barHeight - 1);
  g.append('text').attr('x', (function(d) {
    return xScale(d.temp) - 30;
  })).attr('y', barHeight / 2).text((function(d) {
    return d.temp;
  }));
  g.append('text').attr('x', 5).attr('y', barHeight / 2).text((function(d) {
    return d.city;
  }));
}
var data = [{
  "city": "Toronto",
  "temp": 20
}, {
  "city": "Ottawa",
  "temp": 15
}, {
  "city": "San Mateo",
  "temp": 20
}, {
  "city": "Paris",
  "temp": 25
}];
draw(data);
