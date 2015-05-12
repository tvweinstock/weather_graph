"use strict";
function draw(data) {
  data = _.sortBy(data, 'temp');
  var highestTemp = _.max(data, 'temp').temp;
  d3.select(".container").append("div").attr("class", "bargraph").selectAll(".bar").data(data).enter().append("div").attr("class", "bar").style("width", (function(d) {
    return d.temp / highestTemp * 100 + '%';
  })).text((function(d) {
    return (d.city + " (" + d.temp + ")");
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
