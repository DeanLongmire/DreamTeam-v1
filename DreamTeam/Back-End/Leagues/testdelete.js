const global_leagues = require('./global_leagues.js')
const global_teams = require('../Teams/global_teams')
const global_players = require('../Players/global_players')
let league_db = new global_leagues.league_dbmanager;
let team_db = new global_teams.team_dbmanager;
let player_db = new global_players.player_dbmanager;

player_db.open();
player_db.delete("Victor Caratini")
player_db.delete("J.J. Watt")
player_db.delete("Deandre Jordan")
player_db.close();