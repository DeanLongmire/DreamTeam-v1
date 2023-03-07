const global_leagues = require('./global_leagues.js')
const global_teams = require('../Teams/global_teams')
const global_players = require('../Players/global_players')
let league_db = new global_leagues.league_dbmanager;
let team_db = new global_teams.team_dbmanager;
let player_db = new global_players.player_dbmanager;


league_db.open();
league_db.drop();
league_db.close();

team_db.open();
team_db.drop();
team_db.close();

player_db.open();
player_db.drop();
player_db.close();