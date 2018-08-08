$(document).ready(function(){
    // Adding click event listen listener to all buttons
    $("button").on("click", function() {
        // Grabbing and storing the data-animal property value from the button
        var movie = $(this).attr("data-movie");
  
        // Constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          movie + "&api_key=dc6zaTOxFJmzC&limit=2";
  
        // Performing an AJAX request with the queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After data comes back from the request
          .then(function(response) {
            console.log(queryURL);
  
            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
  
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
  
              // Creating and storing a div tag
              var movieDiv = $("<div>");
  
              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + results[i].rating);
  
              // Creating and storing an image tag
              var movieImage = $("<img>");
              // Setting the src attribute of the image to a property pulled off the result item
              movieImage.attr("src", results[i].images.fixed_height.url);
  
              // Appending the paragraph and image tag to the animalDiv
              movieDiv.append(p);
              movieDiv.append(movieImage);
  
              // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
              $("#gifs-appear-here").prepend(movieDiv);
            }
          });
      });
    
    //   // Function for dumping the JSON content for each button into the div
    //   function displayMovieGif() {

    //     var movie = $(this).attr("data-name");
    //     var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    //     $.ajax({
    //       url: queryURL,
    //       method: "GET"
    //     }).then(function(response) {
    //       $("#movies-view").text(JSON.stringify(response));
    //     });
    //   }
});