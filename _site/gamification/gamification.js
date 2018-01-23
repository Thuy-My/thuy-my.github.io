let app = angular.module('ratings', []);
let usersObject = [];

app.controller('ratingsCtrl', function($scope, $http) {
    /* $scope.records = [
        "Alfreds Futterkiste",
        "Berglunds snabbköp",
        "Centro comercial Moctezuma",
        "Ernst Handel",
    ] */
    $scope.rating = [];

    /* let repoUrl2 = "https://thuy-my.github.io/data/repo_" + "roldak" + ".txt";
    let languagesUrl2 = "https://thuy-my.github.io/data/languages_" + "roldak" + ".txt";
 */
    let repoValue = 0;
    let languagesValue = 0;
    
    $scope.addUser = function(username) {
        let repoUrl = "https://thuy-my.github.io/data/repo_" + username + ".txt";
        let languagesUrl = "https://thuy-my.github.io/data/languages_" + username + ".txt";

        $http.get(repoUrl)
        .then(function(response) {
            repoValue = response.data.split(",").length * 2; // 2 points per repo

            $http.get(languagesUrl)
            .then(function(response) {
                languagesValue = response.data.split(",").length * 3; // 3 points per languages

                let total = repoValue + languagesValue;

                let tmp = {
                    name: username,
                    value: total
                };
            
                //$scope.rating.push(tmp);
                usersObject.push(tmp);
                //console.log(usersObject);
            });
        });
    }

    /* Add all selected users when button clicked */
    $scope.addAll = function() {
        console.log("hello");
        console.log(usersObject[0].name + " ; " + usersObject[1].name);//+ " ; " + usersObject[2].name);
        $scope.rating.push(usersObject);
        //console.log($scope.rating);
    }

/* 


    let repoValue2 = 0;
    let languagesValue2 = 0;

    $http.get(repoUrl2)
    .then(function(response) {
        repoValue2 = response.data.split(",").length * 2;

        $http.get(languagesUrl2)
        .then(function(response) {
            languagesValue2 = response.data.split(",").length * 3;

            let total2 = repoValue2 + languagesValue2;

            let tmp = {
                name: "roldak",
                value: total2
            };
        
            $scope.rating.push(tmp);
            //console.log($scope.rating.length);
        });
    }); */

    //console.log(repoValue);

   /*  $scope.processData = function(csv) {
        repoValue = repoData.split(",").length * 2;   
    } */

    //console.log(repoValue);
    /* getFile(repoUrl, (repoData) => {
        let repoValue = repoData.split(",").length * 2;
        getFile(languagesUrl, (languagesData) => {
            let languagesValue = languagesData.split(",").length * 3;
            let total = repoValue + languagesValue; 
            
            func($scope, "zhaar", total);
        });
    });
    console.log($scope.rating.length); */
});

function func($scope, username, total) {
    let tmp = {
        name: username,
        value: total
    };

    $scope.rating.push(tmp);
    console.log($scope.rating.length);
}