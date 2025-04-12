const COLOURS = {
  top: "#ffadaf",
  jungle: "#fddfaf",
  mid: "#bfedd9",
  adc: "#bdd5ef",
  support: "#e3c4d9",
  // This is an even mix of all the colours above
  any: "#dfd0cd",
};

/**
 * @param {string} name - real name
 * @param {string} username - Riot game name plus tag
 */
function createLabel(name, username) {
  return `<b>${name}</b>\na.k.a.\n${username}`;
}

function assignColour(profile) {
  let topRole;
  if (Array.isArray(profile.roles)) {
    topRole = profile.roles[0];
  } else {
    // Should be "any" here
    topRole = profile.roles;
  }

  return {
    background: COLOURS[topRole],
    border: COLOURS[topRole],
  };
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
      springLength: 350,
    },
  },
};

let [profiles, relations] = await Promise.all([
  (async () => (await fetch("profiles.json")).json())(),
  (async () => (await fetch("relations.json")).json())(),
]);

profiles = profiles.map((profile) => ({
  ...profile,
  label: createLabel(profile.name, profile.username),
  color: assignColour(profile),
}));

let nodes = new vis.DataSet(profiles);
const edges = new vis.DataSet(relations);

// Create a network
const container = document.getElementById("diagram");
const data = {
  nodes: nodes,
  edges: edges,
};
const network = new vis.Network(container, data, options);
