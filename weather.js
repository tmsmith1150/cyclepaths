$(document).ready(function(){
    function getLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getWeather);
        }else{
            alert("Geolocation not supported by this browser");
        }
    }
    function fToC(fahrenheit) 
    {
      var fTemp = fahrenheit;
      var fToCel = (fTemp - 32) * 5 / 9;
      var message = fTemp+'\xB0F is ' + fToCel + '\xB0C.';
        console.log(message);
    } 
    

    function getWeather(position){
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let API_KEY = '2eec2dbdcaba6e2f1c110b67cde1c0d3';
        let baseURL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}`;
       

        $.get(baseURL,function(res){
            let data = res.current;
            let temp = Math.floor(data.temp-220);
            let condition = data.weather[0].description;

            $('#temp-main').html(`${temp}°`);
            $('#condition').html(condition);
        })
        
    }

    getLocation();
})