const fs = require('fs'); 
const request = require('superagent');
const {username, token} = require('../github-credential.json');

/*getAllReposOfUser('zhaar', (result) => {
    return result;
});*/

//module.exports = methods = {};

/* Function to get all (public) repositories' name of a given user */
function getAllReposOfUser(owner, func) { // RENAME -> GETSTATSOFUSER?

    const url = `https://api.github.com/users/${owner}/repos`;

    request /*  Request to get all the given user's repos' name */
        .get(url)
        .auth(username, token)
        .set('Accept', 'application/vnd.github.v3+json')
        .end((err, res) => {

            let allCommitObjs = {}; 
            let result = JSON.parse(res.text);

            for(let i in result) {
                const repo = result[i].name;
                const url_counts = `https://api.github.com/repos/${owner}/${repo}/stats/contributors`;
                const url_languages = `https://api.github.com/repos/${owner}/${repo}/languages`;
                
                // Get the number of commits for each repository
                getCommitsNumber(url_counts, repo, (commitsObj) => {

                    Object.assign(allCommitObjs, commitsObj);
                    //console.log(Object.keys(allCommitObjs).length + " ; " + result.length);
                    
                    if(Object.keys(allCommitObjs).length == result.length) {
                        // Sort the repositories by their number of commits to obtain a "Most active on (...) repositories" ranking                    
                        sortReposByCommitsNumber(allCommitObjs, (sorted) => {
                            //console.log(sorted);       
                            func(sorted);                 
                        }); 
                    }

                });

                // Get all the languages used for that repository along with their number of occurrences
                getRepoLanguages(url_languages, (languages) => {    // Move it elsewhere?
                    //console.log(languages);
                });
            }

            //func(allCommitObjs);
    });
}

/* Function to get the number of commits*/
function getCommitsNumber(url, name, func) {
    request
    .get(url)
    .auth(username, token)
    .set('Accept', 'application/vnd.github.v3+json')
    .end((err, res) => {
        let result;
        let jsonResult = JSON.parse(res.text);

        if (jsonResult.length) {
            result = parseInt(JSON.stringify(JSON.parse(res.text)[0].total, null, 4));
        } else {
            result = 0;
        }

        let commitsObj = {};
        commitsObj[name] = result;

        func(commitsObj);
    });
}

function getRepoLanguages(url, func) {
    request
    .get(url)
    .auth(username, token)
    .set('Accept', 'application/vnd.github.v3+json')
    .end((err, res) => {
        let result = JSON.parse(res.text);

        let languages = {};
        for(var i in result) {
            languages[i] = result[i];
        }
        
        /*fs.appendFile('languages.txt', res.text + "\n", function (err) {
            if (err) throw err;
        });*/

        func(languages);
    });
}

function sortReposByCommitsNumber(commitsObj, func) {
    var sorted = [];

    for(var repo in commitsObj) {
        sorted.push([repo, commitsObj[repo]]);
    }

    sorted.sort((x, y) => y[1] - x[1]);

    func(sorted);
    //console.log(sorted);

}

console.log("github-api.js");