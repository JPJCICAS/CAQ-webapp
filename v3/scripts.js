// START OF GEOMETRY ANIMATION CODE
// ================================
// min and max radius, radius threshold and percentage of filled circles
var horizontalWidth = 0.225;
var verticalHeight = 0.25;

var canvas = document.createElement('canvas');

// circle properties
var radMin = 1;
var radMax = 1;
var filledCircle = 0; //percentage of filled circles
var concentricCircle = 100; //percentage of concentric circles
var radThreshold = 0; //IFF special, over this radius concentric, otherwise filled

//min and max speed to move
var speedMin = 0.15;
var speedMax = 0.35;

//max reachable opacity for every circle and blur effect
var maxOpacity = 0;

//default palette choice
var colors = ['255, 255, 255'];
var bgColors = ['255, 255, 255'];
var circleBorder = 1;
var backgroundLine = bgColors[0];
var backgroundMlt = 0.85;

//min distance for links
canvas.width = $(window).width() / 2;
canvas.height = $(window).height() / 2;
var linkDist = Math.min(canvas.width, canvas.height) / 2.4;
var lineBorder = 2.5;

//most importantly: number of overall circles and arrays containing them
var maxCircles = 25;
var points = [];
var pointsBack = [];

//experimental vars
var circleExp = 1;
var circleExpMax = 1;
var circleExpMin = 1;
var circleExpSp = 0.00004;
var circlePulse = false;

//populating the screen
for (var i = 0; i < maxCircles * 2; i++) points.push(new Circle());
for (var i = 0; i < maxCircles; i++) pointsBack.push(new Circle(true));

//circle class
function Circle(background) {
  //if background, it has different rules
  this.background = (background || false);
  this.x = randRange(-canvas.width / 2, canvas.width / 2);
  this.y = randRange(-canvas.height / 2, canvas.height / 2);
  this.radius = background ? hyperRange(radMin, radMax) * backgroundMlt : hyperRange(radMin, radMax);
  this.filled = this.radius < radThreshold ? (randint(0, 100) > filledCircle ? false : 'full') : (randint(0, 100) > concentricCircle ? false : 'concentric');
  this.color = background ? bgColors[randint(0, bgColors.length - 1)] : colors[randint(0, colors.length - 1)];
  this.borderColor = background ? bgColors[randint(0, bgColors.length - 1)] : colors[randint(0, colors.length - 1)];
  this.opacity = 0.05;
  this.speed = (background ? randRange(speedMin, speedMax) / backgroundMlt : randRange(speedMin, speedMax)); // * (radMin / this.radius);
  this.speedAngle = Math.random() * 2 * Math.PI;
  this.speedx = Math.cos(this.speedAngle) * this.speed;
  this.speedy = Math.sin(this.speedAngle) * this.speed;
  var spacex = Math.abs((this.x - (this.speedx < 0 ? -1 : 1) * (canvas.width / 2 + this.radius)) / this.speedx),
    spacey = Math.abs((this.y - (this.speedy < 0 ? -1 : 1) * (canvas.height / 2 + this.radius)) / this.speedy);
  this.ttl = Math.min(spacex, spacey);
};

Circle.prototype.init = function() {
  Circle.call(this, this.background);
}

//support functions
//generate random int a<=x<=b
function randint(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  }
  //generate random float
function randRange(a, b) {
    return Math.random() * (b - a) + a;
  }
  //generate random float more likely to be close to a
function hyperRange(a, b) {
  return Math.random() * Math.random() * Math.random() * (b - a) + a;
}

//rendering function
function drawCircle(ctx, circle, canvas) {
  //circle.radius *= circleExp;
  var radius = circle.background ? circle.radius *= circleExp : circle.radius /= circleExp;
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, radius * circleExp, 0, 2 * Math.PI, false);
  ctx.lineWidth = Math.max(1, circleBorder * (radMin - circle.radius) / (radMin - radMax));
  ctx.strokeStyle = ['rgba(', circle.borderColor, ',', circle.opacity, ')'].join('');
  if (circle.filled == 'full') {
    ctx.fillStyle = ['rgba(', circle.borderColor, ',', circle.background ? circle.opacity * 0.8 : circle.opacity, ')'].join('');
    ctx.fill();
    ctx.lineWidth=0;
    ctx.strokeStyle = ['rgba(', circle.borderColor, ',', 0, ')'].join('');
  }
  ctx.stroke();
  if (circle.filled == 'concentric') {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, radius / 2, 0, 2 * Math.PI, false);
    ctx.lineWidth = Math.max(1, circleBorder * (radMin - circle.radius) / (radMin - radMax));
    ctx.strokeStyle = ['rgba(', circle.color, ',', circle.opacity, ')'].join('');
    ctx.stroke();
  }
  circle.x += circle.speedx;
  circle.y += circle.speedy;
  if (circle.opacity < (circle.background ? maxOpacity : 1)) circle.opacity += 0.01;
  circle.ttl--;
}

//initializing function
function init() {
  window.requestAnimationFrame(justdraw);
}

function justdraw() {
    
    var canvas = document.getElementById('canvas-1');
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    if (circlePulse) {
        if (circleExp < circleExpMin || circleExp > circleExpMax) circleExpSp *= -1;
        circleExp += circleExpSp;
    }
    if (points[0].color != colors[0]) {
        for (i in points) {
            points[i].color = colors[0];
            points[i].borderColor = bgColors[0];
        };
        for (i in pointsBack) {
            pointsBack[i].color = colors[0];
            pointsBack[i].borderColor = bgColors[0];
        };
    };
    var ctxfr = document.getElementById('canvas-1').getContext('2d');
    var ctxbg = document.getElementById('canvasbg-1').getContext('2d');
    
    ctxfr.globalCompositeOperation = 'destination-over';
    ctxfr.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    ctxbg.globalCompositeOperation = 'destination-over';
    ctxbg.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    
    ctxfr.save();
    ctxfr.translate(canvas.width / 2, canvas.height / 2);
    ctxbg.save();
    ctxbg.translate(canvas.width / 2, canvas.height / 2);
    
    //function to render each single circle, its connections and to manage its out of boundaries replacement
    function renderPoints(ctx, arr) {
        for (var i = 0; i < arr.length; i++) {
        var circle = arr[i];
        //checking if out of boundaries
        if (circle.ttl<0) {}
        var xEscape = canvas.width / 2 + circle.radius,
            yEscape = canvas.height / 2 + circle.radius;
        if (circle.ttl < -20) arr[i].init(arr[i].background);
        //if (Math.abs(circle.y) > yEscape || Math.abs(circle.x) > xEscape) arr[i].init(arr[i].background);
        drawCircle(ctx, circle, canvas);
        }
        for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            var deltax = arr[i].x - arr[j].x;
            var deltay = arr[i].y - arr[j].y;
            var dist = Math.pow(Math.pow(deltax, 2) + Math.pow(deltay, 2), 0.5);
            //if the circles are overlapping, no laser connecting them
            if (dist <= arr[i].radius + arr[j].radius) continue;
            //otherwise we connect them only if the dist is < linkDist
            if (dist < linkDist) {
            var xi = (arr[i].x < arr[j].x ? 1 : -1) * Math.abs(arr[i].radius * deltax / dist);
            var yi = (arr[i].y < arr[j].y ? 1 : -1) * Math.abs(arr[i].radius * deltay / dist);
            var xj = (arr[i].x < arr[j].x ? -1 : 1) * Math.abs(arr[j].radius * deltax / dist);
            var yj = (arr[i].y < arr[j].y ? -1 : 1) * Math.abs(arr[j].radius * deltay / dist);
            ctx.beginPath();
            ctx.moveTo(arr[i].x + xi, arr[i].y + yi);
            ctx.lineTo(arr[j].x + xj, arr[j].y + yj);
            var samecolor = arr[i].color == arr[j].color;
            ctx.strokeStyle = ["rgba(", arr[i].borderColor, ",", Math.min(arr[i].opacity, arr[j].opacity) * ((linkDist - dist) / linkDist), ")"].join("");
            ctx.lineWidth = (arr[i].background ? lineBorder * backgroundMlt : lineBorder) * ((linkDist - dist) / linkDist); //*((linkDist-dist)/linkDist);
            ctx.stroke();
            }
        }
        }
    }
    
    var startTime = Date.now();
    renderPoints(ctxfr, points);
    renderPoints(ctxbg, pointsBack);
    deltaT = Date.now() - startTime;
    
    ctxfr.restore();
    ctxbg.restore();
    
    window.requestAnimationFrame(justdraw);
}

// init();

// ==============================
// END OF GEOMETRY ANIMATION CODE

// START OF MAIN CODE
// ==================

// FUNCTIONS
// =========

// 30 sec timer function to auto decrement
function deductTimer(timeStart) {
    timeNow = new Date().getTime();
    // to get value of time to display
    value = [Math.floor((timeNow - timeStart) / 100000), (Math.floor(30 - (timeNow - timeStart) / 1000)), parseInt(Math.floor(999 - (timeNow - timeStart - 1) % 1000).toString().substr(0, 2))];
    // Adds 0 infront of digits less than 10.
    for (i in value) {
        if (value[i] < 10 && value[i] > 0) {
            value[i] = "0" + value[i].toString();
        } else if (value[i] == 0) {
            value[i] = "00";
        } else {
            value[i] = value[i].toString();
        };
    };;
    // sets timer
    $("#clockTimer").html(value[0] + ":" + value[1] + ":" + value[2]);
    // check if timer has ended or forced stopped
    if ((parseInt(value[0]) <= 0 && parseInt(value[1]) < 0) || timerEnded == true) {
        if (timerEnded == false) { // used to check more specifically if timer has ended prematurely. If it has, exit the function. If not, do run out of timer stuff
            selectedCorrectly = true;
            timerEnded = true;
            ranOutOfTime = true;
            $("#clockTimer").html("00:00:00");
            $("#animation" + correctId.toString()).animate({
                "backgroundColor": "rgba(0, 255, 0, 0.6)",
                "borderBottomColor": "rgba(0, 255, 0, 1)",
                "color": "white",
                "boxShadow": "0px 0px 6px 3px rgb(0, 255, 0)",
                "marginTop": "-5px",
                "fontWeight": "900"
            }, 200);
            $("#animation" + correctId.toString()).css({
                "textShadow": "0px 0px 8px rgb(255, 255, 255)"
            });
            $("#animation" + correctId.toString()).find(".canvas").animate({
                "opacity": "0.4"
            }, 100);
            $("#animation" + correctId.toString()).find(".canvasbg").animate({
                "opacity": "0.4"
            }, 100);
            for (let i = 1; i < 5; i++) {
                if (i != correctId) {
                    $("#animation" + i.toString()).animate({
                        "backgroundColor": "rgba(255, 0, 0, 0.6)",
                        "borderBottomColor": "rgba(255, 0, 0, 1)",
                        "color": "white",
                        "boxShadow": "0px 0px 6px 3px rgb(255, 0, 0)",
                        "marginTop": "-5px",
                        "fontWeight": "900"
                    }, 200);
                    $("#animation" + i.toString()).css({
                        "textShadow": "0px 0px 8px rgb(255, 255, 255)"
                    });
                    $("#animation" + i.toString()).find(".canvas").animate({
                        "opacity": "0.4"
                    }, 100);
                    $("#animation" + i.toString()).find(".canvasbg").animate({
                        "opacity": "0.4"
                    }, 100);
                };
            };
            $("#nextButton").animate({
                opacity: "1"
            }, 200);
            $("#nextButton").css({
                "cursor": "pointer"
            });
        } else {
            return
        };
    } else {
        // Requests for an update every 10 ms
        setTimeout(deductTimer, 10, timeStart);
    };
};

// helper function to start the timer function above
function startTimer() {
    $("#clockBarInner").animate({
        "width": "13px"
    }, {
        duration: 30000, 
        specialEasing: {
            width: "linear"
        }
    });
    $("#clockBarInnerDot").animate({
        "marginLeft": "-8px"
    }, {
        duration: 30000, 
        specialEasing: {
            marginLeft: "linear"
        }
    });
    timeNow = new Date().getTime();
    setTimeout(deductTimer, 10, timeNow);
};


// helper function to end the timer function above before it runs out
function timerEndEarly() {
    timerEnded = true;
    timerStarted = true;
    $("#clockBarInner, #clockBarInnerDot").stop();
};

// helper function to restart timer and start it
function restartTimer() {
    $("#clockBarInner").stop().animate({
        width: ($(window).width() * 0.95).toString() + "px"
    }, 1000);
    $("#clockBarInnerDot").stop().animate({
        marginLeft: ($(window).width() * 0.95 - 22).toString() + "px"
    }, 1000);
    $("#clockTimer").html("00:30:00");
    setTimeout(function() {
        timerEnded = false;
        timerStarted = true;
        startTimer();
    }, 2500);
};

// function to reset timer but NOT START IT
function resetTimer() {
    $("#clockBarInner").animate({
        width: ($(window).width() * 0.95).toString() + "px",
    }, 1000);
    $("#clockBarInnerDot").animate({
        marginLeft: ($(window).width() * 0.95 - 22).toString() + "px"
    }, 1000);
    $("#clockTimer").html("00:30:00");
    timerEnded = false;
    timerStarted = false;
};

// options hover event
function optionsHover(thisItem) {
    if (timerStarted == true && thisItem.css("background-color") != "rgba(255, 0, 0, 0.6)" && thisItem.css("background-color") != "rgba(0, 255, 0, 0.6)" && selectedCorrectly == false) {
        selectorTextColor = ["white", "white", "white", "white", "white"];
        thisItem.stop().animate({
            "backgroundColor": "rgba(" + teamColours[selector] + ", 0.9)",
            "boxShadow": "0px 0px 8px 3px rgb(" + teamColours[selector] + ")",
            "borderBottomColor": "rgb(" + teamColours[selector] + ")",
            "color": selectorTextColor[selector],
            "marginTop": "-5px",
            "fontWeight": "900"
        }, 100);
        thisItem.css({
            "textShadow": "0px 0px 8px rgb(255, 255, 255)"
        });
        thisItem.find(".canvas").animate({
            "opacity": "0.4"
        }, 100);
        thisItem.find(".canvasbg").animate({
            "opacity": "0.4"
        }, 100);
    };
};

// options when unhovered event
function optionsUnhover(thisItem) {
    if (timerStarted == true && thisItem.css("background-color") != "rgba(255, 0, 0, 0.6)" && thisItem.css("background-color") != "rgba(0, 255, 0, 0.6)" && selectedCorrectly == false) {
        thisItem.stop().animate({
            "backgroundColor": "rgba(255, 255, 255, 0.9)",
            "boxShadow": "0px 0px 2px 0px #aaaaaa",
            // "borderBottomColor": "rgba(255, 255, 255, 0)",
            "color": "black",
            "marginTop": "0px",
            "fontWeight": "100"
        }, 200);
        thisItem.find(".canvas").animate({
            "opacity": "0"
        }, 200);
        thisItem.find(".canvasbg").animate({
            "opacity": "0"
        }, 200);
    };
};

// function to reset css theme to orange
function resetThemeDefault() {
    colors = [teamColours[0]];
    bgColors = [teamColours[0]];
    $("#Question").animate({
        "borderBottomColor": "rgba(" + teamColours[0] + ", 1)",
    }, 200);
    $("#footer").animate({
        "borderTopColor": "rgba(" + teamColours[0] + ", 1)",
    }, 200);
    $("#clockBar").animate({
        borderColor: "rgba(" + teamColours[0] + ", 1)"
    }, 200);
    $("#clockBarInner, #clockBarInnerDot").stop().animate({
        backgroundColor: "rgba(" + teamColours[0] + ", 1)"
    }, 200);
    $("#clockTimer").animate({
        color: "rgba(" + teamColours[0] + ", 1)"
    }, 200);
};

// options when clicked
function optionsClicked(thisItem) {
    if (timerStarted == true && selector != 0 && selectedCorrectly == false) {
        eventItemId = parseInt(thisItem.attr("id").substr(9, 1));
        if (pressedOptions[eventItemId - 1] == false) {
            pressedOptions[eventItemId - 1] = true;
            if (eventItemId == correctId) {
                selectedCorrectly = true;
                thisItem.animate({
                    "backgroundColor": "rgba(0, 255, 0, 0.6)",
                    "borderBottomColor": "rgb(0, 255, 0)",
                    "color": "white",
                    "boxShadow": "0px 0px 6px 3px rgb(0, 255, 0)"
                }, 200);
                $("#nextButton").animate({
                    opacity: "1"
                }, 200);
                $("#nextButton").css({
                    "cursor": "pointer"
                });
            } else {
                selector = 0;
                thisItem.animate({
                    "backgroundColor": "rgba(255, 0, 0, 0.6)",
                    "borderBottomColor": "rgb(255, 0, 0)",
                    "color": "white",
                }, 0);
                thisItem.animate({ // idk why this can be with the previous line, probably just cause it needs a timer of more than 1?
                    "boxShadow": "0px 0px 6px 3px rgb(255, 0, 0)"
                }, 200);
                for (let i = 1; i < 5; i++) {
                    if ($("#animation" + i.toString()).css("border-bottom-color") == "rgb(255, 0, 0)" || $("#animation" + i.toString()).css("border-bottom-color") == "rgb(0, 255, 0)") {
                    } else {
                        $("#animation" + i.toString()).animate({
                            "borderBottomColor": "rgb(" + teamColours[0] + ")"
                        }, 200);
                    };
                };
                resetThemeDefault();
                setTimeout(function() {
                    restartTimer();
                }, 500);
            };
        };
    };
};

// checks for which team pressed the button first to answer
function checkForTeamPress(event) {
    if (selector == 0 && timerStarted == true && timerEnded == false) {
        var key = (event.keyCode ? event.keyCode : event.which);
        if (key == 81) { // "Q"
            selector = 1;
        } else if (key == 87) { // "W"
            selector = 2;
        } else if (key == 69) { // "E"
            selector = 3;
        } else if (key == 82) { // "R"
            selector = 4;
        };
        if (selector != 0 && pressedTeams[selector - 1] == false) { // to check if press is actually one of the 4 keys
            pressedTeams[selector - 1] = true;
            timerEndEarly();
            $("#Question").animate({
                "borderBottomColor": "rgba(" + teamColours[selector] + ", 1)",
            }, 200);
            $("#footer").animate({
                "borderTopColor": "rgba(" + teamColours[selector] + ", 1)",
            }, 200);
            for (let i = 1; i < 5; i++) {
                var con1 = false;
                var con2 = false;
                // checks for if the option has been clicked before to prevent changing
                if ($("#animation" + i.toString()).css("border-bottom-color") == "rgb(255, 0, 0)" || $("#animation" + i.toString()).css("border-bottom-color") == "rgb(0, 255, 0)") {
                } else {
                    con1 = true;
                };
                // checks if its being highlighted
                if ($("#animation" + i.toString()).css("background-color") == "rgba(255, 255, 255, 0.9)" || $("#animation" + i.toString()).css("background-color") == "rgba(255, 0, 0, 0.6)" || $("#animation" + i.toString()).css("background-color") == "rgba(0, 255, 0, 0.6)") {
                } else {
                    con2 = true;
                };
                if (con1 == true && con2 == true) { // needs to be this way to avoid queued animation
                    $("#animation" + i.toString()).animate({
                        "backgroundColor": "rgba(" + teamColours[selector] + ", 0.9)",
                        "borderBottomColor": "rgb(" + teamColours[selector] + ")",
                        "boxShadow": "0px 0px 8px 3px rgb(" + teamColours[selector] + ")"
                    }, 200);
                } else if (con1 == true) {
                    $("#animation" + i.toString()).animate({
                        "borderBottomColor": "rgb(" + teamColours[selector] + ")"
                    }, 200);
                };
            };
            colors = [teamColours[selector]];
            bgColors = [teamColours[selector]];
            $("#clockBar").animate({
                borderColor: "rgba(" + teamColours[selector] + ", 1)"
            }, 200);
            $("#clockBarInner, #clockBarInnerDot").stop().animate({
                backgroundColor: "rgba(" + teamColours[selector] + ", 1)"
            }, 200);
            $("#clockTimer").animate({
                color: "rgba(" + teamColours[selector] + ", 1)"
            }, 200);
        } else if (selector != 0) {
            selector = 0;
        };
    };
};

// function to animate fade in at question load
function optionsInitialAnimation(count) {
    if (count < 5) {
        $("#animation" + count.toString()).animate({
            "opacity": "1",
            "marginTop": "0px",
            "color": "black"
        }, 600);
        setTimeout(optionsInitialAnimation, 500, count + 1);
    } else {
        setTimeout(function() {
            $("#QuestionText").animate({
                "color": "white"
            }, 2750);
            setTimeout(function() {
                startTimer();
                timerStarted = true;
            }, 750);
        }, 1000);
    };
};

// helper function for initialisation
function initialLoadAnimations() {
    // setQuestionAndAnswers("Where was the last summit meeting between Kim Jong Un and Donald Trump?", "South Korea", "Singapore", "United States", "Vietnam", 1);
    randomiseAndSetQuestionFromList();
    if (allDisplayed == false) {
        $(".animation").css({
            cursor: "pointer"
        });
        optionsInitialAnimation(1);
    };
};

// function to execute when the "Next Question" button is clicked
function nextQuestionClicked() {
    $("#nextButton").animate({
        opacity: "0"
    }, 200);
    $("#nextButton").css({
        cursor: "default"
    });
    $(".animation").animate({
        opacity: "0",
        "borderBottomColor": "rgb(" + teamColours[0] + ")"
    }, 200);
    $(".animation").css({
        cursor: "default",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0px 0px 2px 0px #aaaaaa"
    });
    $("#QuestionText").animate({
        color: "transparent"
    }, 200);
    if (displayedQuestions.length > (parseInt($("#questionNumber").html().trim().substr(9, 1)))) {
        $("#questionNumber").html("Question " + (parseInt($("#questionNumber").html().trim().substr(9, 1)) + 1).toString());
    };
    // reinitialising all global variables that is reused in every new question
    resetThemeDefault();
    resetTimer();
    ranOutOfTime = false;
    selectedCorrectly = false;
    selector = 0;
    pressedTeams = [false, false, false, false];
    pressedOptions = [false, false, false, false];
    setTimeout(initialLoadAnimations, 3000);
};

// function to randomise given Q&A and set it into the HTML document
function setQuestionAndAnswers(topic, question, a1, a2, a3, a4) { // always pass the correct answer in as a4
    newAnswers = [0, 0, 0, 0];
    answers = [a1, a2, a3, a4]
    for (let i = 0; i < 4; i++) {
        while (true) {
            newAnswers[i] = Math.floor(Math.random() * 4);
            toContinue = false;
            for (let j = 0; j < i; j++) {
                if (newAnswers[j] == newAnswers[i]) {
                    toContinue = true;
                    break;
                };
            };
            if (toContinue == true) {
                continue
            };
            break;
        };
        if (newAnswers[i] + 1 == 4) {
            correctId = i + 1;
        };
        $("#answerOptions" + (i + 1).toString()).html(answers[newAnswers[i]]);
    };
    $("#QuestionText").html(question);
};

// function to read CSV file of questions and save it into global variables
function readQuestions() {
    $.ajax({
        type: "GET",
        url: "questions.csv",
        dataType: "text",
        success: function(data) {
            var allTextLines = data.split(/\r\n|\n/);
            var lines = [];
            for (var i = 1; i < allTextLines.length; i++) {
                var lineData = allTextLines[i].split('|');
                lines.push(lineData);
            };
            for (i in lines) {
                questions.push(lines[i]);
                displayedQuestions.push(false);
            };
            csvFileReadFinished = true;
        }
    });
};

// function to randomise from the question list, and calls a previous function to insert that randomised question into the HTML document
function randomiseAndSetQuestionFromList() {
    if (csvFileReadFinished == false) {
        setTimeout(randomiseAndSetQuestionFromList, 1000);
    } else {
        allDisplayed = true;
        for (i in displayedQuestions) {
            if (displayedQuestions[i] == false) {
                allDisplayed = false;
                break;
            };
        };
        if (allDisplayed == false) {
            while (true) {
                var index = Math.floor(Math.random() * questions.length);
                if (displayedQuestions[index] == false) {
                    displayedQuestions[index] = true;
                    setQuestionAndAnswers(questions[index][0], questions[index][1], questions[index][2], questions[index][3], questions[index][4], questions[index][5]);
                    break;
                };
            };
        } else {
            return;
        };
    };
};

// ================
// END OF FUNCTIONS


// VARIABLES
// =========

var correctId = 1;
var selector = 0;
var timerStarted = false;
var timerEnded = false;
var selectedCorrectly = false;
var ranOutOfTime = false;
var allDisplayed = false;
var teamColours = ["251, 163, 66", "255, 1, 0", "147, 0, 232", "0, 189, 0", "0, 191, 255"]; // DO NOT USE "255, 0, 0" OR "0, 255, 0" IN ANY OF THE COLOURS
var colors = ["251, 163, 66"];
var bgColors = ["251, 163, 66"];
var pressedTeams = [false, false, false, false];
var pressedOptions = [false, false, false, false];
var questions = [];
var displayedQuestions = [];
var csvFileReadFinished = false;

// ================
// END OF VARIABLES


// START OF DOCUMENT READY CODE
// ============================

$(document).ready(function() {

    // READS ALL QUESTIONS FROM CSV FILE FIRST AS THIS MAY TAKE SOME TIME
    readQuestions();
    console.log("a");

    // SETS BACKGROUND GEOMETRY ANIMATION SIZE
    document.getElementById('canvas-1').width = $(window).width();
    document.getElementById('canvas-1').height = $(window).height();

    // 4 OPTIONS ANIMATION HOVER EVENT
    $(".animation").hover(function() {
        optionsHover($(this));
    }, function() {
        optionsUnhover($(this));
    });

    // 4 OPTIONS CLICK EVENT
    $(".animation").click(function() {
        optionsClicked($(this));
    });

    // NEXT QUESTION CLICKED
    $("#nextButton").click(function() {
        if (selectedCorrectly == true || ranOutOfTime == true) {
            nextQuestionClicked();
        };
    });
    
    // CHECK KEYPRESS FOR WHICH GROUP WHO PRESSED FIRST
    $(document).keydown(function(event) {
        checkForTeamPress(event);
    });

    // STARTS GEOMETRY ANIMATION
    window.requestAnimationFrame(justdraw);

    // FADES IN OPTIONS AND QUESTION + STARTS TIMER
    setTimeout(initialLoadAnimations, 2000);
});

// ==========================
// END OF DOCUMENT READY CODE

/*Credits and aknowledgements:

Original Application made by Poh Jun Kang of Class 19S23

Background Geometry Animation Original Idea and Design by Luca Luzzatti
Background Geometry Animation Optimizing tips from Benjamin Kästner
Background Geometry Animation General tips from Salvatore Previti*/