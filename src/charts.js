let currChart;
let currChart2;

/* Function called when a username has been clicked */
function usernameClicked(username) {
    document.getElementById("chosenUser").innerHTML = username;

    /* Set all the following objects to be visible */
    document.getElementById("fineToothComb").style.display = "block";
    document.getElementById("sticky2").style.display = "block";
    document.getElementById("sticky3").style.display = "block";

    drawMostActiveRepoChart(username);    
    drawLanguagesChart(username);

    analyze(username);

    return false;
}

/* Draw the chart showing the repos' activity */ 
function drawMostActiveRepoChart(username) {    
    let ctx = document.getElementById("activityChart").getContext('2d');

    /* Destroy the current drawn chart to avoid overlapping */
    if(currChart != null) {
        currChart.destroy();
    } else if(currChart2 != null) {
        currChart2.destroy();
    }

    let url = "https://thuy-my.github.io/data/names_" + username +".txt";
    let url2 = "https://thuy-my.github.io/data/values_" + username + ".txt";

    //let url = "http://localhost:4000/data/names_" + username +".txt";
    //let url2 = "http://localhost:4000/data/values_" + username + ".txt";

    let namesData;
    let valuesData;

    getFile(url, (namesData) => {
        getFile(url2, (valuesData) => {
            drawBarChart(namesData, valuesData, '# Activities per repository', ctx, "activityChart");
        })
    });
}

function drawLanguagesChart(username) {
    let ctx = document.getElementById("languagesChart").getContext('2d');

    /* Destroy the current drawn chart to avoid overlapping */
    if(currChart != null) {
        currChart.destroy();
    } 
    if(currChart2 != null) {
        currChart2.destroy();
    }

    let url = "https://thuy-my.github.io/data/languages_" + username +".txt";
    let url2 = "https://thuy-my.github.io/data/languagesValues_" + username + ".txt";

    //let url = "http://localhost:4000/data/languages_" + username +".txt";
    //let url2 = "http://localhost:4000/data/languagesValues_" + username + ".txt";

    let languagesData;
    let valuesData;

    getFile(url, (languagesData) => {
        getFile(url2, (valuesData) => {
            drawDoughnutChart(languagesData, valuesData, '# Programming language occurences over all repositories', ctx, "languagesChart");
        })
    });

}

/* Function to draw a bar chart */
function drawBarChart(labelsFile, valuesFile, label, ctx, canvasName) {
    
    if(!labelsFile) {
        return;
    }

    let labels = labelsFile.split(',');
    let values = valuesFile.split(',');

    let bgColor = [];
    let bColor = [];

    /* Random background colors for the bars */
    for(let i = 0; i < labels.length; i++) {
        let r = Math.floor(Math.random() * 255) + 1;
        let g = Math.floor(Math.random() * 255) + 1;
        let b = Math.floor(Math.random() * 255) + 1;

        bgColor.push('rgba(' + r + ", " + g + ", " + b + ", 0.2");
        bColor.push('rgba(' + r + ", " + g + ", " + b + ", 1");
    }

    /* Draws bar chart */
    let barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: values,
                backgroundColor: bgColor,
                borderColor: bColor,
                hoverBackgroundColor : bColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    if(canvasName == "activityChart") {
        currChart = barChart;
    } else if (canvasName == "languagesChart") {
        currChart2 = barChart;
    }
}

function drawDoughnutChart(labelsFile, valuesFile, label, ctx, canvasName) {

    if(!labelsFile) {
        return;
    }

    let labels = labelsFile.split(',');
    let values = valuesFile.split(',');

    let bgColor = [];
    let bColor = [];

    /* Random background colors for the bars */
    for(let i = 0; i < labels.length; i++) {
        let r = Math.floor(Math.random() * 255) + 1;
        let g = Math.floor(Math.random() * 255) + 1;
        let b = Math.floor(Math.random() * 255) + 1;

        bgColor.push('rgba(' + r + ", " + g + ", " + b + ", 0.2");
        bColor.push('rgba(' + r + ", " + g + ", " + b + ", 1");
    }

    let doughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: values,
                backgroundColor: bgColor,
                borderColor: bColor,
                hoverBackgroundColor : bColor,
                borderWidth: 1
            }]
        },
        options: {
            animation : {
                animateScale : true,
            }
        }
    });

    if(canvasName == "activityChart") {
        currChart = doughnutChart;
    } else if (canvasName == "languagesChart") {
        currChart2 = doughnutChart;
    }
}

/* Function to read a given data file */
function getFile(url, func) {
    let namesFile = new XMLHttpRequest();

    namesFile.onreadystatechange = function() {
        if(namesFile.readyState == 4) {  
            if(namesFile.status == 200) {   // Success
                func(namesFile.responseText);
            
            } else {    // Fail

                func(null);
            
            }
        }
    };

    namesFile.open("GET", url);
    namesFile.send();
}

function analyze(username) {

    let url = "https://thuy-my.github.io/data/names_" + username +".txt";
    let url2 = "https://thuy-my.github.io/data/values_" + username + ".txt";

    let repoData;
    let valuesData;

    getFile(url, (repoData) => {
        getFile(url2, (valuesData) => {
            computeMedian(username, repoData, valuesData);
        })
    });

}

function computeMedian(username, names, values) {
    let namesArray = names.split(',');
    let valuesArray = values.split(',');

    let middle = 0.0;
    let totalCommits = 0;
    let length = valuesArray.length;

    for(let i = 0; i < length; i++) {
        middle += parseFloat(valuesArray[i]);
    }

    totalCommits = middle; // Total commits count
    middle = Math.ceil(middle / 2);
    
    let index = 0;
    let total = 0.0;
    while(total < middle) {
        total += valuesArray[index];
        index++;
    }

    let average = (totalCommits * 1.0 / length).toFixed(2);    // The theorical commits per repository 
    
    /* Get the names of the very most commited repos */
    let mostActiveRepos = [];
    for(let j = 0; j < index; j++) {
        mostActiveRepos.push(namesArray[j]);
    }

    document.getElementById("insideSticky2").innerHTML =
         "<tt>" + username + " has " + length + " repositories with a total commits count of " + totalCommits + ".<br>" +
         "The average number of commits per repository would be " + average + ". " +
         "But the first " + index + " repositories contains more commits than all the others combined! " +
         "His/her first " + index + " repositories (which are : " + mostActiveRepos.join() + ") must be dear to his/her heart. :)</tt>" ;   
}