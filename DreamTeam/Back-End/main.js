const sqlite3 = require('sqlite3').verbose();
const global_leagues = require('./Leagues/global_leagues'); //Custom import
const global_teams = require('./Teams/global_teams'); //Custom import
const global_users = require('./Users/global_users'); //Custom import

let league_db = new global_leagues.league_dbmanager;
let team_db = new global_teams.team_dbmanager;
let users_db = new global_users.users_dbmanager;

//TESTING
//league_db.open();
//league_db.create();
//league_db.insert("UTKFF", 1, "Flag Football");
//league_db.insert("UTKS", 2, "Soccer");
//league_db.insert("UTKBB", 3, "Basketball");
//league_db.insert("UTKT", 4, "Tennis");
//league_db.insert("UTKBB2", 5, "Basketball");
//league_db.update_sport("UTKBB", "Archery");
//league_db.update_name("UTKBB2", "NBA-Official");
//league_db.delete("UTKFF");
//league_db.display_all();
//league_db.drop();
//league_db.close();


//team_db.open();
//team_db.create();
//team_db.insert("The Eagles of Gondor", 1, "Football", 15);
//team_db.update_sport("The Eagles of Gondor", "Basketball");
//team_db.update_name("The Eagles of Gondor", "The Uruks of Mordor");
//team_db.delete("The Uruks of Mordor");
//team_db.display_all();
//team_db.drop();
//team_db.close();