/**
 * @param {string} name - real name
 * @param {string} username - Riot game name plus tag
 */
function createLabel(name, username) {
  return `<b>${name}</b>\n a.k.a. ${username}`;
}

const options = {
  nodes: {
    font: {
      multi: true,
      face: "Lexend",
    },
    shape: "box",
  },
  physics: {
    barnesHut: {
      springLength: 250,
    },
  },
};

// Create nodes (people)
// Nodes are organized alphabetically
let nodes = new vis.DataSet([
  { id: "flawnson", name: "Flawnson", username: "flawnson#flawn" },
  { id: "jason", name: "Jason", username: "JasonXer#2479" },
  { id: "paula", name: "Paula", username: "Parkhangorodsky#NA1" },
  { id: "ramy", name: "Ramy", username: "mouffette#NA1" },
  { id: "tony", name: "Tony", username: "TonyXer#NA1" },
]);

nodes = nodes.map((node) => ({
  ...node,
  label: createLabel(node.name, node.username),
}));

// Create edges (relationships)
// Edges are organized alphabetically. Bidirectional edges are always specified
// such that the `id` that comes first when sorted alphebetically becomes the
// `from` field.
const edges = new vis.DataSet([
  { from: "flawnson", to: "ramy", label: "partner" },
  { from: "jason", to: "tony", label: "high school friend" },
  { from: "paula", to: "tony", label: "partner" },
  { from: "paula", to: "ramy", label: "friend" },
]);

// Create a network
const container = document.getElementById("diagram");
const data = {
  nodes: nodes,
  edges: edges,
};
const network = new vis.Network(container, data, options);
