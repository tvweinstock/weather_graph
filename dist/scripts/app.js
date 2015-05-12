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
  draw(data);
});
