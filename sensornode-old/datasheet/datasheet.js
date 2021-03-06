function draw(svg,elements) {
  var sel = svg.selectAll(".shapes").data(elements).enter();

  sel.append(function(d) {
    return document.createElementNS("http://www.w3.org/2000/svg", d.type)
  });

  svg.selectAll("circle")
  //sel.append("circle")
  .attr({
    cx: function(d) {
      return d.cx + 100;
    },
    cy: function(d) {
      return d.cy + 100;
    },
    r: function(d) {
      return d.r;
    },
    fill: function(d){
      return d.fill;
    }
  });

  svg.selectAll("rect")
  .attr({
    x: function(d) {
      return d.x + 100;
    },
    y: function(d) {
      return d.y + 100;
    },
    width: function(d) {
      return d.width;
    },
    height: function(d){
      return d.height;
    },
    fill: function(d){
      return d.fill;
    }
  });

  svg.selectAll("ellipse")
  .attr({
    cx: function(d) {
      return d.cx;
    },
    cy: function(d) {
      return d.cy;
    },
    rx: function(d) {
      return d.rx;
    },
    ry: function(d) {
      return d.ry;
    },
    fill: function(d){
      return d.fill;
    }
  });

  svg.selectAll("line")
  .attr({
    x1: function(d) {
      return d.x1 + 100;
    },
    y1: function(d) {
      return d.y1 + 100;
    },
    x2: function(d) {
      return d.x2 + 100;
    },
    y2: function(d) {
      return d.y2 + 100;
    },
    stroke: function(d){
      return d.stroke;
    },
    'stroke-width': function(d){
      return d['stroke-width'];
    }
  });

  svg.selectAll("polyline")
  .attr({
    points: function(d) {
      return d.points;
    },
    stroke: function(d){
      return d.stroke;
    },
    'stroke-width': function(d){
      return d['stroke-width'];
    }
  });

  svg.selectAll("polygon")
  .attr({
    points: function(d) {
      return d.points;
    },
    fill: function(d) {
      return d.fill;
    },
    stroke: function(d){
      return d.stroke;
    },
    'stroke-width': function(d){
      return d['stroke-width'];
    }
  });

  svg.selectAll("path")
  .attr({
    d:function(d){
      return d3.svg.line()
      .x(function(e){return e.x + 100})
      .y(function(e){return e.y + 100})
      .interpolate(d.interpolate)
      (d.d);
    },
    fill: function(d) {
      return d.fill;
    },
    stroke: function(d){
      return d.stroke;
    },
    'stroke-width': function(d){
      return d['stroke-width'];
    }
  });


}
function getTextBox(selection) {
    selection.each(function(d) { d.bbox = this.getBBox(); })
}

function addText(svg,pins) {
  var sel = svg.selectAll(".pin").data(pins).enter().append("g")
  .attr("class","pin")

  .attr("transform",function(d){return "translate("+(d.x+100)+","+(d.y+100)+") rotate("+d.angle+")"});
  sel.append("rect")
  .attr("width",7)
  .attr("height",7)
  .attr("x",-4)
  .attr("y",-4)
  .attr("fill","red")
  .attr("transform",function(d){return "rotate(-"+d3.select(this.parentNode).datum().angle+")"})

  var b = 0;
  var a = sel.selectAll('labs').data(function(item){return item.labels}).enter().append("g").attr("class",function(d){return "pin-"+d.type});
  a.append("text")
  .text(function(d){return d.value})
  .call(getTextBox)

  .attr("dx",function(d,i){if (i==0){b = 3};b = (b + d.bbox.width + 8); return b - d.bbox.width;})
  //.attr("transform",function(d){if(d3.select(this.parentNode.parentNode).datum().angle > 90 && d3.select(this.parentNode.parentNode).datum().angle < 270){return "rotate(180)"}else{return ""}})
  .attr("dy",function(d,i){return ".3em"})
  .call(getTextBox);

  a.insert("rect","text")
  //.attr("fill","#aaa")
  .attr("x", function(d){return d.bbox.x-2})
  .attr("y", function(d){return d.bbox.y-2})
  .attr("width", function(d){return d.bbox.width+4})
  .attr("height", function(d){return d.bbox.height+4})
  .attr("stroke-width",1)

}

var w = 600;
var h = 600;
var data;
//var json = JSON.parse('{"shape":{"elements":[{"type":"circle","cx":"80","cy":"50","r":15,"fill":"#555555"},{"type":"rect","x":"180","y":"50","height":15,"width":15,"fill":"#555555"}]},"pins":{}}');
var get = {};
//window.location.search.slice(1).split("&").forEach(function(d){var a = d.split("=");get[a[0]] = a[1]});

//if(typeof get.board != "undefined") {

//var element = json.shape.elements[0];
d3.json('board.json',function(error, response) {
//d3.json('../'+get.board+'/board.json',function(error, response) {
  if (error) return console.warn(error);
  data = response;
  d3.select("body")
    .append("H1")
    .html(data.name + " " + data.type);
  d3.select("body").append("hr");
  var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
  document.title = data.name + " - Datasheet"
  draw(svg,data.shape.elements);
  addText(svg,data.pins);
  d3.select("body").append("hr");
  var table = d3.select("body")
  .append("table")
  .append("tbody")
  .selectAll("tr")
  .data(data.info)
  .enter()
  .append("tr")
  .selectAll("td")
  .data(function(item){return item})
  .enter()
  .append("td")
  .html(function(d){return d});
});


// {
//
//   "label":"chipset",
//   "value":"STM32F401"
// },
// {
//   "label":"voltage",
//   "value":"???"
// }
