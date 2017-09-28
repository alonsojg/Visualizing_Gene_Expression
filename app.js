//height of each row in the heatmap
var height = 10;

//width of each column in the heatmap
var width = 10;

//margins
var marginLeft = 0
var marginTop = 0

//legendA
var colors = ['#ffcc66','#ff6666','#000000']

//attach a SVG element to the document's body
var mySVG = d3.select('#chart')
   .append('svg')
   .attr('class','col-md-9')
   .attr('display','block')
   .attr('width', (width * cols.length)+ 500) 
   .attr('height', (height * rows.length + 500))
   .style('margin','auto')
   .style('background', 'white')

//attach diplay div element to the document's body
var myDiv = d3.select('#chart')
   .append('div')
   .attr('class', 'col-md-3')
   .attr('id', 'text-box')
   .attr('font','helvetica')
   .attr('font-size', 30)
   
// var title = mySVG.append('svg:text')
//    .attr('y', 50)
//    .attr('x',125)
//    .text('Genetic Expression Level in Separate Leukemia Subtype.')
//    .attr('font-size', 20)

//define a color scale using the min and max expression values
var colorScale = d3.scale.linear()
  .domain([minData, 0, maxData])
  .range(colors);

//generate heatmap rows
var heatmapRow = mySVG.selectAll('.heatmap')
   .data(data)
   .enter()
   .append('g');

//generate heatmap columns
var heatmapRects = heatmapRow
   .selectAll('.rect')
   .data(function(d) {
      return d;
   }).enter().append('svg:rect')
   .attr('width',width)
   .attr('height',height)
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
var columnLabel = mySVG.selectAll('.colLabel')
   .data(cols)
   .enter()
   .append('svg:text')
   .attr('x', -235)
   .attr('y', function(d,i) {
      return ((i*10)+160);
   })
   .attr('font-size',10)
   .attr('class','label')
   .attr('transform', 'rotate(-90)')
   .style('top',100)
   .text(function(d) {
      return d;
   });

//label rows
var rowLabel = mySVG.selectAll('.rowLabel')
   .data(rows)
   .enter()
   .append('svg:text')
   .attr('x', 125)
   .attr('y', function(d,i) {
      return ((i*height)+250+height);
   })
   .attr('class','label')
   .attr('font-size', 10)
   .style('top',100)
   .text(function(d) {
      return d;
   });

//expression value label
var expLab = d3.select('#v')
   .append('div')
   .attr('class','col-md-6')
   .style('height',25)
   .style('opacity',0.8)
   .style('top',10)
   .style('padding',10)
   .style('left',140)
   .style('display','none');

//position scale for legends
var positionScale = d3.scale.linear()
   .domain([minData,maxData])
   .range([100,width*cols.length + 55])

//expression level legend 
var legendA = mySVG.selectAll('.legendA')
   .data(legendCols)
   .enter()
   .append('g')
   .attr('class', 'legend')
   .append('rect')
   .attr('x', function(d){
      return positionScale(d);
   })
   .attr('y', 950)
   .attr('width', function(d){
      return (width*cols.length/legendCols.length);
   })
   .attr('height', 25)
   .style('fill', function(d){
      return colorScale(d)
   })
   .attr('class','label')
   .attr('x', function(d){
      return (positionScale(d)+50);
   })
   .attr('y', (height*72 + 325));

var patientText = mySVG.append('svg:text')
   .attr('transform', 'rotate(-90)')
   .attr('x',-(height * rows.length + 500)/2)
   .attr('y',75)
   .attr('font-size',25)
   .text('Patients\' numbers')

var lowGLSSLegendText = mySVG.append('svg:text')
   .attr('x',positionScale(minData)+50)
   .attr('y',100)
   .text('Genes of Lowest Statistical Significance')
   .attr('font-size',10)

var highGLSSLegendText = mySVG.append('svg:text')
   .attr('x',positionScale(maxData) - 85)
   .attr('y',100)
   .text('Genes of Highest Statistical Significance')
   .attr('font-size',10)

var lowEVLegendText = mySVG.append('svg:text')
   .attr('x',positionScale(minData) + 50)
   .attr('y',(height*72 + 300))
   .text('Lowest Expression Level')
   .attr('font-size',10)

var highEVLegendText = mySVG.append('svg:text')
   .attr('x',positionScale(maxData)-15)
   .attr('y',(height*72 + 300))
   .text('Highest Expression Level')
   .attr('font-size',10)

var cTypeArray = [[0,minData,'ALL'],[1,maxData,'AML']]

var legendB = mySVG.selectAll('.legendB')
   .data(cTypeArray)
   .enter()
   .append('g')
   .attr('class','legend')
   .append('rect')
   .attr('x',cols.length*width + 175) 
   .attr('y',function(d){
      return ((d[0] * 25) + 250)
   })
   .attr('width',width-1)
   .attr('height', height-1)
   .style('fill', function(d){
      return colorScale(d[1])
   });

var legendAMLLabel = mySVG.append('svg:text')
   .attr('x', positionScale(maxData) + 150 - (width/2))
   .attr('y', 250+(height/2))
   .text('ALL')
   .attr('font-size',10)

var legendALLLabel = mySVG.append('svg:text')
   .attr('x', positionScale(maxData) + 150 - (width/2))
   .attr('y', 275+(height/2))
   .text('AML')
   .attr('font-size',10)

var legendBTitle = mySVG.append('svg:text')
   .attr('x', positionScale(maxData) + 110)
   .attr('y', 225)
   .style('font-size',15)
   .style('font', 'helvetica')
   .text('Leukemia Subtype')

//heatmap mouse events
heatmapRow
   .on('mouseover', function(d,i) {

      d3.select(this)
         .attr('stroke-width',1)
         .attr('stroke','white')

      output = '<b>' + rows[i] + '</b><br>';
      for (var j = 0 , count = data[i].length; j < count; j ++ ) {
         output += data[i][j][0] + ', ';
      }
      expLab
         .style('margin','auto')
         .style('display','block')
         .html(output.substring(0,output.length));
   })
   .on('mouseout', function(d,i) {
      d3.select(this)
         .attr('stroke-width',0)
         .attr('stroke','none')
      expLab
         .style('display','none')
   });

//column label mouse events
columnLabel
   .on('click', function (d,i){
      d3.select(this)
         .attr('stroke-width',1)
         .attr('stroke', 'black')

      d3.select('#text-box')
         .append('h2')
         .style('margin-top', '2.5em')
         .text(gnsAndDescripts[d]);
         
}).on('mouseout', function (d,i){
      d3.select(this)
         .attr('stroke-width',0)
         .attr('stroke', 'none');

      d3.select('#text-box')
         .html('');
})