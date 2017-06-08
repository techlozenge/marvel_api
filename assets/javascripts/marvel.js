(function(){

  //jQuery equivelent to window.onload = function{}
  $(function(){


    // NOTE: Obtains the starts-with characters and calls the getStartsWith function
    $("#submit").click(function(){
      getStartsWith();
    }) // end click event


    // NOTE: resets screen back to 100 characters
    $("#refresh").click(function(){
      // clear the prior table
      $('#dynamictable').empty();
      getCharacters();
    }) // end click event


    // NOTE: When the name link is clicked the getSingleName functional is call for that character
    $( "#dynamictable" ).delegate( "#nameclick", "click", function() {
      getSingleName( $(this).text() );
    });


    // NOTE: This will retrieve 100 characters
    function getCharacters() {
      // start building our initial table of 100 names
      $('#dynamictable').append('<table></table>');
      var table = $('#dynamictable').children();
      table.append("<tr><th>Image</th><th>Character Name</th><th>Description</th></tr>");
      // NOTE: Limit is set to 100 in our API call
      $.get( "http://gateway.marvel.com/v1/public/characters?limit=100&ts=1&apikey=8e772030b79a222c38c4d89b084bcfa2&hash=0ccab67d6d383dd5d750b361a4cbca17", function( data ) {
        var result = data.data.results;
        $.each(result, function(index, value) {
          let image = '<img src="' + value.thumbnail.path + "." + value.thumbnail.extension + '">';
          table.append("<tr><td>" + image + "+</td><td id='nameclick'><a href='#'>" + value.name + "</a></td>" + "<td>" + value.description + "</td></tr>");
        }) // end each
      }); // end get
    } // end getCharacters


    // NOTE: This builds a table of those characters whose name begins with the specified characters
    function getStartsWith() {
      // clear the prior table
      $('#dynamictable').empty();
        // start building our new nameStartsWith table
        $('#dynamictable').append('<table></table>');
        var table = $('#dynamictable').children();
        table.append("<tr><th>Image</th><th>Character Name</th><th>Description</th></tr>");
        // NOTE: Limit is set to 100 in our API call
        // NOTE: Startswith is pulled from page textbox
        $.get( 'http:gateway.marvel.com/v1/public/characters?limit=100&nameStartsWith=' + $("#startswith").val() + '&ts=1&apikey=8e772030b79a222c38c4d89b084bcfa2&hash=0ccab67d6d383dd5d750b361a4cbca17', function( data ) {
          var result = data.data.results;
          if (result.length == 0) {
            table.append("<tr><td></td><td>RESULT SET IS EMPTY. PLEASE TRY AGAIN.</td><td></td></tr>");
            return true;
          }
          $.each(result, function(index, value) {
            let image = '<img src="' + value.thumbnail.path + "." + value.thumbnail.extension + '">';
            table.append("<tr><td>" + image + "+</td><td id='nameclick'><a href='#'>" + value.name + "</a></td>" + "<td>" + value.description + "</td></tr>");
          }) // end each
        }); // end get
    } // end getStartsWith()


    // NOTE: This function obtains a single name & its events
    function getSingleName(singlename) {
      // clear the prior table
      $('#dynamictable').empty();
      // start building our new nameStartsWith table
      $('#dynamictable').append('<table></table>');
      var table = $('#dynamictable').children();
      table.append("<tr><th>Image</th><th>Character Name</th><th>Events</th></tr>");
      // NOTE: Name obtained from clicked name link and identified via delegate and global 'this'
      $.get( 'http:gateway.marvel.com/v1/public/characters?&name=' + singlename + '&ts=1&apikey=8e772030b79a222c38c4d89b084bcfa2&hash=0ccab67d6d383dd5d750b361a4cbca17', function( data ) {
        // NOTE: This could also be data.data.results[i] but I thought this might be a bit easier to read
        var result = data.data.results;
        if (result.length == 0) {
          table.append("<tr><td></td><td>RESULT SET IS EMPTY. PLEASE TRY AGAIN.</td><td></td></tr>");
          return true;
        }
        $.each(result, function(index, value) {
          let image = '<img src="' + value.thumbnail.path + "." + value.thumbnail.extension + '">';
          console.log("Available: " + value.events.available + " " + "Events for " + singlename + "...");
          str = "Available: " + value.events.available + " " + "Events for " + singlename + "...<br><br>";
          for (let i = 0; i < value.events.available && i < 5; i++) {
            str = str + value.events.items[i].name + "  " + "<a href='" + value.events.items[i].resourceURI +  "'</a><br>";
          }
          table.append("<tr><td>" + image + "</td><td id='nameclick'><a href='#'>" + value.name + "</a></td>" + "<td>" + str + "</td></tr>");
        }) // end each
      }); // end get
    } // end getSingleName()


    // NOTE: style heading and body TODO: Move into CSS stylesheet
    $("#body").css("background-color","lightgray");
    $("#body").css("font-size", "34");
    $("#page-heading").html("Marvel Characters");
    // style text box
    $("#startswith").css("width", "30%");
    $("#startswith").css("padding", "12px 20px");
    $("#startswith").css("margin", "0px 0");
    $("#startswith").css("box-sizing", "border-box");
    // style submit and refresh buttons
    $("#submit").css("font-size", "15px");
    $("#submit").css("background-color", "black");
    $("#submit").css("color", "white");
    $("#refresh").css("font-size", "15px");
    $("#refresh").css("background-color", "black");
    $("#refresh").css("color", "white");

    // NOTE: Build our initial page table of 100 characters
    getCharacters();

  }) // end page load
})(); // end
