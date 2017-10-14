const chart = require('chart.js');
const githubApi = require('./github-api');

function usernameClicked(username) {
    drawMostActiveRepoChart(username);
    
    return false;
}

function drawMostActiveRepoChart(username) {
    const ctx = document.getElementById("userStats");

    const barChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: githubApi.getAllReposOfUser(username)
    });
}