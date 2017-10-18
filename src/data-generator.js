
const fs = require('fs');
const githubApi = require('./github-api.js');

module.exports = methods;

generateData('zhaar', (result) => {console.log(result)});
generateData('Thuy-My', (result) => {console.log(result)});
generateData('Roldak', (result) => {console.log(result)});
generateData('sydneyhauke'); //, (result) => {console.log(result)});
generateData('FredericJacobs'); //, (result) => {console.log(result)});
generateData('wasadigi'); //, (result) => {console.log(result)});
generateData('odersky'); //, (result) => {console.log(result)});
generateData('ounon'); //, (result) => {console.log(result)});
generateData('dbnsky'); //, (result) => {console.log(result)});
generateData('XTBoris'); //, (result) => {console.log(result)});

function generateData(username) {
    console.log("I here");
    githubApi.getAllReposOfUser(username, (result) => {
        names = [];
        values = [];
        
        result.forEach(function(element) {
            let elem = element + '';

            let split = elem.split(',');

            names.push(split[0]);
            values.push(split[1]);
        }, this);

        /*for(let i = 0; i < result.length; i++) {
            console.log(i + " : " + names[i] + " = " + values[i]);
        }*/

        fs.writeFile("data/names_" + username + ".txt", names, function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("Names was saved!");
        }); 

        fs.writeFile("data/values_" + username + ".txt", values, function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("Values was saved!");
        }); 

        return names;
    });

    githubApi.getAllLanguagesOfUser(username, (result) => {
        names = [];
        values = [];
        console.log(username);
        result.forEach(function(element) {
            let elem = element + '';

            let split = elem.split(',');

            names.push(split[0]);
            values.push(split[1]);
        }, this);

        for(let i = 0; i < result.length; i++) {
            //console.log(i + " : " + names[i] + " = " + values[i]);
        }

        fs.writeFile("data/languages_" + username + ".txt", names, function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("Languages was saved!");
        }); 

        fs.writeFile("data/languagesValues_" + username + ".txt", values, function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("LanguagesValues was saved!");
        }); 

        return names;
    });

}