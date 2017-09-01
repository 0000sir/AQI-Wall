function read_aqi(city){
  $.get('/api/querys/only_aqi.json?token=5j1znBVAsnSf5xQyNQyq&city='+ city, function(data){
    avg_aqi = data[data.length-1];
    console.log(avg_aqi);
    $("#aqi .quality").text(avg_aqi.quality);
    $("#aqi .value").text(avg_aqi.aqi);
    $("#aqi .time").text(avg_aqi.time_point);
  });
}

function read_weather(city){
  var weather;
  $.get('/weather/?app=weather.today&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json&weaid='+city, function(data){
    weather = data.result;
    $('#weather .weather').append( "<img src="+ weather.weather_icon +">" );
    $('#weather .weather').text(weather.weather_curr);
    $('#weather .wind').text( weather.wind + weather.winp );
    $('#weather .temperature').text(weather.temperature_curr);
    $('#weather .weather_scope').text(weather.weather);
    $('#weather .temperature_scope').text(weather.temperature);

  });
  return weather;
}
