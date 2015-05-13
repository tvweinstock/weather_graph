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
function draw2(data2) {
  var margin = {
    top: 30,
    right: 10,
    bottom: 10,
    left: 30
  },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      barPadding = 1;
  var y0 = Math.max(Math.abs(d3.min(data2)), Math.abs(d3.max(data2)));
  var y = d3.scale.linear().domain([-y0, y0]).range([height, 0]).nice();
  var x = d3.scale.ordinal().domain(d3.range(data2.length)).rangeRoundBands([0, width], .2);
  var yAxis = d3.svg.axis().scale(y).orient("left");
  var svg = d3.select(".container2").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  svg.selectAll(".bar").data(data2).enter().append("rect").attr("class", function(d) {
    return d < 0 ? "bar negative" : "bar positive";
  }).attr("y", function(d) {
    return y(Math.max(0, d));
  }).attr("x", function(d, i) {
    return x(i);
  }).attr("height", function(d) {
    return Math.abs(y(d) - y(0));
  }).attr("width", x.rangeBand());
  var g = svg.append("g").attr("class", "x axis").call(yAxis);
  svg.append("g").attr("class", "y axis").append("line").attr("y1", y(0)).attr("y2", y(0)).attr("x1", 0).attr("x2", width);
  g.selectAll("text").data(data2).enter().append("text").text(function(d) {
    return d;
  }).attr("text-anchor", "middle").attr("x", function(d, i) {
    return i * (width / data2.length) + (width / data2.length - barPadding) / 2;
  }).attr("y", function(d) {
    return height - (d * 4) + 14;
  }).attr("font-family", "sans-serif").attr("font-size", "11px").attr("fill", "white");
}
var cityWeather = 'http://api.openweathermap.org/data/2.5/group?id=6094817,5392423,6167865,2988507&units=metric';
$.get(cityWeather, function(weather) {
  var response = weather;
  var ottawaTemp = response.list[0].main.temp;
  var sanMateoTemp = response.list[1].main.temp;
  var torontoTemp = response.list[2].main.temp;
  var parisTemp = response.list[3].main.temp;
  var data = [{
    "city": "Toronto",
    "temp": torontoTemp
  }, {
    "city": "Ottawa",
    "temp": ottawaTemp
  }, {
    "city": "San Mateo",
    "temp": sanMateoTemp
  }, {
    "city": "Paris",
    "temp": parisTemp
  }];
  var data2 = [torontoTemp, ottawaTemp, sanMateoTemp, parisTemp];
  draw(data);
  draw2(data2);
});
