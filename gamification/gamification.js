var app = angular.module('ratings', []);

app.controller('ratingsCtrl', function($scope) {
    /* $scope.records = [
        "Alfreds Futterkiste",
        "Berglunds snabbköp",
        "Centro comercial Moctezuma",
        "Ernst Handel",
    ] */

    $scope.rating = [];

    let repoUrl = "https://thuy-my.github.io/data/repo_" + "zhaar" + ".txt";
    let languagesUrl = "https://thuy-my.github.io/data/languages_" + "zhaar" + ".txt";

    getFile(repoUrl, (repoData) => {
        let repoValue = repoData.split(",").length * 2;
        getFile(languagesUrl, (languagesData) => {
            let languagesValue = languagesData.split(",").length * 3;
            let total = repoValue + languagesValue; 
            
            //func($scope, "zhaar", total);
            console.log($scope.rating);
        });
    });

    $scope.rating.push("hello");
});

function func($scope, username, total) {
    let tmp = {
        name: username,
        value: total
    };

    $scope.rating.push(tmp);
    console.log($scope.rating);

    //return $scope;
}