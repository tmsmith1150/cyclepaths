var cityName = "Charlotte, NC"
var incidentType = "theft"
var proxSquare = "100"

var queryUrl = "https://bikewise.org:443/api/v2/incidents?page=1&per_page=3&incident_type=" + incidentType + "&proximity=" + cityName +"&proximity_square="+ proxSquare   
var queryUrlTwo = "https://api.meetup.com/recommended/groups?zip=10021&fields=join_info"
$.ajax({
    url: queryUrl,
    method: "GET",
}).then( function(response) {
    console.log(response);
var incResponse = response.incidents;
incResponse.forEach( function(e) {
    console.log(e);
    incResponse.append("#");
});
});

$.ajax({
    url: queryUrlTwo,
    method: "GET",
}).then(function(response) {
    console.log(response)
});