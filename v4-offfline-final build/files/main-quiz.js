
function readQuestions() {
    var data = 'cat,qn,0,0,0,1\nSports,How many people died in the ill-fated helicopter crash that killed the late basketball legend Kobe Bryant and his daughter Gianna?,4,20,6,9\nSports,What is the most recent player transfer from football club Inter Milan from Tottenham Hotspurs?,Victor Young,Giuseppe Rossi,Dennis Oaken,Christian Eriksen\nSports,Which English Premier League club has won the most league titles since 1900?,Arsenal,Liverpool,Manchester City,Manchester United\nSports,Which female figure skater won gold in the 2019 World Figure Skating Championships?,Evgenia Medvedeva,Elizabet Tursynbaeva,Kaori Sakamoto,Alina Zagitova\nSports,How old was Joseph Schooling when he broke the national record for 50m butterfly heats?,21,24,22,23\nSingapore,How much did private hire (GoJek & Grab) drivers in Singapore pay for modified apps that allowed them to bypass verification and raise earnings? ,S$200 - S$550,S$250 - S$550,S$300 - $450,S$200 - S$350\nSingapore,How many abandoned babies were reported in Singapore in the past 10 years? ,23,6,0,17\nSingapore,"Who composed the song, Home?",Stefanie Sun,JJ Lin,Kit Chan,Dick Lee\nPolitics,Which is NOT one of the reasons the UK decided to exit the European Union?,They wanted to control immigration into the UK,They felt they didn\'t have sovereignity in the EU,They wanted to be free from the strict regulations of the EU,They wanted full control of North Ireland\nPolitics,Which is NOT a reason Donald Trump was acquitted from his impeachment trial?,The majority of the American public still supported him,The Republican majority in the government supported his presidency,Trump stonewalled the White House when it was investigated,The evidence of Trump abusing his power was proven false\nPolitics,When was the Citizenship (Amendment) Act 2019 passed in India?,10 Dec 2019,9 Dec 2019,12 Dec 2019,11 Dec 2019\nPolitics,What did Trump suggest regarding the use of disinfectants?,Rationing,Spreading onto people\'s body,Adding into food,Injecting into people\nGeneral,Which luxury fashion company named its 2019 Autumn/Winter fashion show \'Heaven on Earth\'?,Hermès,Gucci,Burberry,Louis Vuitton\nGeneral,How many pairs of Dior x Air Jordan 1 High are reported to be released?,75 000,37 000,14 500,8 500\nGeneral,How long is the world\'s longest English word? ,34 letters,20 letters,50 letters,45 letters\nGeneral,Who is NOT a winner of the Nobel Peace Prize?,Theodore Roosevelt,Barack Obama,Nelson Mandela,Mahatma Gandhi \nGeneral,Which of the following is the largest man-made indoor waterfall in the world? ,Cascata della Marmore,Viktoriapark,Liebian International Building,Rain Vortex@Jewel Changi\nEnvironment ,"Approximately how many trips were made this year in the largest annual human migration phenomenon, or \'chunyun\', in China?",4 billion,6 billion,2 billion,3 billion\nEnvironment,By when is Scotland estimated to achieve its aim of running on renewable energy 100%? ,2030,2015,2025,2020\nEnvironment,Which of the following is currently the cleanest river in Europe? ,The Rhine,The Seine,The Meuse,River Thames\nEnvironment,"As of 2019, which is the most air polluted country?",Afghanistan,Mongolia,Pakistan,Bangladesh\nEntertainment,How many ex-boyfriends did Taylor Swift have?,22,0,69,8\nEntertainment,Which of the following individuals is currently the top Grammy Award winner of all time? ,Beyonce,Stevie wonder,Pierre Boulez,George Solti\nEntertainment,Which movie caused AMC to ban movies from Universal Studios to be played in all their global branches?,The Invisible Man,Fast and Furious 8,Onward,Trolls: World Tour\nEntertainment,"How many subscribers did the new streaming service, Disney Plus, gain in its first six weeks?",30 million,15.6 million,990 thousand,26.5 million\nEntertainment,Which artist recently collaborated with Fortnite for a virtual concert?,Marshmello,Alan Walker,Billie Eilish,Travis Scott\nEconomy,Which company has proceeded with its plans to enter the U.K. market despite its strained relations with the U.S.?,China National Petroleum,Alibaba Group,Taobao,Huawei\nEconomy,"In January this year, automobile maker General Motors committed a sum of money to the building of electric and autonomous vehicles. How much was this sum of money?",US$2 million,US$4 million,US$5 million,US$3 million\nEconomy,"Which is NOT an aim of the Digital Economy Partnership Agreement (DEPA) between Singapore, New Zealand and Chile? ",Facilitate greater digital connectivity between them,Establish multilateral rules on digtal trade,Move towards a digital economy,Move towards the use of cryptocurrency\nEconomy,"When was the “Phase One” trade deal, a trade agreement that is expected to boost exports from American farmers/manufacturers and lower tensions in a long-running dispute between the U.S. and China signed? ",September 11 2019,June 6 2019,August 6 2019,January 15 2020\nEconomy,"What was the lowest price in history (USD) for a barrel of oil?",$399.00,$12,-$104.00,-$37.00\nCovid-19,"Which country was the first to issue a travel ban on visitors from Wuhan, China, in light of Covid-19 transmission?",The U.S.,Taiwan,France,Marshall Islands \nCovid-19,"In January 2020, Taiwanese authorities made a decision to temporarily halt the export of masks. What was the duration of this mask export ban?",2 weeks,3 weeks,2 months,1 month\nCovid-19,Which animal species was the Covid-19 virus supposedly originate from? ,Slugs,Rats,Snakes,Bats\nCovid-19,Which local university hostels were not being used as quarantine facilities in the early stages of the Covid-19 pandemic in Singapore?,SMU,NTU,NUS,SUTD\nArts,"Which art piece was drawn by famous contemporary artist, Takashi Murakami?",Dots Obsession,Balloon Dog,Mickey,Flower Ball\nArts,Which museum in Singapore has free admissions for everyone?,ArtScience Museum ,Science Centre,Singapore Musical Box Museum,Asian Civilisation Museums\nArts,What is the most expensive painting ever sold?,Number 17A,The Card Players,Interchange,Salvator Mundi\nArts,Which museum has the longest history?,Royal Armouries,Amerbach Cabinet,Hermitage Museum,Capitoline Museum\nArts,Which Singaporean tamil film is featured at the Cannes Film Festival?,Already Famous,Tatsumi,Be With Me,My Magic';
    var allTextLines = data.split(/\r\n|\n/);
    var lines = [];

    for (var i = 1; i < allTextLines.length; i++) {

        var lineData = allTextLines[i].split('|');
        lines.push(lineData);

    };

    for (i in lines) {

        thisLine = lines[i][0].split(",");
        if (thisLine[1][0] == '"') {
            while (thisLine[1][thisLine[1].length - 1] != '"') {
                thisLine[1] = thisLine[1] + "," + thisLine[2];
                thisLine.splice(2, 1);
            };
            thisLine[1] = thisLine[1].substr(1, thisLine[1].length - 2);
        };
        questions.push(thisLine);

    };

    csvFileReadFinished = true;
};

function generateRandomQuestion(questionsAnswered, questions) {

    while (true) {

        if (questionsAnswered.length == questions.length) {
            return -1
        };

        var randomQuestion = Math.floor(Math.random() * (questions.length)) + 1;

        if (questionsAnswered.includes(String(randomQuestion))) {
            continue;
        } else {
            return randomQuestion;
        };

    };

};

function initialise(questionsAnswered) {

    // initialises reading questions and storing into vars
    if (csvFileReadFinished == false) {
        setTimeout(function() {
            initialise(questionsAnswered);
        }, 10);
        return;
    };

    // initialises topic and question
    randomQuestion = generateRandomQuestion(questionsAnswered, questions);
    if (randomQuestion == -1) {
        window.location.replace(window.location.href.split("/")[0] + "results.html?t1=" + teamNames[0] + "&t2=" + teamNames[1] + "&t3=" + teamNames[2] + "&t4=" + teamNames[3] + "&t5=" + teamNames[4] + "&t6=" + teamNames[5] + "&correct=" + correctTeamsPastQuestionsRaw + "&questions=" + questionsAnsweredRaw);
        return;
    };
    $("#topic").html(questions[randomQuestion - 1][0]);
    $("#question").html(questions[randomQuestion - 1][1]);

    // initialises question size
    questionLength = questions[randomQuestion - 1][1].length - 100;
    if (questionLength > 0) {
        $("#question").css({
            "fontSize": String(1.4 - Math.round(Math.floor(questionLength / 50) / 10)) + "rem" // 0-100 length is default of 1.4rem, 101-150 is 1.3rem, 151-200 is 1.2rem, etc...
        });
    };

    // initialises options
    while (answersLink.length < 4) { // value of index of array points to the index of the answers in questions variable. E.g. [4,2,1,3] -> ["Correct Ans (4)", "Wrong Ans (2)", "Wrong Ans (1)", "Wrong Ans (3)"] where 4 is always the correct answer
        
        randomValue = Math.floor(Math.random() * (4)) + 1;
        if (answersLink.includes(randomValue) == false) {
            answersLink.push(randomValue);
        };

    };

    //initialises scoreboard
    tempTeamsScore = [0, 0, 0, 0, 0, 0]
    for (let i = 0; i < correctTeamsPastQuestions.length; i++) {

        tempTeamsScore[parseInt(correctTeamsPastQuestions[i]) - 1]++;

    };
    for (let i = 0; i < tempTeamsScore.length; i++) {

        $("#leaderboardNames" + String(i + 1)).html(teamNames[i]);
        $("#leaderboardScore" + String(i + 1)).html(tempTeamsScore[i]);
        $("#leaderboardBarOverlay" + String(i + 1)).animate({
            width: String((tempTeamsScore[i]/questions.length) * (1350/1920 * window.innerWidth)) + "px"
        }, 200);

    };
    if (teamNames[0] == "" || teamNames[1] == "") {
        // redirect back to start
    } else {
        for (let i = 2; i < tempTeamsScore.length; i++) {
            if (teamNames[i] == "") {
                for (let j = i + 1; j <= tempTeamsScore.length; j++) {
                    $("#leaderboardRow" + String(j)).css({
                        opacity: "0"
                    });
                };
                break;
            };
        }
    };

};

function timer() {

    if (timerPaused == true) {
        return;
    };

    timeNow = new Date().getTime();

    if (timeNow - startTime >= timerLength * 1000) {
        $("#timerDigits").html("0");
        endRound();
    } else {
        $("#timerDigits").html(Math.round((timerLength * 1000 - (timeNow - startTime)) / 1000));
        setTimeout(function() {
            timer();
        }, 200);
    };
};

function endRound() {
    
    if (isAnyTeamsSelected == false && roundEnd == false) {

        roundEnd = true;
        tempOptions = {
            0: "A",
            1: "B",
            2: "C",
            3: "D"
        };

        for (let i = 0; i < answersLink.length; i++) {

            if (answersLink[i] == 4) {
                $("#option" + tempOptions[i]).animate({
                    borderTopColor: "1px solid #05ca00",
                    borderBottomColor: "1px solid #05ca00",
                    borderLeftColor: "1px solid #05ca00",
                    borderRightColor: "1px solid #05ca00",
                    backgroundColor: "rgba(5, 202, 0, 0.1)"
                });
                $("#option" + tempOptions[i]).children(".optionsABCD").animate({
                    backgroundColor: "rgba(5, 202, 0, 1)"
                });
                $("#option" + tempOptions[i]).children(".optionsABCD").css({
                    "boxShadow": "0px 0px 2px 3px rgba(5, 202, 0, 1)"
                });
            } else {
                $("#option" + tempOptions[i]).animate({
                    borderTopColor: "1px solid #c33825",
                    borderBottomColor: "1px solid #c33825",
                    borderLeftColor: "1px solid #c33825",
                    borderRightColor: "1px solid #c33825",
                    backgroundColor: "rgba(195, 56, 37, 0.1)"
                });
            };

        };

        $("#nextQuestion").animate({
            opacity: "1"
        }, 200);
        $("#nextQuestion").css({
            pointerEvents: "all"
        });

    };
};

function startQuestion() {

    startTime = new Date().getTime();
    timer();
    $("#timerBarOverlay").animate({
        width: "0px"
    }, timerLength * 1000, "linear");
    roundStart = true;

};

function animationsIntialiser() {

    var tempOptions = ["A", "B", "C", "D"];

    $(".options").hover(function() {

        if (roundEnd == false && answersGuessed[tempOptions.indexOf($(this).attr("id").substr($(this).attr("id").length - 1, 1))] == false) {
            if (selector == 0) {
                $(this).stop().animate({
                    borderTopColor: "1px solid " + defaultGenericColourHex,
                    borderBottomColor: "1px solid " + defaultGenericColourHex,
                    borderLeftColor: "1px solid " + defaultGenericColourHex,
                    borderRightColor: "1px solid " + defaultGenericColourHex,
                    backgroundColor: defaultGenericColourRGBOpacity10
                }, 200);
            } else {
                $(this).stop().animate({
                    borderTopColor: "1px solid " + teamColours[selector - 1],
                    borderBottomColor: "1px solid " + teamColours[selector - 1],
                    borderLeftColor: "1px solid " + teamColours[selector - 1],
                    borderRightColor: "1px solid " + teamColours[selector - 1],
                    backgroundColor: "rgba(" + teamColoursRGB[selector - 1] + ", 0.1)"
                }, 200);
            };
        };

    }, function() {

        if (roundEnd == false && answersGuessed[tempOptions.indexOf($(this).attr("id").substr($(this).attr("id").length - 1, 1))] == false) {
            $(this).stop().animate({
                borderTopColor: "1px solid #bfbfbf",
                borderBottomColor: "1px solid #bfbfbf",
                borderLeftColor: "1px solid #bfbfbf",
                borderRightColor: "1px solid #bfbfbf",
                backgroundColor: "rgba(195, 56, 37, 0.0)"
            }, 200);
        };

    });

    $(".options").click(function() {
        optionPressed($(this));
    });

};

function teamPress(event) {

    selector = 0;
    var key = (event.keyCode ? event.keyCode : event.which);
    if (key >= 49 && key <= 54) {
        selector = key - 48; // 49 == 1, 50 == 2, 51 == 3, 52 == 4, 53 == 5, 54 == 6.
    };

    // checks for if the game is running less than max teams and the team for unused team is selected
    if (teamNames[selector - 1] == "") {
        selector = 0;
        return;
    };

    if (selector != 0 && roundStart == true && roundEnd == false) {
        if (teamsGuessed[selector - 1] == true) {
            selector = 0;
            return;
        };

        selector--;
        isAnyTeamsSelected = true;
        pauseTimer();
        var tempOptions = ["A", "B", "C", "D"];

        for (let i = 0; i < answersGuessed.length; i++) {

            if (answersGuessed[i] == false) {
                $("#option" + tempOptions[i]).children(".optionsABCD").stop().animate({
                    backgroundColor: "rgba(" + teamColoursRGB[selector] + ", 1)"
                }, 200);
                $("#option" + tempOptions[i]).children(".optionsABCD").css({
                    "boxShadow": "0px 0px 2px 3px rgba(" + teamColoursRGB[selector] + ", 1)"
                });
                $("#timerBarOverlay, #timerDigits").stop().animate({
                    backgroundColor: "rgba(" + teamColoursRGB[selector] + ", 1)"
                }, 200);
                $("#questionNumber, #questionTopicSeparator, #topic").stop().animate({
                    color: "rgba(" + teamColoursRGB[selector] + ", 1)"
                }, 200);
            };

        };

        selector++;
    } else {
        selector = 0;
        return;
    };
    
};

function optionPressed(thisObject) {

    if (selector != 0 && roundEnd == false) {
        var tempOptions = ["A", "B", "C", "D"];
        var selectedOption = tempOptions.indexOf(thisObject.attr("id").substr(thisObject.attr("id").length - 1, 1)); // 0 based

        if (answersGuessed[selectedOption] == false) {
            answersGuessed[selectedOption] = true;
            teamsGuessed[selector - 1] = true;
            isAnyTeamsSelected = false;

            if (answersLink[selectedOption] == 4) {
                // sets colour of right selection to green
                $("#option" + tempOptions[selectedOption]).animate({
                    borderTopColor: "1px solid #05ca00",
                    borderBottomColor: "1px solid #05ca00",
                    borderLeftColor: "1px solid #05ca00",
                    borderRightColor: "1px solid #05ca00",
                    backgroundColor: "rgba(5, 202, 0, 0.1)"
                });
                $("#option" + tempOptions[selectedOption]).children(".optionsABCD").animate({
                    backgroundColor: "rgba(5, 202, 0, 1)"
                });
                $("#option" + tempOptions[selectedOption]).children(".optionsABCD").css({
                    "boxShadow": "0px 0px 2px 3px rgba(5, 202, 0, 1)"
                });
                $("#leaderboardScore" + String(selector)).html(parseInt($("#leaderboardScore" + String(selector)).html()) + 1);
                $("#leaderboardBarOverlay" + String(selector)).animate({
                    width: String(((parseInt($("#leaderboardScore" + String(selector)).html()))/questions.length) * (1350/1920 * window.innerWidth)) + "px"
                }, 1000);

                teamAnsweredCorrectly = selector;

                endRound();
            } else {
                selector = 0;

                // sets colour of wrong selection to red
                $("#option" + tempOptions[selectedOption]).animate({
                    borderTopColor: "1px solid #c33825",
                    borderBottomColor: "1px solid #c33825",
                    borderLeftColor: "1px solid #c33825",
                    borderRightColor: "1px solid #c33825",
                    backgroundColor: "rgba(195, 56, 37, 0.1)"
                });
                $("#option" + tempOptions[selectedOption]).children(".optionsABCD").animate({
                    backgroundColor: "rgba(195, 56, 37, 1)"
                });
                $("#option" + tempOptions[selectedOption]).children(".optionsABCD").css({
                    "boxShadow": "0px 0px 2px 3px rgba(195, 56, 37, 1)"
                });

                // resets overall colours back to default
                for (let i = 0; i < 4; i++) {

                    if (answersGuessed[i] == false) {
                        $("#option" + tempOptions[i]).children(".optionsABCD").animate({
                            backgroundColor: defaultGenericColourRGB
                        });
                        $("#option" + tempOptions[i]).children(".optionsABCD").css({
                            "boxShadow": "0px 0px 2px 3px " + defaultGenericColourRGB
                        });
                    };

                };
                $("#timerBarOverlay, #timerDigits").stop().animate({
                    backgroundColor: defaultGenericColourRGB
                }, 200);
                $("#questionNumber, #questionTopicSeparator, #topic").stop().animate({
                    color: defaultGenericColourRGB
                }, 200);

                // checks to end round or not if all teams have guessed. Used for teams less than 4.
                var tempCount = 0;
                for (let i = 0; i < 6; i++) {

                    if (teamsGuessed[i] == true) {
                        tempCount++;
                    };

                };
                if (tempCount < teamCount && tempCount < 4) {
                    resumeTimer();
                } else {
                    endRound();
                };
            };
        };
    };

};

function pauseTimer() {
    
    if (timerPaused == false && roundStart == true) {
        timerPaused = true;
        timePaused =  new Date().getTime();
        $("#timerBarOverlay").stop();
    };

};

function resumeTimer() {

    var tempTimeNow = new Date().getTime();
    startTime = tempTimeNow - (timePaused - startTime);
    timerPaused = false;
    timer();

    $("#timerBarOverlay").animate({
        width: "0px"
    }, (timerLength * 1000 - (timeNow - startTime)), "linear");

};

function nextQuestion() {

    if (roundEnd == true) {
        if (questionNumber == questions.length) {
            window.location.replace(window.location.href.split("/")[0] + "results.html?t1=" + teamNames[0] + "&t2=" + teamNames[1] + "&t3=" + teamNames[2] + "&t4=" + teamNames[3] + "&t5=" + teamNames[4] + "&t6=" + teamNames[5] + "&correct=" + correctTeamsPastQuestionsRaw + "," + String(teamAnsweredCorrectly) + "&questions=" + questionsAnsweredRaw + "," + randomQuestion);
        } else if (questionNumber == 1) {
            window.location.replace(window.location.href.split("/")[0] + "main-quiz.html?t1=" + teamNames[0] + "&t2=" + teamNames[1] + "&t3=" + teamNames[2] + "&t4=" + teamNames[3] + "&t5=" + teamNames[4] + "&t6=" + teamNames[5] + "&correct=" + String(teamAnsweredCorrectly) + "&questions=" + randomQuestion);
        } else {
            window.location.replace(window.location.href.split("/")[0] + "main-quiz.html?t1=" + teamNames[0] + "&t2=" + teamNames[1] + "&t3=" + teamNames[2] + "&t4=" + teamNames[3] + "&t5=" + teamNames[4] + "&t6=" + teamNames[5] + "&correct=" + correctTeamsPastQuestionsRaw + "," + String(teamAnsweredCorrectly) + "&questions=" + questionsAnsweredRaw + "," + randomQuestion);
        };
    } else {
        $("#nextQuestion").animate({
            opacity: "0"
        }, 200);
        $("#nextQuestion").css({
            pointerEvents: "none"
        });
        // Makes Next Question End Quiz if its the last question. If not, sets it to Next Question
        setTimeout(function() {
            if (questionNumber == questions.length) {
                $("#nextQuestion").html("End Quiz");
            } else {
                $("#nextQuestion").html("Next Question");
            };
        }, 1000);

        $("#answerA, #answerB, #answerC, #answerD").css({
            opacity: 0
        });
        $("#answerA").html(questions[randomQuestion - 1][answersLink[0] + 1]);
        $("#answerB").html(questions[randomQuestion - 1][answersLink[1] + 1]);
        $("#answerC").html(questions[randomQuestion - 1][answersLink[2] + 1]);
        $("#answerD").html(questions[randomQuestion - 1][answersLink[3] + 1]);
        $("#answerA, #answerB, #answerC, #answerD").animate({
            opacity: 1
        }, 700);

        setTimeout(function() {
            startQuestion();
        }, 700);
    };

};

function endQuizClicked() {

    if (questionNumber == 1) {
        if (roundEnd == false) {
            window.location.replace(window.location.href.split("/")[0] + "results.html?t1=" + teamNames[0] + "&t2=" + teamNames[1] + "&t3=" + teamNames[2] + "&t4=" + teamNames[3] + "&t5=" + teamNames[4] + "&t6=" + teamNames[5] + "&correct=&questions=");
        } else {
            window.location.replace(window.location.href.split("/")[0] + "results.html?t1=" + teamNames[0] + "&t2=" + teamNames[1] + "&t3=" + teamNames[2] + "&t4=" + teamNames[3] + "&t5=" + teamNames[4] + "&t6=" + teamNames[5] + "&correct=" + String(teamAnsweredCorrectly) + "&questions=" + randomQuestion);
        };
    } else {
        if (roundEnd == false) {
            window.location.replace(window.location.href.split("/")[0] + "results.html?t1=" + teamNames[0] + "&t2=" + teamNames[1] + "&t3=" + teamNames[2] + "&t4=" + teamNames[3] + "&t5=" + teamNames[4] + "&t6=" + teamNames[5] + "&correct=" + correctTeamsPastQuestionsRaw + "&questions=" + questionsAnsweredRaw);
        } else {
            window.location.replace(window.location.href.split("/")[0] + "results.html?t1=" + teamNames[0] + "&t2=" + teamNames[1] + "&t3=" + teamNames[2] + "&t4=" + teamNames[3] + "&t5=" + teamNames[4] + "&t6=" + teamNames[5] + "&correct=" + correctTeamsPastQuestionsRaw + "," + String(teamAnsweredCorrectly) + "&questions=" + questionsAnsweredRaw + "," + randomQuestion);
        };
    };

};


// VARIABLES
var csvFileReadFinished = false; // used to check if the app has finished reading the csv file
var isAnyTeamsSelected = false; // used to check if a team is currently selected or not
var roundEnd = false; // used to check if the round has ended
var roundStart = false; // used to check for when keypresses are registered (stops code from running when keys are pressed before the timer runs)
var timerPaused = false; // used to check if timer is paused or not
var answersGuessed = [false, false, false, false];
var teamsGuessed = [false, false, false, false, false, false];
var questionNumber = 0;
var startTime = 0; // used to keep track the unix time of when the timer started
var timePaused = 0; // used to keep track the unix time of when the timer paused
var timerLength = 30; // in seconds
var selector = 0; // selected team. 0 is null, 1 - 4 represents each of the group.
var teamCount = 0;
var teamAnsweredCorrectly = 0;
var defaultGenericColourHex = "#c33825";
var defaultGenericColourRGB = "rgba(195, 56, 37, 1)";
var defaultGenericColourRGBOpacity10 = "rgba(195, 56, 37, 0.1)";
var correctTeamsPastQuestionsRaw = "";
var questionsAnsweredRaw = "";
var questions = [];
var answersLink = [];
var correctTeamsPastQuestions = [];
var teamNames = [];
var teamColours = ["#2b3d51", "#217fbc", "#00bd9d", "#673fb0", "#c25400", "#c20092"];
var teamColoursRGB = ["43, 61, 81", "33, 127, 188", "0, 189, 157", "103, 63, 176", "194, 84, 0", "194, 0, 146"];


// MAIN CODE, AUTOMATICALLY EXECTUED WHEN THE APP IS READY
$(document).ready(function() {

    urlParams = new URLSearchParams(window.location.search);
    questionsAnswered = urlParams.get("questions").split(",");
    questionsAnsweredRaw = urlParams.get("questions");
    correctTeamsPastQuestions = urlParams.get("correct").split(",");
    correctTeamsPastQuestionsRaw = urlParams.get("correct");
    teamNames = [urlParams.get("t1"), urlParams.get("t2"), urlParams.get("t3"), urlParams.get("t4"), urlParams.get("t5"), urlParams.get("t6")];

    for (let i = 0; i < teamNames.length; i++) {

        if (teamNames[i] == "") {
            break
        } else {
            teamCount++;
        };

    };

    if (questionsAnswered [0] == "") {
        questionNumber = 1
    } else {
        questionNumber = questionsAnswered.length + 1
    };

    $("#questionNumber").html("Question " + questionNumber);

    readQuestions()
    setTimeout(function() {
        initialise(questionsAnswered);
    }, 10);

    animationsIntialiser();

    $(document).keydown(function(event) {
        teamPress(event);
    });

    $("#nextQuestion").click(function() {
        nextQuestion();
    });

    $("#endQuiz").click(function() {
        endQuizClicked();
    });

});