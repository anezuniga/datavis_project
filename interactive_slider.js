// const svgWidth = 600, svgHeight = 400;
const svgWidth = window.innerWidth * 0.6; // 80% of the viewport width
    const svgHeight = svgWidth * (3 / 4); // Maintain a 4:3 aspect ratio

// Create SVG container
const svg = d3.select('#interactive_slider')
  .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

// Append the first map
const map1 = svg.append('image')
    .attr('xlink:href', 'figures/ej_nl.png')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

// Append the second map
const map2 = svg.append('image')
    .attr('xlink:href', 'figures/sfam_nl.png')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

// Create a clipping path
svg.append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", 0)
    .attr("height", svgHeight);

// Use the clipping path with map2
map2.attr("clip-path", "url(#clip)");

// Append a vertical line for the division
const divisionLine = svg.append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", svgHeight)
    .attr("stroke", "black")
    .attr("stroke-width", 2);

// Update function for mouse move
function updateOnMouseMove(event) {
    const mouseX = d3.pointer(event)[0];
    // Update the clipping path rect based on the mouse X position
    d3.select("#clip rect")
      .attr("width", mouseX)
      .attr("x", 0);
    
    // Move the division line to where the cursor is
    divisionLine
      .attr("x1", mouseX)
      .attr("x2", mouseX);
}

// Listen for mouse move on SVG
svg.on('mousemove', updateOnMouseMove);

// Adjust the legend image width
const legendWidth = svgWidth * 0.7; // 70% of svgWidth
document.querySelector('img').style.width = legendWidth + 'px';