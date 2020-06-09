$(document).ready(function(){
    var geolocation=document.getElementById("location")
    

  

    var kelvin=document.getElementById("kel")
    var fahrenheit=document.getElementById("far")
    var celsius=document.getElementById("cel")
    var units="&units=imperial";
    celsius.addEventListener("click", function(){
        console.log("click")
        units="&units=metric";
        navigator.geolocation.getCurrentPosition(getWeather);
    })
    fahrenheit.addEventListener("click", function(){
        console.log("click")
        units="&units=imperial";
        navigator.geolocation.getCurrentPosition(getWeather);
    })
    kelvin.addEventListener("click", function(){
        console.log("click")
        units="";
        navigator.geolocation.getCurrentPosition(getWeather);
    })



    function getWeather(position){
        console.log(position)
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let API_KEY = '2eec2dbdcaba6e2f1c110b67cde1c0d3';
        let baseURL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}${units}`;
       console.log(baseURL)

        $.get(baseURL,function(res){
            let data = res.current;
            console.log(res)
            let temp = Math.floor(data.temp);
            let condition = data.weather[0].description;

            $('#temp-main').html(`${temp}°`);
            $('#condition').html(condition);
        })
        
    }

    getLocation();
})
