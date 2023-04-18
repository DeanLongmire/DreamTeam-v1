// Array of league names
const leagues = ["League A", "League B", "League C"];

const ls =[
    {name: 'League 1', team: 1.99},
    {name: 'League 2', team: 2.99},
    {name: 'League 3', team: 3.99}
];

// Get the container element where the league names will be displayed
const leagueContainer = document.getElementById("league_container");
const lContainer = document.getElementById("l_container");

// Loop through the array of league names and create a new h4 element for each one
for (let i = 0; i < leagues.length; i++) {
    const leagueName = leagues[i];
    const h4 = document.createElement("h4");
    h4.textContent = leagueName;
    leagueContainer.appendChild(h4);
}

for (const l of ls) {
    const div = document.createElement('div');
    div.classList.add('.dynprog-better-box');
    div.innerHTML = `<h3>${l.name}</h3><p>$${l.team.toFixed(2)}</p>`;
    container.appendChild(div);
  }