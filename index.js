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

let [profiles, relations] = await Promise.all([
  (async () => (await fetch("profiles.json")).json())(),
  (async () => (await fetch("relations.json")).json())(),
]);

let nodes = new vis.DataSet(profiles);
const edges = new vis.DataSet(relations);

nodes = nodes.map((node) => ({
  ...node,
  label: createLabel(node.name, node.username),
  color: {
    background: COLOURS[node.role ?? "default"],
    border: COLOURS[node.role ?? "default"],
  },
}));

// Create a network
const container = document.getElementById("diagram");
const data = {
  nodes: nodes,
  edges: edges,
};
const network = new vis.Network(container, data, options);
