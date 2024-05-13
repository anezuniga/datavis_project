// Animate the EJ Population scatterplot

// Define the dimensions and margins for the scatterplot
const margin = { top: 60, right: 20, bottom: 75, left: 40 };
var width = 700 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

// Create SVG element
const scatterplotsvg = d3.select("#scatterplot")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// // Define tooltip
// const tooltip = d3.select("body").append("div")
//                   .attr("class", "tooltip")
//                   .style("opacity", 0);

// Define the desired order of x-axis categories
const desiredOrderEJ = ["EJ Population", "Not an EJ Population"];
const desiredOrderCriteria = ["English isolation", "Income", "Minority", "Minority and income", "Minority and English isolation",
                              "Minority, income and English isolation", "Income and English isolation", "N/A"];

const colorsEJ = ["#88B0BF", "#86A685"];
const colorsCriteria = ["#a4c2f4", "#ea9999", "#ffe599", "#f9cb9c", "#b6d7a8", "#d5a6bd", "#b4a7d6", "#86A685"];                               
   

// // Load data from CSV file
// d3.csv("MAPC EJ joined with parcel block groups.csv").then(data => {
//   // Convert numerical strings to numbers
//   data.forEach(d => {
//     d.percent_sf_residences = +d.percent_sf_residences;
//   });

  // Function to create scatterplot
  function createScatterplot(data, xKey) {
    scatterplotsvg.selectAll("*").remove(); // Clear existing content

    // Adjust SVG width dynamically based on x-axis variable
    var width = xKey === "EJ_pop" ? 700 : 1000; // Set different width for x2 variable
    scatterplotsvg.attr("width", width + margin.left + margin.right);
  


    // Create scales
    const xScale = d3.scaleBand()
                    .domain(xKey === "EJ_pop" ? desiredOrderEJ : desiredOrderCriteria)   //data.map(d => d[xKey])
                    .range([0, width])
                    .padding(0.1);
    
    const yPadding = 5;

    const yScale = d3.scaleLinear()
                      .domain([d3.min(data, d => d.percent_sf_residences) - yPadding, d3.max(data, d => d.percent_sf_residences) + yPadding])
                    .range([height, 0]);

    const customColorScale = d3.scaleOrdinal()
                    .domain(xKey === "EJ_pop" ? desiredOrderEJ : desiredOrderCriteria)
                    .range(xKey === "EJ_pop" ? colorsEJ : colorsCriteria); // Add your custom color values
                  

    // Create force simulation for beeswarm layout
    const simulation = d3.forceSimulation(data)
    .force("x", d3.forceX().strength(0.05).x(d => xScale(d[xKey]) + xScale.bandwidth() / 2))
    .force("y", d3.forceY().strength(2.5).y(d => yScale(d.percent_sf_residences))) 
    .force("collide", d3.forceCollide(3.5))
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
        .style("fill", d => customColorScale(d[xKey]));
      

    // Add tooltip on hover
    circles.on("mouseover", function(event, d) {
      tooltip.transition()
            .duration(200)
            .style("opacity", 0.9);
      tooltip.html(`City: ${d.CITY}<br>Percent SF Housing: ${d.percent_sf_residences}`)
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
      .call(d3.axisBottom(xScale));
      // .append("text")
      // .attr("x", width / 2 )
      // .attr("y", 25)
      // .attr("fill", "#000")
      // .attr("text-anchor", "middle")
      // .text("Is the Block Group an EJ Population?")

    // Rotate x-axis labels
    if (xKey === "recoded_ej_criteria") {
      scatterplotsvg.selectAll(".x-axis text")
        .attr("transform", "rotate(-15)")
        .style("text-anchor", "end")
        .attr("dx", "-0.5em")
        .attr("dy", "0.5em");
    }

    // Add y-axis
    scatterplotsvg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left - 2)
      .attr("x", -height / 2 )
      .attr("dy", "1em")
      .attr("fill", "#000")
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("% of Residential Properties that are Single-Family");

    // Add chart title
    scatterplotsvg.append("text")
      .attr("x", width / 2)
      .attr("y", 0 - (margin.top / 2) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "25px")
      .text("How Does Single-Family Housing Differ in EJ Areas?");

  }

  // Load data from CSV file
  d3.csv("MAPC EJ joined with parcel block groups v3.csv").then(data => {
    // Initial scatterplot with default x-axis variable
    createScatterplot(data, "EJ_pop");

    // Event listener for checkbox change
    const toggleXCheckbox = document.getElementById("toggleX");
    toggleXCheckbox.addEventListener("change", function() {
      const isChecked = toggleXCheckbox.checked;
      const xKey = isChecked ? "recoded_ej_criteria" : "EJ_pop"; // Choose x-axis variable based on checkbox state
      createScatterplot(data, xKey); // Update scatterplot with new x-axis variable
    });
  }).catch(error => {
    console.error("Error loading the CSV file:", error);
  });

// });

