var form = new FormData();
var settings = {
  "url": "https://api.bikeradar.io/bikes?lat=-33.913948&lng=151.20466090000002&providers=OFO",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "X-API-KEY": "your-api-key-here"
  },
  "processData": false,
  "mimeType": "multipart/form-data",
  "contentType": false,
  "data": form
};

$.ajax(settings).done(function (response) {
  console.log(response);
});