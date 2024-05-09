
 var width = 400;
 var height = 500;
 const radius = Math.min(width, height) / 2;

//  const color = d3.scaleOrdinal()
//    .range(d3.schemeCategory10);

 const piechartsvg = d3.select("#piechart")
   .attr("width", width)
   .attr("height", height)
   .append("g")
   .attr("transform", `translate(${width / 2}, ${height / 2})`);

 const tooltip = d3.select("body").append("div")
   .attr("class", "tooltip")
   .style("opacity", 0);

 const legend = d3.select("#legend");

 d3.csv("tabulated_parcel_types.csv").then(data => {
  const color = d3.scaleOrdinal()
                    .domain(data.map(d => d.consolidated_use_code))
                    .range(["#1F6373", "#88B0BF", "#000080", "#4169E1", "#1E90FF", "#87CEEB",
                     "#86A685", "#8C4130", "#DDA0DD", "#BF9775"]); // Add your custom color values

   color.domain(data.map(d => d.consolidated_use_code));

   const arc = d3.arc()
     .innerRadius(0)
     .outerRadius(radius);

   const pie = d3.pie()
     .value(d => d.N);

   const arcs = piechartsvg.selectAll("arc")
     .data(pie(data))
     .enter()
     .append("g")
     .attr("class", "arc");

   arcs.append("path")
     .attr("d", arc)
     .attr("fill", d => color(d.data.consolidated_use_code))
     .on("mouseover", function(event, d) {
       tooltip.transition()
         .duration(200)
         .style("opacity", 0.9);
       tooltip.html(`Use: ${d.data.consolidated_use_code}<br>N: ${d.data.N}<br>Percent: ${d.data.percent_total}`)
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

   const pieTween = (d, i) => {
     const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
     return t => arc(interpolate(t));
   };

   arcs.selectAll("path")
     .transition()
     .duration(1000)
     .attrTween("d", pieTween);

  // Add chart title
  piechartsvg.append("text")
  .attr("x", 0)
  .attr("y", -220 )
  .attr("text-anchor", "middle")
  .style("font-size", "25px")
  .text("Property Uses in the MAPC Region");


   // Add legend
   const legendItems = legend.selectAll(".legend-item")
   .data(data)
   .enter()
   .append("div")
   .attr("class", "legend-item");

 legendItems.append("div")
   .attr("class", "legend-circle")
   .style("background-color", d => color(d.consolidated_use_code));

 legendItems.append("div")
   .attr("class", "legend-label")
   .text(d => d.consolidated_use_code);


 });
