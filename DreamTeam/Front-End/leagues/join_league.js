// Array of league names
const leagues = ["League A", "League B", "League C"];

// Get the container element where the league names will be displayed
const leagueContainer = document.getElementById("league_container");

// Loop through the array of league names and create a new h4 element for each one
for (let i = 0; i < leagues.length; i++) {
    const leagueName = leagues[i];
    const h4 = document.createElement("h4");
    h4.textContent = leagueName;
    leagueContainer.appendChild(h4);
}