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
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    var margin = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50
    };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    // Append SVG element
    var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // Append group element
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //read and parse data from csv
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

            return (d);
        });
        console.log(data);
    });
};