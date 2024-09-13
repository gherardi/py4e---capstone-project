const width = 800;
const height = 600;
const color = d3.scale.category20();
const dist = (width + height) / 4;

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const force = d3.layout.force()
    .linkDistance(dist)
    .size([width, height]);

function loadData(json) {
    const k = Math.sqrt(json.nodes.length / (width * height));

    // Configure force layout
    force
        .nodes(json.nodes)
        .links(json.links)
        .charge(-10 / k)
        .gravity(100 * k)
        .start();

    // Draw links
    const link = svg.selectAll("line.link")
        .data(json.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", d => Math.sqrt(d.value));

    // Draw nodes
    const node = svg.selectAll("circle.node")
        .data(json.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", d => (d.rank / 2.0) + 3)
        .style("fill", d => color(d.rank))
        .on("dblclick", (d) => {
            if (confirm(`Do you want to open ${d.url}?`)) {
                window.open(d.url, '_blank');
            }
            d3.event.stopPropagation();
        })
        .call(force.drag);

    // Add tooltips
    node.append("title")
        .text(d => d.url);

    // Update positions on tick
    force.on("tick", () => {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);
    });
}

// Assuming spiderJson is the JSON data object
loadData(spiderJson);
