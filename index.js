const COLOURS = {
  top: "#ffadaf",
  jungle: "#fddfaf",
  mid: "#bfedd9",
  adc: "#bdd5ef",
  support: "#e3c4d9",
  default: "#ffffff",
};

/**
 * @param {string} name - real name
 * @param {string} username - Riot game name plus tag
 */
function createLabel(name, username) {
  return `<b>${name}</b>\na.k.a.\n${username}`;
}

const options = {
  nodes: {
    font: {
      multi: true,
      face: "Lexend",
    },
    shape: "box",
  },
  edges: {
    color: "#000000",
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
  { id: "flawnson", name: "Flawnson", username: "flawnson#flawn", role: "top" },
  { id: "jason", name: "Jason", username: "JasonXer#2479", role: "jungle" },
  {
    id: "paula",
    name: "Paula",
    username: "Parkhangorodsky#NA1",
    role: "support",
  },
  { id: "ramy", name: "Ramy", username: "mouffette#NA1", role: "support" },
  { id: "tony", name: "Tony", username: "TonyXer#NA1", role: "adc" },
]);

nodes = nodes.map((node) => ({
  ...node,
  label: createLabel(node.name, node.username),
  color: {
    background: COLOURS[node.role ?? "default"],
    border: COLOURS[node.role ?? "default"],
  },
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
