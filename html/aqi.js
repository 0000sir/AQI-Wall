/*
AQI standers

0-50
51-100
101-150
151-200
201-300
>300
*/

function read_aqi(city){
  $.get('/api/querys/only_aqi.json?token=5j1znBVAsnSf5xQyNQyq&city='+ city, function(data){
    avg_aqi = data[data.length-1];
    console.log(avg_aqi);
    $("#aqi .quality").text(avg_aqi.quality);
    $("#aqi .value").text(avg_aqi.aqi);
    $("#aqi .time").text(avg_aqi.time_point);

    if(avg_aqi.aqi<51){
      $('body').attr("className", "aqi_good");
    }else if(avg_aqi.aqi < 101){
      $('body').attr("className", "aqi_normal");
    }else if(avg_aqi.aqi < 151){
      $('body').attr("className", "aqi_bad");
    }else if(avg_aqi.aqi < 201){
      $('body').attr("className", "aqi_harm");
    }else{
      $('body').attr("className", "aqi_hell");
    }
  });

}

function read_weather(city){
  var weather;
  $.get('/weather/?app=weather.today&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json&weaid='+city, function(data){
    weather = data.result;
    $('#date').text(weather.days + "  " + weather.week)
    $('.weather').append( "<img src="+ weather.weather_icon +">" );
    $('.weather').text(weather.weather_curr);
    $('.wind').text( weather.wind + weather.winp );
    $('.temperature').text(weather.temperature_curr);
    $('.weather_scope').text(weather.weather);
    $('.temperature_scope').text(weather.temperature);

  });
  return weather;
}
