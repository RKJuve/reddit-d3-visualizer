 
 
var VIZ = {};
 
VIZ.w = 700;
VIZ.h = 400;
 
 // initialize "universe" of people
var People = [
  // name of person
  {name: "Tom", isFriendsWith: [1]},       //0
  {name: "Mary", isFriendsWith: [2,4,5]},       //1
  {name: "Jane", isFriendsWith: [3]},       //2
  {name: "Peter", isFriendsWith: [1]},       //3
  {name: "Adam", isFriendsWith: [0]},       //4
  {name: "Elizabeth", isFriendsWith: [6]},       //5
  {name: "Jennifer", isFriendsWith: []},       //6
  {name: "Linda", isFriendsWith: [8]},       //7
  {name: "Barbara", isFriendsWith: []},       //8
  {name: "Jessica", isFriendsWith: [10]},       //9
  {name: "Dorothy", isFriendsWith: []},       //10
  {name: "Sarah", isFriendsWith: [12]},       //11
  {name: "Karen", isFriendsWith: [4]},       //12
  {name: "Kimberly", isFriendsWith: [2]},       //13
  {name: "Emily", isFriendsWith: [2]},       //14
  {name: "Laura", isFriendsWith: [2]},       //15
  {name: "Andrew", isFriendsWith: [15]},       //16
  {name: "Brian", isFriendsWith: [1,0,18]},       //17
  {name: "Timothy", isFriendsWith: []},       //18
  {name: "Donna", isFriendsWith: [18,1]},
  {name: "ForeverAlone :(", isFriendsWith:[]}
];

/// takes an instance of People, changes its data to d3's format and returns it
var d3ify = function(element, index) {
  var dataset = {nodes:[],edges:[]};
  var sourceIndex = index;
  dataset.nodes[index] = {node: element.name};
  _.each(element.isFriendsWith, function(element) {
    dataset.edges.push({source: sourceIndex, target: element});
  });
  return dataset;
};

var D3dataset = {nodes:[],edges:[]};



D3dataset.addToDataset = function(element, index) {
  var dataset = d3ify(element, index);
  //console.log(dataset.edges);
  D3dataset.nodes[index] = dataset.nodes[index];
  _.each(dataset.edges, function(element){
    D3dataset.edges.push(element);
  });
};

_.each(People, D3dataset.addToDataset);

////////////////////////
//var tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d.node; });

var svg = d3.select("body")
        .append("svg")
        .attr("width", VIZ.w)
        .attr("height", VIZ.h)
        .attr("class", "forceClass");
 
var force = d3.layout.force()
        // .nodes(dataset.nodes)
        // .links(dataset.edges)
        .size([VIZ.w, VIZ.h])
        .linkDistance([20])
        .charge([-300]);

var drawGraph = function(graph) {
  force
      .nodes(graph.nodes)
      .links(graph.edges)
      .start();

  var link = svg.selectAll("line")
      .data(graph.edges)
      .enter()
      .append("line")

  var gnodes = svg.selectAll('g.gnode')
     .data(graph.nodes)
     .enter()
     .append('g')
     .classed('gnode', true);
    
  var node = gnodes.append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .call(force.drag);

  var labels = gnodes.append("text")
      .attr("dx", "10px")
      .text(function(d) { return d.node; });

  console.log(labels);
    
  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    gnodes.attr("transform", function(d) { 
        return 'translate(' + [d.x, d.y] + ')'; 
    });
      
    
      
  });
};

drawGraph(D3dataset);





 
// var edges = svg.selectAll("line")
//         .data(dataset.edges)
//         .enter()
//         .append("line");
 
// var nodes = svg.selectAll("circle")
//         .data(dataset.nodes)
//         .enter()
//         .append("circle")
//         .attr("r", 10)
//         .attr("class", "node")
//         .call(force.drag);

// var labels = svg
//         .append("text")
//         .style("color", "black")
//         .style("height", "30px")
//         .style("width", "50px")
//         .attr("x", 100)
//         .attr("y", 100)
//         .text("test");


// nodes.call(tip)
//     .on('mouseover', tip.show)
//     .on('mouseout', tip.hide);
 
// force.on("tick", function(){
 
//         edges.attr("x1", function(d){ return d.source.x; })
//               .attr("y1", function(d){ return d.source.y; })
//               .attr("x2", function(d){ return d.target.x; })
//               .attr("y2", function(d){ return d.target.y; });
 
//         nodes.attr("cx", function(d){ return d.x; })
//               .attr("cy", function(d){ return d.y; });
 
// });