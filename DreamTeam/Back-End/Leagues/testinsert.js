const global_leagues = require('./global_leagues.js')
const global_teams = require('../Teams/global_teams')
const global_players = require('../Players/global_players')
let league_db = new global_leagues.league_dbmanager;
let team_db = new global_teams.team_dbmanager;
let player_db = new global_players.player_dbmanager;

league_db.open();
league_db.insert("NBA", 1, "Basketball");
league_db.insert("AFC", 2, "Football");
league_db.insert("MLB", 3, "Baseball");
league_db.close();

team_db.open();
team_db.insert("Denver Nuggets", 5, 1, "Basketball", 15)
team_db.insert("Cleveland Browns", 6, 2, "Football", 40)
team_db.insert("Milwaukee Brewers", 7, 3, "Baseball", 25)
team_db.close();

player_db.open();
player_db.insert("Deandre Jordan", "DJ1988", 11, 5, "Center")
player_db.insert("Nick Chubb", "Chubby6", 12, 6, "Running Back")
player_db.insert("Victor Caratini", "xXVicCarXx", 13, 7, "Catcher")
player_db.close();