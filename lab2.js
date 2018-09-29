
$(document).ready(function() {
$( "#cityField" ).keyup(function() {
  var url = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q="+$("#cityField").val();
$.getJSON(url,function(data) {
    var everything;
    everything = "<ul>";
    $.each(data, function(i,item) {
      everything += "<li> "+data[i].city;
    });
    everything += "</ul>";
    $("#txtHint").html(everything);
  })
  .done(function() { console.log('getJSON request succeeded!'); })
  .fail(function(jqXHR, textStatus, errorThrown) { 
    console.log('getJSON request failed! ' + textStatus); 
    console.log("incoming "+jqXHR.responseText);
  })
  .always(function() { console.log('getJSON request ended!');
  });
});
});

$("#weatherButton").click(function(e){
  var value = $("#cityField").val();
  console.log(value);
  e.preventDefault();
 $("#displayCity").text(value);
 var myurl= "https://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=53772929b809a7f92c87c2bfb0787265&q=";
  myurl += value;
  console.log(myurl);
  $.ajax({
    url : myurl,
    dataType : "json",
    success : function(parsed_json) {
            var location = parsed_json['name'];
            var weather = parsed_json['weather'][0]['main'];
            var temp = parsed_json['main']['temp'];
            var weather_icon = parsed_json['weather'][0]['icon'];
            var humidity = parsed_json['main']['humidity'];
            var temp_min = parsed_json['main']['temp_min'];
            var temp_max = parsed_json['main']['temp_max'];
            var wind_speed = parsed_json['wind']['speed'];
            everything = "<img src=\"http://openweathermap.org/img/w/" + weather_icon + ".png\"/>"
            everything += "<ul>";
            everything += "<li>Location: " + location;
            everything += "<li>Weather: " + weather + " (" + temp + "&#8457;)";
            everything += "<li>Low: " + temp_min + "&#8457; | High: " + temp_max + "&#8457;";
            everything += "<li>Humidity: " + humidity + "%";
            everything += "<li>Wind: " + wind_speed + " mph";
            everything += "</ul>";
            $("#weather").html(everything);
        }
  });
});


$(document).ready(function() {
 $("#searchButton").click(function(e){
  var value = $("#searchField").val();
  console.log(value);
  e.preventDefault();
   var myurl= "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle="
   myurl += value;
   myurl += "&site=stackoverflow";
  console.log(myurl);
  $.ajax({
    url : myurl,
    dataType : "json",
    success : function(parsed_json) {
      console.log(parsed_json);
      var items = parsed_json['items'];
      var everything = "<ul>";
       $.each(items, function(i,item) {
        everything += "<li> + <a href= \""
        everything += items[i].link;
        everything += "\">"
        everything += items[i].title;
        everything += "</a>";
        everything += "</li>";
       })
      everything += "</ul>";
      console.log(everything);
      $("#search").html(everything);
    }
  }) //ajax
}) //click function
}) //ready function


