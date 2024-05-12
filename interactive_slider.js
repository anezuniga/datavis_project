// Adjust SVG width to accommodate the static plot
const svgWidth = window.innerWidth * 0.6; // 60% of the viewport width for the slider
const svgHeight = svgWidth * (3 / 4); // Maintain a 4:3 aspect ratio
const plotWidth = window.innerWidth * 0.3; // 30% of the viewport width for the static plot

// Create SVG container
const svg = d3.select('#interactive_slider')
  .append('svg')
    .attr('width', svgWidth + plotWidth) // Total width including the plot
    .attr('height', svgHeight);

// Create group for the slider
const sliderGroup = svg.append('g');

// Append the first map
const map1 = sliderGroup.append('image')
    .attr('xlink:href', 'figures/ej_nl.png')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

// Append the second map
const map2 = sliderGroup.append('image')
    .attr('xlink:href', 'figures/sfam_nl.png')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

// Create a clipping path for the slider
sliderGroup.append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", 0)
    .attr("height", svgHeight);

// Use the clipping path with map2
map2.attr("clip-path", "url(#clip)");

// Append a vertical line for the division in the slider
const divisionLine = sliderGroup.append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", svgHeight)
    .attr("stroke", "black")
    .attr("stroke-width", 2);

// Create group for the static plot
const plotGroup = svg.append('g')
    .attr('transform', `translate(${svgWidth}, 0)`); // Position it next to the slider

// Update function for mouse move
function updateOnMouseMove(event) {
    const mouseX = d3.pointer(event, this)[0];
    // Update the clipping path rect based on the mouse X position
    sliderGroup.select("#clip rect")
      .attr("width", mouseX)
      .attr("x", 0);
    
    // Move the division line to where the cursor is
    divisionLine
      .attr("x1", mouseX)
      .attr("x2", mouseX);
}

// Listen for mouse move on the slider group
sliderGroup.on('mousemove', updateOnMouseMove);

// Adjust the legend image width if needed
const legendWidth = svgWidth * 0.7; // 70% of svgWidth
document.querySelector('img').style.width = legendWidth + 'px';
