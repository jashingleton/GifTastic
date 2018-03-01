$(document).ready(function() {
var topics = ["happy", "shrug", "confused", "ugh", "excited", "pouting", "lol", "tired", "animals", "yes", "no", "winning", "boom"];

// function to make buttons and add to page
  function addButtons() {
    $("#giphyButtons").empty();

    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass("buttonClass");
      a.attr("data-type", topics[i]);
      a.text(topics[i]);
      $("#giphyButtons").append(a);
    }

  }

  $(document).on("click", ".buttonClass", function() {
    $("#giphys").empty();
    $(".buttonClass").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=reaction&api_key=i78gOadWx9sMUMf0XoiR1kHnLaDpaUdt&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var reactionDiv = $("<div class=\"reactionItem\">");

        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        var reactionImage = $("<img>");
        reactionImage.attr("src", still);
        reactionImage.attr("data-still", still);
        reactionImage.attr("data-animate", animated);
        reactionImage.attr("data-state", "still");
        reactionImage.addClass("reaction-image");

        reactionDiv.append(p);
        reactionDiv.append(reactionImage);

        $("#giphys").append(reactionDiv);
      }
    });
  });

  $(document).on("click", ".reaction-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#submitTopic").on("click", function(event) {
    event.preventDefault();
    var newReaction = $("input").eq(0).val();

    if (newReaction.length > 2) {
      topics.push(newReaction);
    }

    addButtons(topics, "reaction-image", "#giphyButtons");

  });

  addButtons(topics, "reaction-image", "#giphyButtons");
});

        

