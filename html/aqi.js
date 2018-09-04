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

    $("#aqi .quality").text(avg_aqi.quality);
    $("#aqi .value").text(avg_aqi.aqi);
    $("#aqi .time").text(avg_aqi.time_point.substring(11,19) + " 更新");

    if(avg_aqi.aqi<51){
      $('body').attr("class", "aqi_good");
    }else if(avg_aqi.aqi < 101){
      $('body').attr("class", "aqi_normal");
    }else if(avg_aqi.aqi < 151){
      $('body').attr("class", "aqi_bad");
    }else if(avg_aqi.aqi < 201){
      $('body').attr("class", "aqi_harm");
    }else{
      $('body').attr("class", "aqi_hell");
    }
  });

}

function read_weather(city){
  var weather;
  $.get('/weather?key=a2cefdbe177a4dfd961eb841b66d667c&location='+city, function(data){
    weather = data.HeWeather6[0];
    console.log(weather);
    $('.weather').text(weather.now.cond_txt);
    $('.wind').text( weather.now.wind_dir + weather.now.wind_sc + '级' );
    $('.temperature').text(weather.now.tmp+'℃');
    $('.humidity').text("相对湿度"+weather.now.hum+"%");
    
    forcast = weather.daily_forecast;
    $('#future').text('');
    for(var day=0; day<forcast.length;day++){
      cast = forcast[day];
      $('#future').append("<li><div class=\"date\">"+cast.date+
        "</div><div class=\"temperature\">"+cast.tmp_min+'-'+cast.tmp_max+
        "</div><div class=\"weather\">"+cast.cond_txt_d+'-'+cast.cond_txt_n+
        "</div><div class=\"windp\">"+cast.wind_dir+cast.wind_sc+"</div></li>");
    }

  });
  return weather;
}

function clock(){
  var x=new Date();
  y=x.getFullYear();
  m=x.getMonth()+1;
  d=x.getDate();
  r=x.getDay();
  h=x.getHours();
  f=x.getMinutes();
  s=x.getSeconds();
  ar=['日','一','二','三','四','五','六'];
  var j;
  for(var i=0;i<ar.length;i++){
  	r=ar[i];
  }
  function fa (j) {
  if(j<10){
  	return '0'+j;
  }
  else{return j;}
  }
  time=y+'-'+m+'-'+d+' '+fa(h)+':'+fa(f);
  $('#date').text(time);
}
