// @TODO: YOUR CODE HERE!
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);

// When the browser loads, makeResponsive() is called.
makeResponsive();

// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");

    // clear svg is not empty
    if (!svgArea.empty()) {
        svgArea.remove();
    };

    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = parseInt(d3.select("#scatter").style("width"));
    var svgHeight = svgWidth - svgWidth/ 3.9;
    
    console.log(svgWidth);
    console.log(svgHeight);

    var margin = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50
    };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    console.log(height);
    console.log(width);

    // Append SVG element
    var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // Append group element
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

//     //Initial Params
//     var chosenXAxis = "healthcare";

//     // function used for updating x-scale
//     function xScale(data, chosenXAxis) {
//         //create scales
//         var xLinearScale = d3.scaleLinear()
//             .domain([d3.min(data, d => d[chosenXAxis]), d3.max(data, d => d[chosenXAxis])])
//             .range[0, width];

//         return xLinearScale;
//     };

//     // function used for updating xAxis var upon click axis
//     function renderAxes(newXScale, xAxis) {
    
//         var bottomAxis = d3.axisBottom(newXScale);
//         xAxis.transition().duration(1000).call(bottomAxis);

//         return xAxis;
//     };

//     // function used for updating circles group with a transition to
//     // new circles
//     function renderCircles(circlesGroup, newXScale, chosenXaxis) {

//         circlesGroup.transition().duration(1000).attr("cx", d => newXScale(d[chosenXAxis]));
  
//         return circlesGroup;
//     };

//     // function used for updating circles group with new tooltip
//     function updateToolTip(chosenXAxis, circlesGroup) {

//         if (chosenXAxis === "healthcare") {
//             var label = "healthcare:"; //vs poverty
//             var targetY = "poverty'";
//         }
//         else {
//             var label = "smoker:"; //vs age
//             var targetY = "age";
//         }
  
//     var toolTip = d3.tip()
//       .attr("g", "tooltip")
//       .offset([80, -60])
//       .html(function(d) {
//         return (`${d[targetY]}<br>${label} ${d[chosenXAxis]}`);
//       });
  
//     circlesGroup.call(toolTip);
  
//     circlesGroup.on("mouseover", function(data) {
//         toolTip.show(data);
//     })
//       // onmouseout event
//       .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//       });
  
//     return circlesGroup;
//   };

    //read and parse data from csv //store into variable
   d3.csv('../data/data.csv').then(function(data) {  
        data.forEach(function(d) {
            d.id = +d.id;
            d.poverty = +d.poverty;
            d.povertyMoe = +d.povertyMoe;
            d.age = +d.age;
            d.ageMoe = +d.ageMoe;
            d.income = +d.income;
            d.incomeMoe = +d.incomeMoe;
            d.healthcare = d.healthcare;
            d.healthcareLow = +d.healthcareLow;
            d.healthcareHigh = +d.healthcareHigh;
            d.obesity = +d.obesity;
            d.obesityLow = +d.obesityLow;
            d.obesityHigh = +d.obesityHigh;
            d.smokes = +d.smokes;
            d.smokesLow = +d.smokesLow;
            d.smokesHigh = +d.smokesHigh;

            return d;
        });
        
    //Build overall graph
        //find min/max for x and y
        minX = d3.min(data, d => parseFloat(d.smokes));
        maxX = d3.max(data, d => parseFloat(d.smokes));
        minY = d3.min(data, d => parseFloat(d.age));
        maxY = d3.max(data, d => parseFloat(d.age));
    
        //create xAxis
        var xLinearScale = d3.scaleLinear()
            .domain([(minX -1), (maxX +1)])
            .range([0, width]);
        //create yAxis
        var yLinearScale = d3.scaleLinear()
            .domain([(minY - 1), (maxY +1)])
            .range([height, 0]);
        //create initial axis functions
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);
            
        //append xAxis
        var xAxis = chartGroup.append("g")
            .classed('x-axis', true)
            .attr('transform', `translate(0, ${height})`)
            .call(bottomAxis);
        //append yAxis
        chartGroup.append("g")
            .call(leftAxis);

    //place data onto graph
        //append intial circles
        var circlesGroup = chartGroup.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => xLinearScale(d.smokes))
            .attr('cy', d => yLinearScale(d.age))
            .attr('r', 15)
            .style('fill', 'lightblue')
            .style('fill-opacity', '.5')
            .style('stroke', 'black')
            .style('stroke-opacity', '.3')
            .attr('text', d => d.abbr);

        // var cirlcesGroupBoarder = chartGroup.selectAll('circle')
        //     .data(data)
        //     .enter()
        //     .append('circle')
        //     .attr('cx', d => xLinearScale(d.smokes))
        //     .attr('cy', d => yLinearScale(d.age))
        //     .attr('r', 16)
        //     .attr('stroke', 'black')
        //     .attr('fill', 'none')

        // append text into the circles
        // var abbrGroup = chartGroup.append("g")
        //     .selectAll("text")
        //     .data(data)
        //     .enter()
        //     .append("text")    
        //     .attr("dx", xLinearScale(d.smokes))
        //     .attr("dy", yLinearScale((d.age))
        //     .attr("font-size", 12)
        //     .classed("stateText", true)
        //     .text(d => d.abbr)


    });
};
