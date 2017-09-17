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
   .attr("width", (width * cols.length)+ 500) 
   .attr("height", (height * rows.length + 500))
   .style('position','absolute')
   .style('top',100)
   .style('left',0)
   .style('background', 'white')
   
var title = mySVG.append('svg:text')
   .attr('y', 50)
   .attr('x',200)
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
      return (d[2] * width) + 150;
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
      return ((i*20)+160);
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
   .attr('x', 125)
   .attr('y', function(d,i) {
      return ((i*height-5)+250+height);
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
   .style('left',140)
   .style('display','none');

//position scale for legends
var positionScale = d3.scale.linear()
   .domain([minData,maxData])
   .range([100,width*cols.length+100])

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

var patientText = mySVG.append('svg:text')
   .attr("transform", "rotate(-90)")
   .attr('x',-(height * rows.length + 500)/2)
   .attr('y',75)
   .attr('font-size',25)
   .text('Patients\' numbers')

var lowGLSSLegendText = mySVG.append('svg:text')
   .attr('x',positionScale(minData)+50)
   .attr('y',100)
   .text('Genes of Lowest Statistical Significance')

var highGLSSLegendText = mySVG.append('svg:text')
   .attr('x',positionScale(maxData)-175)
   .attr('y',100)
   .text('Genes of Highest Statistical Significance')

var lowEVLegendText = mySVG.append('svg:text')
   .attr('x',positionScale(minData))
   .attr('y',(height*72 + 300))
   .text('Lowest Expression Level')

var highEVLegendText = mySVG.append('svg:text')
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
   .attr("x",cols.length*width + 175) 
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
   .text('ALL')

var legendALLLabel = mySVG.append('svg:text')
   .attr('x', positionScale(maxData) + 125 - (width/2))
   .attr('y', 275+(height/2))
   .text('AML')

var legendBTitle = mySVG.append('svg:text')
   .attr('x', positionScale(maxData) + 75)
   .attr('y', 225)
   .style('font-size',20)
   .style('font', 'helvetica')
   .text('Leukemia Subtype')

var footnotes = mySVG.append('svg:text')
   .attr('x',positionScale(minData))
   .attr('y',(height*72 + 400))
   .style('font-size',20)
   .text('Links for better understanding:')
      
var footnote1 = mySVG.append('svg:text')
   .attr('x',positionScale(minData))
   .attr('y',(height*72 + 435))
   .style('font-size',20)
   .text('Gene expression profiling - https://en.wikipedia.org/wiki/Gene_expression_profiling')

var footnote2 = mySVG.append('svg:text')
   .attr('x',positionScale(minData))
   .attr('y',(height*72 + 460))
   .style('font-size',20)
   .text('"What is Acute Myeloid Leukemia?" - https://www.cancer.org/cancer/acute-myeloid-leukemia/about/what-is-aml.html')

var footnote3 = mySVG.append('svg:text')
   .attr('x',positionScale(minData))
   .attr('y',(height*72 + 485))
   .style('font-size',20)
   .text('"What Is Acute Lymphocytic Leukemia?" - https://www.cancer.org/cancer/acute-lymphocytic-leukemia/about/what-is-all.html')




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