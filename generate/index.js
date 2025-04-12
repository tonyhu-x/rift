const ROLES = ["top", "jungle", "mid", "bot", "support"];

/**
 * Shuffles the array in place and returns it.
 */
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

/**
 * Create a map of role -> list of players who can play it
 */
function createRoleMap(profiles) {
  // Create a map of role -> list of players who can play it
  const roleToPlayers = {
    top: [],
    jungle: [],
    mid: [],
    bot: [],
    support: [],
  };

  for (const profile of profiles) {
    const roles = profile.roles === "any" ? shuffle([...ROLES]) : profile.roles;

    roles.forEach((role, index) => {
      // Include the index to track preference (lower is better)
      roleToPlayers[role].push({ id: profile.id, preference: index });
    });
  }

  return roleToPlayers;
}

/**
 * Greedy algorithm that assigns players to teams role by role.
 */
function assignTeams(profiles) {
  const roleToPlayers = createRoleMap(profiles);

  // Try multiple times to find a valid solution
  for (let attempt = 0; attempt < 100; attempt++) {
    const team1 = {};
    const team2 = {};
    const usedPlayers = new Set();

    // Randomize role order to avoid always giving certain roles priority
    const shuffledRoles = shuffle([...ROLES]);

    let valid = true;
    for (const role of shuffledRoles) {
      // Filter and sort players by their preference for this role
      let availablePlayers = roleToPlayers[role]
        .filter((player) => !usedPlayers.has(player.id))
        .sort((a, b) => a.preference - b.preference);

      if (availablePlayers.length < 2) {
        valid = false;
        break;
      }

      // Assign the first two players to team 1 and 2 randomly.
      // This is to prevent team 1 always getting the player that has higher
      // preference to this role.
      const chosenPlayers = shuffle(availablePlayers.slice(0, 2));
      team1[role] = chosenPlayers[0].id;
      team2[role] = chosenPlayers[1].id;
      usedPlayers.add(chosenPlayers[0].id);
      usedPlayers.add(chosenPlayers[1].id);
    }

    if (valid) {
      return { team1, team2 };
    }
  }

  return null;
}

function displayTeams(teams, profiles) {
  const profileMap = Object.fromEntries(profiles.map((p) => [p.id, p]));

  const team1Element = document.getElementById("team1");
  const team2Element = document.getElementById("team2");

  team1Element.innerHTML = "";
  team2Element.innerHTML = "";

  ROLES.forEach((role) => {
    const player1 = profileMap[teams.team1[role]];
    const player2 = profileMap[teams.team2[role]];

    team1Element.innerHTML += `
            <div class="player">
                <div class="role">${role.toUpperCase()}</div>
                <div class="name">${player1.name}</div>
            </div>
        `;

    team2Element.innerHTML += `
            <div class="player">
                <div class="role">${role.toUpperCase()}</div>
                <div class="name">${player2.name}</div>
            </div>
        `;
  });
}

function displayPlayerCheckboxes(profiles) {
  const container = document.getElementById("player-checkboxes");
  container.innerHTML = profiles
    .map(
      (profile) => `
    <label class="player-checkbox">
      <input type="checkbox" value="${profile.id}" checked>
      ${profile.name}
    </label>
  `,
    )
    .join("");
}

function getSelectedPlayers(profiles) {
  const selectedIds = [
    ...document.querySelectorAll("#player-checkboxes input:checked"),
  ].map((checkbox) => checkbox.value);
  return profiles.filter((profile) => selectedIds.includes(profile.id));
}

function generateTeams() {
  const selectedPlayers = getSelectedPlayers(profiles);

  // Check if we have enough players
  if (selectedPlayers.length < 10) {
    alert("Please select at least 10 players to generate teams");
    return;
  }

  // This shuffle effectively randomizes the role-to-player map, so that
  // people with the same preference level for a role do not always get
  // sorted alphabetically. In future, this can be replaced by a random error
  // added to the preference level.
  const teams = assignTeams(shuffle(selectedPlayers));
  if (teams) {
    displayTeams(teams, profiles);
  } else {
    alert(
      "Could not generate valid teams with the selected players. Please try different selections.",
    );
  }
}

let profiles = await (await fetch("./data/profiles.json")).json();

displayPlayerCheckboxes(profiles);

document
  .getElementById("generate-button")
  .addEventListener("click", generateTeams);
