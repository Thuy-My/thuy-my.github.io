const GithubPublish = require('github-publish');
const {username, token} = require('../github-credential.json');

const publisher = new GithubPublish(token, 'Thuy-My', 'TWEB_project1');

publisher.publish('~/src/github-api.js', 'github-api.js', 'e4ea0959bdcd1e307d4fc60d82418a79007d052f').then(function(result) {
    console.log(result);
});