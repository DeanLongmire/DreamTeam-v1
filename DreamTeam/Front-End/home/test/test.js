const teamList = document.getElementById('team-container');
// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');
// const tdb = new sqlite3.Database(path.join(__dirname, '../Teams/global_teams_db.db'));
const teams = [
  { name: 'Team A', sport: 'Flag Football', num_players: 10, W: 5, L: 2 },
  { name: 'Team B', sport: 'Men\'s Soccer', num_players: 11, W: 7, L: 3 },
  { name: 'Team C', sport: 'Softball', num_players: 9, W: 3, L: 4 },
  { name: 'Team D', sport: 'Flag Football', num_players: 10, W: 5, L: 2 },
  { name: 'Team E', sport: 'Men\'s Soccer', num_players: 11, W: 7, L: 3 },
  { name: 'Team F', sport: 'Softball', num_players: 9, W: 3, L: 4 },
  { name: 'Team G', sport: 'Flag Football', num_players: 10, W: 5, L: 2 },
  { name: 'Team H', sport: 'Men\'s Soccer', num_players: 11, W: 7, L: 3 },
  { name: 'Team I', sport: 'Softball', num_players: 9, W: 3, L: 4 },
  { name: 'Team J', sport: 'Flag Football', num_players: 10, W: 5, L: 2 },
  { name: 'Team K', sport: 'Men\'s Soccer', num_players: 11, W: 7, L: 3 },
  { name: 'Team L', sport: 'Softball', num_players: 9, W: 3, L: 4 },
  // add more teams here
];
//This should make it so the boxes don't jumble and get moved around when hoverd over
function expandBox(teamElement) {
  const card = teamElement.querySelector('.dynprog-crd');
  card.style.height = "200px";
}

function collapseBox(teamElement) {
  const card = teamElement.querySelector('.dynprog-crd');
  card.style.height = "100px";
}

//Loop through teams and create elements for each one
for (let i = 0; i < teams.length; i++) {
const team = teams[i];
const teamElement = document.createElement('div');
teamElement.className = 'dynprog-col dynprog-third dynprog-margin-bottom';
teamElement.innerHTML = `
  <div class="dynprog-crd dynprog-hover-shadow">
    <div class="dynprog-container dynprog-center">
      <h4><b>${team.name}</b></h4> 
      <p>${team.sport}</p> 
      <p class="team-info" style="display: none;">Players: ${team.num_players}, Wins: ${team.W}, Losses: ${team.L}</p>
    </div>
  </div>
`;
teamList.appendChild(teamElement);

// Add event listener to show/hide team info on hover
teamElement.addEventListener('mouseenter', () => {
  const teamInfo = teamElement.querySelector('.team-info');
  teamInfo.style.display = 'block';
});

teamElement.addEventListener('mouseleave', () => {
  const teamInfo = teamElement.querySelector('.team-info');
  teamInfo.style.display = 'none';
});
}  