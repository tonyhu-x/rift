// Create nodes (people)
const nodes = new vis.DataSet([
  { id: 1, label: "John" },
  { id: 2, label: "Mary" },
  { id: 3, label: "Bob" },
]);

// Create edges (relationships)
const edges = new vis.DataSet([
  { from: 1, to: 2, label: "married" },
  { from: 1, to: 3, label: "friend" },
]);

// Create a network
const container = document.getElementById("diagram");
const data = {
  nodes: nodes,
  edges: edges,
};
const options = {};
const network = new vis.Network(container, data, options);
