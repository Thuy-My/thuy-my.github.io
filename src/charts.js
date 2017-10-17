//const chart = require('chart.js');
//const fs = require('fs');
//const githubApi = require('./github-api.js');

let currChart = null;

/*module.exports = methods;

usernameClicked('zhaar', (result) => {console.log(result)});
usernameClicked('Thuy-My', (result) => {console.log(result)});
usernameClicked('Roldak', (result) => {console.log(result)});
usernameClicked('sydneyhauke', (result) => {console.log(result)});
usernameClicked('FredericJacobs', (result) => {console.log(result)});
usernameClicked('wasadigi', (result) => {console.log(result)});
usernameClicked('odersky', (result) => {console.log(result)});
usernameClicked('ounon', (result) => {console.log(result)});
usernameClicked('dbnsky', (result) => {console.log(result)});
usernameClicked('XTBoris', (result) => {console.log(result)});*/

/* Function called when a username has been clicked */
function usernameClicked(username) {
    return drawMostActiveRepoChart(username);    
}

/* Draw the chart showing the repos' activity */ 
function drawMostActiveRepoChart(username) {    
    let ctx = document.getElementById("activityChart").getContext('2d');

    if(currChart != null) {
        currChart.destroy();
    }

    let url = "https://thuy-my.github.io/names_" + username +".txt";
    let url2 = "https://thuy-my.github.io/values_" + username + ".txt";

    //let url = "http://localhost:4000/names_" + username +".txt";
    //let url2 = "http://localhost:4000/values_" + username + ".txt";

    console.log("Files names are : " + url + " and " + url2);

    let namesData;
    let valuesData;

    getFile(url, (namesData) => {
        getFile(url2, (valuesData) => {
            console.log("Drawing chart...");
            drawBarChart(namesData, valuesData, ctx);
        })
    });
    
    //githubApi.getAllReposOfUser(username, (result) => {
        /*names = [];
        values = [];
        //document.getElementById("test3").innerHTML = "clicked";
        
        result.forEach(function(element) {
            let elem = element + '';

            let split = elem.split(',');

            names.push(split[0]);
            values.push(split[1]);
        }, this);

        for(let i = 0; i < result.length; i++) {
            console.log(i + " : " + names[i] + " = " + values[i]);
        }

        fs.writeFile("names_" + username + ".txt", names, function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("Names was saved!");
        }); 

        fs.writeFile("values_" + username + ".txt", values, function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("Values was saved!");
        }); 

        return names;*/
    /*}, (result2) => {
        languages = [];
        values = [];
        
        result.forEach(function(element) {
            let elem = element + '';

            let split = elem.split(',');

            names.push(split[0]);
            values.push(split[1]);
        }, this);

        for(let i = 0; i < result.length; i++) {
            console.log(i + " : " + names[i] + " = " + values[i]);
        }

        fs.writeFile("names_" + username + ".txt", names, function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("Names was saved!");
        }); 

        fs.writeFile("values_" + username + ".txt", values, function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("Values was saved!");
        }); 

        return names;
    });

    return false;*/
}

/* Function to read a given data file */
function getFile(url, func) {
    console.log("Reading file...");
    let namesFile = new XMLHttpRequest();

    namesFile.onreadystatechange = function() {
        if(namesFile.readyState == 4) {  
            if(namesFile.status == 200) {   // Success
                console.log("Read file!");
                func(namesFile.responseText);
            
            } else {    // Fail

                func(null);
            
            }
        }
    };

    namesFile.open("GET", url);
    namesFile.send();
}

/* Function to draw a bar chart */
function drawBarChart(labelsFile, valuesFile, ctx) {
    
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
                label: '# Activities per repository',
                data: values,
                backgroundColor: bgColor,
                borderColor: bColor,
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

    currChart = barChart;

    //setTimeout(() => barChart.destroy(), 1000);
}

function clearCanvas(ctx) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.restore();
}