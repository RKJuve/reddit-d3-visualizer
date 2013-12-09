 
 
var VIZ = {};
 
VIZ.w = window.innerWidth-7;
VIZ.h = window.innerHeight-7;
 
//  // initialize "universe" of people
// var People = [
//   // name of person
//   {name: "Tom", isFriendsWith: []},       //0
//   {name: "Mary", isFriendsWith: []},       //1
//   {name: "Jane", isFriendsWith: []},       //2
//   {name: "Peter", isFriendsWith: []},       //3
//   {name: "Adam", isFriendsWith: []},       //4
//   {name: "Elizabeth", isFriendsWith: []},       //5
//   {name: "Jennifer", isFriendsWith: []},       //6
//   {name: "Linda", isFriendsWith: []},       //7
//   {name: "Barbara", isFriendsWith: []},       //8
//   {name: "Jessica", isFriendsWith: []},       //9
//   {name: "Dorothy", isFriendsWith: []},       //10
//   {name: "Sarah", isFriendsWith: []},       //11
//   {name: "Karen", isFriendsWith: []},       //12
//   {name: "Kimberly", isFriendsWith: []},       //13
//   {name: "Emily", isFriendsWith: []},       //14
//   {name: "Laura", isFriendsWith: []},       //15
//   {name: "Andrew", isFriendsWith: []},       //16
//   {name: "Brian", isFriendsWith: []},       //17
//   {name: "Timothy", isFriendsWith: []},       //18
//   {name: "Donna", isFriendsWith: []},
//   {name: "ForeverAlone :(", isFriendsWith:[]}
// ];

// /// takes an instance of People, changes its data to d3's format and returns it
// var d3ify = function(element, index) {
//   var dataset = {nodes:[],edges:[]};
//   var sourceIndex = index;
//   dataset.nodes[index] = {node: element.name};
//   _.each(element.isFriendsWith, function(element) {
//     dataset.edges.push({source: sourceIndex, target: element});
//   });
//   console.log(dataset);
//   return dataset;
// };

var D3dataset = {
  nodes:[],
  edges:[]
};



// D3dataset.addToDataset = function(element, index) {
//   var dataset = d3ify(element, index);
//   //console.log(dataset.edges);
//   D3dataset.nodes[index] = dataset.nodes[index];
//   _.each(dataset.edges, function(element){
//     D3dataset.edges.push(element);
//   });
// };

// _.each(People, D3dataset.addToDataset);

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
        .linkDistance([300])
        .charge([-10]);


// collision detection function
function collide(node) {
  var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2
        || x2 < nx1
        || y1 > ny2
        || y2 < ny1;
  };
}

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
     .append('a')
     .attr("xlink:href", function(d){ return d.link; })
     .classed('gnode', true);
    
  var node = gnodes.append("circle")
      .attr("class", "node")
      .attr("r", function(d) {
        return d.radius;
      })
      .call(force.drag);

  var labels = gnodes.append("text")
      .attr("text-anchor", "middle")
      .style({
        "fill": "white",
        "stroke": "black",
        "font-size": 28,
        "width": "100px"
      })
      .text(function(d) { return d.node; });


  force.on("tick", function(e) {
    //redraw links
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    //collision detection
    var q = d3.geom.quadtree(graph.nodes),
    i = 0,
    n = graph.nodes.length;

    while (++i < n) {
      q.visit(collide(graph.nodes[i]));
    }
    // redraw nodes
    gnodes.attr("transform", function(d) { 
        return 'translate(' + [d.x, d.y] + ')'; 
    });
      
    
     
  });
};

//drawGraph(D3dataset);





 
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