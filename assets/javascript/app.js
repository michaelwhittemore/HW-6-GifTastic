
const APIkey = 'YsIQS9tT9zOUpVFsF5Uc97GlY3GJBVz8'
var topics = ['clouds', 'rain', 'trees', 'mountains', 'desert']

// make the buttons
function makeButtons() {
    $("#btn-area").empty();
    for (i in topics) {
        let buttonHolder = $("<button>")
        var topic = topics[i];
        buttonHolder.text(topic);
        buttonHolder.attr("data-topic", topic);
        $("#btn-area").append(buttonHolder);
    }
}
//this should trigger when the button is pressedd... but it doesn't
$("button").on("click",function(){
    alert("button");
})
//gets gifs with the selected topic
function getGifs(topic) {
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + APIkey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //empty the area before popluating with gifs
        $("#gif-area").empty();
        addGifs(response.data)
    })
}
//adds gifs from a array of objects
function addGifs(gifs) {
    for (i in gifs) {
        var currentGif = gifs[i]
        var rating = currentGif.rating;
        var gifBox = $("<div>");
        var gifGif = $("<img>");
        //gifGif holds the image itself and gifBox encapsulates everything
        gifGif.attr("src", currentGif.images.fixed_height_still.url);
        gifGif.attr("alt", currentGif.title);
        gifGif.attr("data-still", currentGif.images.fixed_height_still.url)
        gifGif.attr("data-animate", currentGif.images.fixed_height.url);
        gifGif.attr("data-state", "still")
        gifGif.addClass("gif")
        gifBox.append('<p> Rating: ' + rating + '</p>');
        gifBox.append(gifGif);
        $("#gif-area").append(gifBox);
    }
}
//this on click will animate or unanimate the gif
//this code is stolen directly from the pausing-gifs exercsie
$(".gif").on("click", function () {
    var state = $(this).attr("data-state")
    alert('asdasd') //testing
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", 'animate')
    }
    else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", 'still')
    }

});
makeButtons();

$("button").on("click", function () {
    getGifs($(this).attr("data-topic"))
})