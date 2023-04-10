const teamList = document.getElementById('team-container');

const teams = [
  { name: 'Team A', sport: 'Flag Football', players: 10, wins: 5, losses: 2 },
  { name: 'Team B', sport: 'Men\'s Soccer', players: 11, wins: 7, losses: 3 },
  { name: 'Team C', sport: 'Softball', players: 9, wins: 3, losses: 4 },
  { name: 'Team D', sport: 'Flag Football', players: 10, wins: 5, losses: 2 },
  { name: 'Team E', sport: 'Men\'s Soccer', players: 11, wins: 7, losses: 3 },
  { name: 'Team F', sport: 'Softball', players: 9, wins: 3, losses: 4 },
  { name: 'Team G', sport: 'Flag Football', players: 10, wins: 5, losses: 2 },
  { name: 'Team H', sport: 'Men\'s Soccer', players: 11, wins: 7, losses: 3 },
  { name: 'Team I', sport: 'Softball', players: 9, wins: 3, losses: 4 },
  { name: 'Team J', sport: 'Flag Football', players: 10, wins: 5, losses: 2 },
  { name: 'Team K', sport: 'Men\'s Soccer', players: 11, wins: 7, losses: 3 },
  { name: 'Team L', sport: 'Softball', players: 9, wins: 3, losses: 4 },
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

// Loop through teams and create elements for each one
for (let i = 0; i < teams.length; i++) {
  const team = teams[i];
  const teamElement = document.createElement('div');
  teamElement.className = 'dynprog-col dynprog-third dynprog-margin-bottom';
  teamElement.innerHTML = `
    <div class="dynprog-crd dynprog-hover-shadow">
      <div class="dynprog-container dynprog-center">
        <h4><b>${team.name}</b></h4> 
        <p>${team.sport}</p> 
        <p class="team-info" style="display: none;">Players: ${team.players}, Wins: ${team.wins}, Losses: ${team.losses}</p>
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
  
