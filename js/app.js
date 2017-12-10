//height and width of each rect in the heatmap
var height = 7;
var width = 7;

//attach a SVG element to the document's body
var mySVG = d3.select('#chart')
   .append('svg')
   .attr('class','col-md-6')
   .attr('width', (width * cols.length)) 
   .attr('height', (height * rows.length + 300))
   .style('background', 'white')

//attach diplay div element to the document's body
var myDiv = d3.select('#chart')
   .append('h2')
   .attr('class', 'col-md-6')
   .attr('id', 'text-box')
   .style('display','block')
   .style('margin-top', '3em')

//legendA color spectrum
var colors = ['#ffcc66','#ff6666','#000000']

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
      return (d[2] * width) + 100;
   })
   .attr('y', function(d) {
      return (d[1] * height) + 200;
   })
   .style('fill',function(d) {
      return colorScale(d[0]);
   });

//label columns
var columnLabel = mySVG.selectAll('.colLabel')
   .data(cols)
   .enter()
   .append('svg:text')
   .attr('x', -200 + height)
   .attr('y', function(d,i) {
      return ((i*height)+100+5);
   })
   .attr('font-size',width)
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
   .attr('x', 100 - width -5)
   .attr('y', function(d,i) {
      return ((i*height)+200+height);
   })
   .attr('class','label')
   .attr('font-size', height)
   .style('top',100)
   .text(function(d) {
      return d;
   });

//position scale for legends
var positionScale = d3.scale.linear()
   .domain([minData,maxData])
   .range([100,385])

//expression level legend 
mySVG.selectAll('.legendA')
   .data(legendCols)
   .enter()
   .append('g')
   .attr('class', 'legend')
   .append('rect')
   .attr('width', function(d){
      return (30);
   })
   .attr('height', 25)
   .style('fill', function(d){
      return colorScale(d)
   })
   .attr('class','label')
   .attr('x', function(d){
      return (positionScale(d));
   })
   .attr('y', (height*72 + 230));

mySVG.append('svg:text')
   .attr('transform', 'rotate(-90)')
   .attr('x',-(height * rows.length + 500)/2)
   .attr('y',75)
   .attr('font-size',width*2)
   .text('Patients\' numbers')

mySVG.append('svg:text')
   .attr('x',positionScale(minData))
   .attr('y',100)
   .text('Lowest Statistical Significance')
   .attr('font-size',10)

mySVG.append('svg:text')
   .attr('x',positionScale(maxData) - 105)
   .attr('y',100)
   .text('Highest Statistical Significance')
   .attr('font-size',10)

mySVG.append('svg:text')
   .attr('x',positionScale(minData))
   .attr('y',(height*72 + 225))
   .text('Lowest Expression Level')
   .attr('font-size',10)

mySVG.append('svg:text')
   .attr('x',positionScale(maxData)-85)
   .attr('y',(height*72 + 225))
   .text('Highest Expression Level')
   .attr('font-size',10)

var cTypeArray = [[0,minData,'ALL'],[1,maxData,'AML']]

mySVG.selectAll('.legendB')
   .data(cTypeArray)
   .enter()
   .append('g')
   .attr('class','legend')
   .append('rect')
   .attr('x',cols.length*width + 125) 
   .attr('y',function(d){
      return ((d[0] * 25) + 250)
   })
   .attr('width',width-1)
   .attr('height', height-1)
   .style('fill', function(d){
      return colorScale(d[1])
   });

mySVG.append('svg:text')
   .attr('x', positionScale(maxData) + 75 - (width/2))
   .attr('y', 255+(height/2))
   .text('ALL')
   .attr('font-size',10)

mySVG.append('svg:text')
   .attr('x', positionScale(maxData) + 75 - (width/2))
   .attr('y', 280+(height/2))
   .text('AML')
   .attr('font-size',10)

mySVG.append('svg:text')
   .attr('x', positionScale(maxData) + 50)
   .attr('y', 225)
   .style('font-size',15)
   .style('font', 'helvetica')
   .text('Subtype')

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

columnLabel
   .on("click", function(d,i){
         
         var active = this.active ? false : true;
         if (active == true) {
         d3.select("#text-box")
            .text('Gene Description:')
            .append('hr')
            .append('h4')
            .text(gnsAndDescripts[d])
         };

         if (active == false) {
            d3.select('#text-box')
               .text('')
         };
         this.active = active;
   }).on('mouseover', function(d,i) {

      d3.select(this)
         .attr('stroke-width',1)
         .attr('stroke','Black')

      output = '<b>' + rows[i] + '</b><br>';
      for (var j = 0 , count = data[i].length; j < count; j ++ ) {
         output += data[i][j][0] + ', ';
      }
      expLab
         .style('margin','auto')
         .style('display','block')
         .html(output.substring(0,output.length));
   }).on('mouseout', function(d,i) {

      d3.select(this)
         .attr('stroke-width',0)
         .attr('stroke','none')
      expLab
         .style('display','none')
   });

   
columnLabel
   .on("click", function(d,i){
         
         var active = this.active ? false : true;
         if (active == true) {
         d3.select("#text-box")
            .text('Gene Description:')
            .append('hr')
            .append('h4')
            .text(gnsAndDescripts[d])
            .style('text-align','left')
         };

         if (active == false) {
            d3.select('#text-box')
               .text('')
         };
         this.active = active;
});

