function getTeamPosition(tempTeamsScore, scoreToSearch, teamNames, scoreLevel) {
    var place = [];
    var scoreColours = ["#ffd700", "#c0c0c0", "#9f7a34"];
    for (let i = 0; i < tempTeamsScore.length; i++) {

        if (tempTeamsScore[i] == scoreToSearch) {
            place = [...place, teamNames[i]];
            // preferential code here. Uncomment to see what it does
            // $("#leaderboardNames" + String(i + 1)).css({
            //     color: scoreColours[scoreLevel - 1]
            // });
        };

    };
    return place
};

function changeCSSForPlaces(place, placeColour, index, teamColours) {
    if (place.length > 1) {
        for (let i = 1; i < place.length; i++) {

            placeColour += ", " + teamColours[teamNames.indexOf(place[i])];

        };
        $("#overallWinnerName" + String(index)).css({
            background: "linear-gradient(90deg, " + placeColour + ")"
        });
    } else {
        $("#overallWinnerName" + String(index)).css({
            backgroundColor: placeColour
        });
    };
};

$(document).ready(function() {

    var tempTeamsScore = [0, 0, 0, 0, 0, 0];
    var firstPlace =  [];
    var secondPlace = [];
    var thirdPlace = [];
    var teamColours = ["#2b3d51", "#217fbc", "#00bd9d", "#673fb0", "#c25400", "#c20092"];

    // gets url parameters
    urlParams = new URLSearchParams(window.location.search);
    questionsAnswered = urlParams.get("questions").split(",");
    correctTeamsPastQuestions = urlParams.get("correct").split(",");
    teamNames = [urlParams.get("t1"), urlParams.get("t2"), urlParams.get("t3"), urlParams.get("t4"), urlParams.get("t5"), urlParams.get("t6")];

    // makes appropriate number of circles and updates their css
    for (let i = 0; i < questionsAnswered.length; i++) {

        setTimeout(function() {
            $("#circlesScores").append("<div id = 'circle" + String(i + 1) + "' class = 'circles'></div>");
            $("#circle" + String(i + 1)).css({
                backgroundColor: teamColours[parseInt(correctTeamsPastQuestions[i]) - 1],
                borderColor: teamColours[parseInt(correctTeamsPastQuestions[i]) - 1]
            });
        }, 3000 / questionsAnswered.length * i);

    };
 
    // calculates and saves the scores of all teams
    for (let i = 0; i < correctTeamsPastQuestions.length; i++) {

        tempTeamsScore[parseInt(correctTeamsPastQuestions[i]) - 1]++;

    };

    tempTeamsScoreSorted = [...tempTeamsScore];
    tempTeamsScoreSorted = tempTeamsScoreSorted.sort(function(a, b) {
        return a - b;
    }).reverse();

    // firstPlace, secondPlace and thirdPlace aren't used, though can be used for a different UI next time if you want. the function getTeamPosition still is kinda used to change the colours of the winners names
    firstPlace = getTeamPosition(tempTeamsScore, tempTeamsScoreSorted[0], teamNames, 1);
    changeCSSForPlaces(firstPlace, teamColours[teamNames.indexOf(firstPlace[0])], 1, teamColours);
    $("#overallWinnerName1").html(firstPlace.join(", "));

    if (firstPlace.length == 1) {
        secondPlace = getTeamPosition(tempTeamsScore, tempTeamsScoreSorted[1], teamNames, 2);
        changeCSSForPlaces(secondPlace, teamColours[teamNames.indexOf(secondPlace[0])], 2, teamColours);
        $("#overallWinnerName2").html(secondPlace.join(", "));
    } else {
        $("#overallWinnerParent2").remove();
    };

    if (firstPlace.length <= 2 && secondPlace.length <= 1) {
        thirdPlace = getTeamPosition(tempTeamsScore, tempTeamsScoreSorted[2], teamNames, 3);
        changeCSSForPlaces(thirdPlace, teamColours[teamNames.indexOf(thirdPlace[0])], 3, teamColours);
        $("#overallWinnerName3").html(thirdPlace.join(", "));
    } else {
        $("#overallWinnerParent3").remove();
    };

    // updates text of teams, scores and css
    for (let i = 0; i < teamNames.length; i++) {

        $("#leaderboardNames" + String(i + 1)).css({
            opacity: 0
        });
        $("#leaderboardScore" + String(i + 1)).css({
            opacity: 0
        });
        $("#leaderboardBarBG" + String(i + 1)).css({
            opacity: 0
        });
        $("#leaderboardNames" + String(i + 1)).html(teamNames[i]);
        $("#leaderboardScore" + String(i + 1)).html(tempTeamsScore[i]);

        setTimeout(function() {
            $("#leaderboardNames" + String(i + 1)).animate({
                opacity: 1
            }, 500);
            $("#leaderboardScore" + String(i + 1)).animate({
                opacity: 1
            }, 500);
            $("#leaderboardBarOverlay" + String(i + 1)).animate({
                width: String((tempTeamsScore[i]/questionsAnswered.length) * (1350/1920 * window.innerWidth)) + "px"
            }, 900);
            $("#leaderboardBarBG" + String(i + 1)).animate({
                opacity: 1
            }, 450);
        }, 800 * i);

        if (teamNames[i] == "") {
            $("#leaderboardRow" + String(i + 1)).remove();
        };

    };

    setTimeout(function() {
        $("#overallWinnerParent1").animate({
            opacity: 1
        }, 800);
        setTimeout(function() {
            $("#overallWinnerParent2").animate({
                opacity: 1
            }, 800);
            setTimeout(function() {
                $("#overallWinnerParent3").animate({
                    opacity: 1
                }, 800);
            }, 800); 
        }, 800); 
    }, 4900); 

});