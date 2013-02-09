
var level = "document";
var polarity = "true";
var emotion = "true";
var spam = "true";
var intensity = "true";

$(document).ready(function () {
    console.log("ready");
    $('#conveyit').keyup(function () {
        console.log("conveyit");
        var text = $('#conveyit').val();
        var convey_uri = "http://www.rphh.org/ConveyAPI/php/convey.php?annotation.level=" + level + "&annotation.polarity=" + polarity + "&annotation.emotion=" + emotion + "&annotation.intensity=" + intensity + "&annotation.spam=" + spam + "&text=" + text + "&callback=?";
        //var convey_uri = "http://beta.conveyapi.com/analysis-engine/process?api_key=" + api_key + "&annotation.level=" + level + "&annotation.polarity=" + polarity + "&annotation.emotion=" + emotion + "&annotation.intensity=" + intensity + "&annotation.spam=" + spam + "&text=" + text + "&callback=?";
// TODO: limit access based on "limit_remaining"
        $.getJSON(convey_uri, function(data) {
					updateConvey(data);
					});
        console.log("conveyit: " + convey_uri);
    });

    updateConvey({"status":{"code":200, "limit_remaining":47, "limit_reset_in":49480}, "document":
        {"text":"", "annotations":{
            "polarity":{"value":"positive", "confidence":0.3333333333333333},
            "emotion":{"value":"joy", "confidence":0.125},
            "intensity":{"value":"none", "confidence":0.009029829339139745},
            "spam":{"value":"not spam", "confidence":0.4879249826495159}
        }}
    });
});

function updateConvey(data) {
    var polarity = data.document.annotations.polarity;
    var emotion = data.document.annotations.emotion;
    var spam = data.document.annotations.spam;
    var intensity = data.document.annotations.intensity;

    //console.log("json: " + polarity);

    $("#polarity").removeClass("positive negative neutral");
    $("#emotion").removeClass("joy trust fear surprise sadness disgust anger anticipation other");
    $("#spam").removeClass("spam notspam");
    $("#intensity").removeClass("low medium high none");

    $("#polarity").addClass(polarity.value); // positive, negative or neutral
    $("#emotion").addClass(emotion.value); // joy, trust, fear, surprise, sadness, disgust, anger, or anticipation
    $("#spam").addClass(spam.value.replace(" ", "")); // spam or not spam
    $("#intensity").addClass(intensity.value).text(intensity.value); // low, medium, or high, none
}




