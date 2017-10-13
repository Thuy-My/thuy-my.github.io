const chart = require('chart.js');
const githubApi = require('./github-api');

function buttonClicked() {
    console.log("I here");
    drawMostActiveRepoChart(document.getElementById("username").value);
}

function drawMostActiveRepoChart(username) {
    const ctx = document.getElementById("userStats");

    const barChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: githubApi.getAllReposOfUser(username)
    });
}