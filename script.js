var cityNameEl = $("#grid-city");
var stateNameEl = $("#grid-state");
var radiusE1 = $("#grid-zip");
var submitButton = $("#submit");
var states = ["Select a State","Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri"," Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont", "Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
var incidents = ["Select an incident", "Theft", "Crash", "Hazard", "Unconfirmed", "Infrastructure Issue"]



//appending each state to the dropdown menu
states.forEach( element => {
    var stateOption = $("<option>");
    stateOption.text(element);
    $("#grid-state").append(stateOption);
});

//appending incident types to incident dropdown menu
incidents.forEach( element => {
    var incidentOption = $("<option>");
    incidentOption.text(element);
    $("#grid-incident").append(element);
});

//listens to button click and appends values of input fields and puts them into to api
submitButton.on("click", function(e) {
    event.preventDefault();
    var cityName = cityNameEl.val();
    localStorage.setItem(cityName)
    var stateName = stateNameEl.val();
    localStoarge.setItem(stateName)
    var radius = radiusE1.val();
        console.log(cityName);
        console.log(stateName);
        console.log(radius);

    var queryUrl = "https://bikewise.org:443/api/v2/incidents?page=1&per_page=4&incident_type=" + incidentE1 + "&proximity=" + cityName + stateName +"&proximity_square="+ radius
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then( function(response) {
        console.log(response);
        var incidentResponse = response.incidents;
    incidentResponse.forEach( element => {
        console.log(element);
        console.log(element.source.html_url)
        var divE1 = $("<div>");
        var imgE1 = $("<img>");
        var divE2 = $("<div>");
        var divE3 = $("<div>");
        var divE4 = $("<div>");
        var pE1 = $("<p>");
        var aE1 = $("<a>");
        var facebookUrl = "https://www.facebook.com/sharer/sharer.php?u=" + element.source.html_url + "&amp;src=sdkpreparse"
        divE1.addClass("bg-white max-w-sm rounded overflow-hidden shadow-lg");
        imgE1.addClass("w-full");
        divE2.addClass("px-6 py-4");
        divE3.addClass("font-bold text-xl mb-2");
        pE1.addClass("text-gray-700 text-base");
           $("#containerCard").append(divE1);
           $(divE1).append(imgE1);
/*if there is no image it gives a default "no image available" image*/
           if(element.media.image_url === null) {
               $(imgE1).attr("src", "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6")
           } else { $(imgE1).attr("src", element.media.image_url)
            };
           $(divE1).append(divE2);
           $(divE2).append(divE3);
           $(divE3).text(element.title);
           $(divE3).append(pE1);
/*if there is no description gives a default answer*/
           if(element.description === "") {
                $(pE1).text("Sorry, no description available.")
           } else {($(pE1).text(element.description))
            };
/*Build facebook share button*/
           $(pE1).append(divE4);
           $(divE4).addClass("fb-share-button");
           $(divE4).attr("data-href", element.source.html_url );
           $(divE4).attr("data-layout", "button");
           $(divE4).attr("data-size", "small");
           $(divE4).append(aE1);
           $(aE1).attr("target", "_blank");
           $(aE1).attr("href", facebookUrl);
           $(aE1).addClass("bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full");
           $(aE1).text("Share to Facebook");    
            
    });
    })
});




