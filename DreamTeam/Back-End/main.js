const sqlite3 = require('sqlite3').verbose();
const global_leagues = require('./Leagues/global_leagues'); //Custom import
const global_teams = require('./Teams/global_teams');
const express = require('express')
const app = express()
var http = require('http')
var fs = require('fs')

app.use(express.static('Front-End'));
fs.readFile('../Front-End/index.html', function(error, html) {
    if(error) throw error;
    http.createServer(function(req, res){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
    }). listen(3000)
})



let league_db = new global_leagues.league_dbmanager;
let team_db = new global_teams.team_dbmanager;

// league_db.open();
// console.log("League Opened");
// //league_db.create();
// //league_db.insert("UTKFF", 1, "Flag Football");
// //league_db.insert("UTKS", 2, "Soccer");
// //league_db.insert("UTKBB", 3, "Basketball");
// //league_db.insert("UTKT", 4, "Tennis");
// //league_db.insert("UTKBB2", 5, "Basketball");
// //league_db.update_sport("UTKBB", "Archery");
// //league_db.update_name("UTKBB2", "NBA-Official");
// //league_db.delete("UTKFF");
// //league_db.display_all();
// //league_db.drop();
// league_db.close();
// console.log("League Closed");

// team_db.open();
// console.log("Team Opened");
// //team_db.create();
// //team_db.insert("UTKFF", 1, "Flag Football");
// //team_db.insert("UTKS", 2, "Soccer");
// //team_db.insert("UTKBB", 3, "Basketball");
// //team_db.insert("UTKT", 4, "Tennis");
// //team_db.insert("UTKBB2", 5, "Basketball");
// //team_db.update_sport("UTKBB", "Archery");
// //team_db.update_name("UTKBB2", "NBA-Official");
// //team_db.delete("UTKFF");
// //team_db.display_all();
// //team_db.drop();
// team_db.close();
// console.log("Team Closed");