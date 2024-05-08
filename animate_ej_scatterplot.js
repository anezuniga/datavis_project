// Animate the EJ Population scatterplot

// Define the dimensions and margins for the scatterplot
const margin = { top: 50, right: 20, bottom: 40, left: 45 };
var width = 750 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

// Create SVG element
const scatterplotsvg = d3.select("#scatterplot")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define tooltip
// const tooltip = d3.select("body").append("div")
//                   .attr("class", "tooltip")
//                   .style("opacity", 0);

// Load data from CSV file
d3.csv("MAPC EJ joined with parcel block groups.csv").then(data => {
  // Convert numerical strings to numbers
  data.forEach(d => {
    d.percent_sf_residences = +d.percent_sf_residences;
  });

  // Create scales
  // Define the desired order of x-axis categories
  const desiredOrder = ["No", "Yes"];

  const xScale = d3.scaleBand()
                   .domain(desiredOrder)
                   .range([0, width])
                   .padding(0.1);
  
  const yPadding = 5;

  const yScale = d3.scaleLinear()
                    .domain([d3.min(data, d => d.percent_sf_residences) - yPadding, d3.max(data, d => d.percent_sf_residences) + yPadding])
                   .range([height, 0]);

  const customColorScale = d3.scaleOrdinal()
                   .domain(data.map(d => d.EJ))
                   .range(["#88B0BF", "#86A685"]); // Add custom color values
                 

  // Create force simulation for beeswarm layout
  const simulation = d3.forceSimulation(data)
  .force("x", d3.forceX().strength(0.04).x(d => xScale(d.EJ) + xScale.bandwidth() / 2))
  .force("y", d3.forceY().strength(2.5).y(d => yScale(d.percent_sf_residences))) 
  .force("collide", d3.forceCollide(4))
  .stop();

  simulation.tick(120);

  // Add circles for data points
  const circles = scatterplotsvg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 3)
      .style("fill", d => customColorScale(d.EJ));
    

  // Add tooltip on hover
  circles.on("mouseover", function(event, d) {
    tooltip.transition()
           .duration(200)
           .style("opacity", 0.9);
    tooltip.html(`Percent SF Housing: ${d.percent_sf_residences}`)  //Municipality: ${d.muni}<br>
           .style("left", (event.pageX + 10) + "px")
           .style("top", (event.pageY - 15) + "px");
  })
  .on("mousemove", function(event) {
    tooltip.style("left", (event.pageX + 10) + "px")
           .style("top", (event.pageY - 15) + "px");
  })
  .on("mouseout", function() {
    tooltip.transition()
           .duration(200)
           .style("opacity", 0);
  });



  // Add x-axis
  scatterplotsvg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .append("text")
    .attr("x", width / 2 )
    .attr("y", 35)
    .attr("fill", "#000")
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Is the Block Group an EJ Population?");

  // Add y-axis
  scatterplotsvg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left - 3)
    .attr("x", -height / 2)
    .attr("dy", "1em")
    .attr("fill", "#000")
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("% of Residential Properties that are Single-Family");

  // Add chart title
  scatterplotsvg.append("text")
    .attr("x", width / 2)
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "25px")
    .text("How Does Single-Family Housing Differ in EJ Areas?");

});

