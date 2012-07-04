const api_key = "XXX";
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
        var convey_uri = "http://beta.conveyapi.com/analysis-engine/process?api_key=" + api_key + "&annotation.level=" + level + "&annotation.polarity=" + polarity + "&annotation.emotion=" + emotion + "&annotation.intensity=" + intensity + "&annotation.spam=" + spam + "&text=" + text + "&callback=?";
// TODO: limit access based on "limit_remaining"
        $.getJSON(convey_uri, updateConvey);
        console.log("conveyit: " + convey_uri);
    });

    updateConvey({"status":{"code":200, "limit_remaining":47, "limit_reset_in":49480}, "documents":[
        {"text":"eoao", "annotations":{
            "polarity":{"value":"negative", "confidence":0.3333333333333333},
            "emotion":{"value":"anger", "confidence":0.125},
            "intensity":{"value":"none", "confidence":0.009029829339139745},
            "spam":{"value":"not spam", "confidence":0.4879249826495159}
        }}
    ]});
});

function updateConvey(data) {
    var polarity = data.documents[0].annotations.polarity.value;
    var emotion = data.documents[0].annotations.emotion.value;
    var spam = data.documents[0].annotations.spam.value;
    var intensity = data.documents[0].annotations.intensity.value;

    console.log("json: " + polarity);
    $("#polarity").addClass(polarity).text(polarity); // positive, negative or neutral
    $("#emotion").addClass(emotion).text(emotion); // joy, trust, fear, surprise, sadness, disgust, anger, or anticipation
    $("#spam").addClass(spam).text(spam); // spam or not spam
    $("#intensity").addClass(intensity).text(intensity); // low, medium, or high, none
}




