$(document).ready(function(){

  var movies = ["Fargo", "A Most Violent Year", "Final Destination", "Death Proof"];

// Putting JSON content into div
  function displayMovieInfo() {

    var movie = $(this).attr("data-name");
    var apiKey = "YXKlM2pqymILAQdOMmhTbJgzRgr10uP5";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + movie + "&limit=6&offset=6&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#gifs-appear-here").html(response);
      var results = response.data

    // for loop on results
      for (var i = 0; i < results.length; i++) {
        
      // Creating and storing a movie div tag
        var movieDiv = $("<div class='card col-3'>");

      // This will show the gif rating & make vars for the gif movement
        var p = $("<p>").text("Rating: " + results[i].rating);
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

      // Creating and storing an image tag
        var movieImage = $("<img class='card-img-top' id='cool-gifs'>");

      // Setting the src attribute for movieImage
        movieImage.attr("src", still);
        movieImage.attr("data-still", still);
        movieImage.attr("data-animate", animated);
        movieImage.attr("data-state", "still");
        movieImage.addClass("movie-image");
        movieDiv.append(p);
        movieDiv.append(movieImage);
        $("#gifs-appear-here").append(movieDiv);
      }
    });

      $(document).on("click", ".movie-image", function() {

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
  }

// Function for displaying movie data
  function renderButtons() {

  // Deleting previously clicked buttons
    $("#movie-buttons").empty();

  // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {
      var a = $("<button class='btn btn-lg btn-block'>");
      a.addClass("movie");
      a.attr("data-name", movies[i]);
      a.text(movies[i]);
      $("#movie-buttons").append(a);
    }
  }

// This function handles events where one button is clicked
  $("#add-movie").on("click", function(event) {
    event.preventDefault();

  // if there's nothing in submit box then alert user
    if (!$("#movie-input").val() ){
      alert ("add a movie, dude!");
    } else {

  // if there is, then this grabs the input
    var movie = $("#movie-input").val().trim();

  // Adding the movie from the textbox to our array
    movies.push(movie);
    console.log(movies);

  // Calling renderButtons which handles the processing of our movie array
    renderButtons();

    }
    // event.preventDefault();

  });

     

// Function for displaying the movie info
// Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
  $(document).on("click", ".movie", displayMovieInfo);

// Calling the renderButtons function
  renderButtons();

});