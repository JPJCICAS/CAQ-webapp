$(document).ready(function() {

    var teamColours = ["#2b3d51", "#217fbc", "#00bd9d", "#673fb0", "#c25400", "#c20092"]

    $(".teamText").focus(function() {
        $(this).next().stop().animate({
            "marginTop": "-60px",
            "marginLeft": "10px"
        }, 200);
        $(this).next().css({
            "zIndex": "2"
        });
    });
    $(".teamText").focusout(function() {
        if ($(this).val() == "") {
            thisEntity = $(this)
            $(this).next().stop().animate({
                "marginTop": "-35px",
                "marginLeft": "20px"
            }, 200);
            setTimeout(function() {
                thisEntity.next().css({
                    "zIndex": "-1"
                });
            }, 100);
            $(this).stop().animate({
                "borderTopColor": "2px solid #000000",
                "borderBottomColor": "2px solid #000000",
                "borderLeftColor": "2px solid #000000",
                "borderRightColor": "2px solid #000000"
            }, 200);
        } else {
            $(this).stop().animate({
                "borderTopColor": "2px solid " + teamColours[parseInt($(this).next().html().substr(5, 1)) - 1],
                "borderBottomColor": "2px solid " + teamColours[parseInt($(this).next().html().substr(5, 1)) - 1],
                "borderLeftColor": "2px solid " + teamColours[parseInt($(this).next().html().substr(5, 1)) - 1],
                "borderRightColor": "2px solid " + teamColours[parseInt($(this).next().html().substr(5, 1)) - 1]
            }, 200);
        };
    });

    $("#submit").click(function() {
        var teamTextValid = true;
        var teamSize = 6;
        
        for (let i = 6; i > 0; i--) {

            if ($("#teamText" + String(i)).val() != "") {
                teamSize = i;
                break;
            };
            if (i == 1) {
                teamSize = 0;
            };

        };

        if (teamSize == 0) {
            teamTextValid = false;
            $("#teamText2, #teamText1").stop().animate({
                "borderTopColor": "2px solid #ff0000",
                "borderBottomColor": "2px solid #ff0000",
                "borderLeftColor": "2px solid #ff0000",
                "borderRightColor": "2px solid #ff0000"
            }, 200);
        } else if (teamSize == 1) {
            teamTextValid = false;
            $("#teamText2").stop().animate({
                "borderTopColor": "2px solid #ff0000",
                "borderBottomColor": "2px solid #ff0000",
                "borderLeftColor": "2px solid #ff0000",
                "borderRightColor": "2px solid #ff0000"
            }, 200);
        } else {
            for (let i = teamSize; i > 0; i--) {

                if ($("#teamText" + String(i)).val() == "") {
                    teamTextValid = false;
                    $("#teamText" + String(i)).stop().animate({
                        "borderTopColor": "2px solid #ff0000",
                        "borderBottomColor": "2px solid #ff0000",
                        "borderLeftColor": "2px solid #ff0000",
                        "borderRightColor": "2px solid #ff0000"
                    }, 200);
                };

            };
        };

        if (teamTextValid == false) {
            return;
        } else {
            window.location.replace(window.location.href.split("/")[0] + "main-quiz?t1=" + $("#teamText1").val() + "&t2=" + $("#teamText2").val() + "&t3=" + $("#teamText3").val() + "&t4=" + $("#teamText4").val() + "&t5=" + $("#teamText5").val() + "&t6=" + $("#teamText6").val() + "&correct=&questions=");
        };
    });
});