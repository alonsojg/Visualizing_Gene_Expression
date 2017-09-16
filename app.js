//height of each row in the heatmap
var height = 20;

//width of each column in the heatmap
var width = 20;

//margins
var marginLeft = 100
var marginTop = 100

//legendA
var colors = ['#ffcc66','#ff6666','#000000']

//attach a SVG element to the document's body
var mySVG = d3.select("body")
   .append("svg")
   .attr("width", (width * cols.length)+ 250) 
   .attr("height", (height * rows.length + 500))
   .style('position','absolute')
   .style('top',100)
   .style('left',marginLeft)
   .style('background', 'white')
   
var title = mySVG.append('svg:text')
   .attr('y', 50)
   .attr('x',100)
   .text('Genetic Expression Level in Separate Leukemia Subtype.')
   .attr('font-size', 30)

//define a color scale using the min and max expression values
var colorScale = d3.scale.linear()
  .domain([minData, 0, maxData])
  .range(colors);

//generate heatmap rows
var heatmapRow = mySVG.selectAll(".heatmap")
   .data(data)
   .enter()
   .append("g");

//generate heatmap columns
var heatmapRects = heatmapRow
   .selectAll(".rect")
   .data(function(d) {
      return d;
   }).enter().append("svg:rect")
   .attr('width',width-1)
   .attr('height',height-1)
   .attr('x', function(d) {
      return (d[2] * width) + 50;
   })
   .attr('y', function(d) {
      return (d[1] * height) + 250;
   })
   .style('fill',function(d) {
      return colorScale(d[0]);
   });

//label columns
var columnLabel = mySVG.selectAll(".colLabel")
   .data(cols)
   .enter()
   .append('svg:text')
   .attr('x', -235)
   .attr('y', function(d,i) {
      return ((i*20)+60);
   })
   .attr('class','label')
   .attr("transform", "rotate(-90)")
   .style('top',100)
   .text(function(d) {
      return d;
   });

//label rows
var rowLabel = mySVG.selectAll(".rowLabel")
   .data(rows)
   .enter()
   .append('svg:text')
   .attr('x', 25)
   .attr('y', function(d) {
      return ((d*height-5)+250);
   })
   .attr('class','label')
   .style('top',100)
   .text(function(d) {
      return d;
   });

//expression value label
var expLab = d3.select("body")
   .append('div')
   .style('height',25)
   .style('position','absolute')
   .style('opacity',0.8)
   .style('top',10)
   .style('padding',10)
   .style('left',40)
   .style('display','none');

//position scale for legends
var positionScale = d3.scale.linear()
   .domain([minData,maxData])
   .range([0,width*cols.length])

//expression level legend 
var legendA = mySVG.selectAll(".legendA")
   .data(legendCols)
   .enter()
   .append("g")
   .attr("class", "legend")
   .append("rect")
   .attr("x", function(d){
      return positionScale(d);
   })
   .attr('y', 950)
   .attr("width", function(d){
      return (width*cols.length/legendCols.length);
   })
   .attr("height", 25)
   .style("fill", function(d){
      return colorScale(d)
   })
   .attr('class','label')
   .attr("x", function(d){
      return positionScale(d);
   })
   .attr("y", (height*72 + 325));

var lowLegendText = mySVG.append('svg:text')
   .attr('x',positionScale(minData))
   .attr('y',(height*72 + 300))
   .text('Lowest Expression Level')

var highLegendText = mySVG.append('svg:text')
   .attr('x',positionScale(maxData)-50)
   .attr('y',(height*72 + 300))
   .text('Highest Expression Level')

var cTypeArray = [[0,minData,'ALL'],[1,maxData,'AML']]

var legendB = mySVG.selectAll('.legendB')
   .data(cTypeArray)
   .enter()
   .append('g')
   .attr('class','legend')
   .append('rect')
   .attr("x",cols.length*width + 75) 
   .attr('y',function(d){
      return ((d[0] * 25) + 250)
   })
   .attr('width',width-1)
   .attr('height', height-1)
   .style('fill', function(d){
      return colorScale(d[1])
   });

var legendAMLLabel = mySVG.append('svg:text')
   .attr('x', positionScale(maxData) + 125 - (width/2))
   .attr('y', 250+(height/2))
   .text('AML')

var legendALLLabel = mySVG.append('svg:text')
   .attr('x', positionScale(maxData) + 125 - (width/2))
   .attr('y', 275+(height/2))
   .text('ALL')

var legendBTitle = mySVG.append('svg:text')
   .attr('x', positionScale(maxData) + 75)
   .attr('y', 225)
   .style('font-size',20)
   .style('font', 'helvetica')
   .text('Leukemia Subtype')   


//heatmap mouse events
heatmapRow
   .on('mouseover', function(d,i) {
      d3.select(this)
         .attr('stroke-width',1)
         .attr('stroke','black')

      output = '<b>' + rows[i] + '</b><br>';
      for (var j = 0 , count = data[i].length; j < count; j ++ ) {
         output += data[i][j][0] + ", ";
      }
      expLab
         .style('top',(i * height))
         .style('display','block')
         .html(output.substring(0,output.length - 3));
})
.on('mouseout', function(d,i) {
   d3.select(this)
      .attr('stroke-width',0)
      .attr('stroke','none')
   expLab
      .style('display','none')
});