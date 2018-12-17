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
  $.get('/aqi/'+ city+'/?token=01e7a36f4fc582977c68e8fde4429880f40fc98e', function(data){
    avg_aqi = 0;
    avg_aqi = data['data']['aqi'];
    console.log(avg_aqi);

    $("#aqi .value").text(avg_aqi);
    $("#aqi .time").text(data['data']['time']['s'].substring(11,19) + " 更新");
    city = data['data']['city']['name'];
    city_name_start = city.indexOf('\(');
    $("#aqi .location").text(city.substring(city_name_start+1, city.length-1));
    if(avg_aqi<51){
      $('body').attr("class", "aqi_good");
      $("#aqi .quality").text("优");
    }else if(avg_aqi < 101){
      $('body').attr("class", "aqi_normal");
      $("#aqi .quality").text("良");
    }else if(avg_aqi < 151){
      $('body').attr("class", "aqi_bad");
      $("#aqi .quality").text("轻度污染");
    }else if(avg_aqi < 201){
      $('body').attr("class", "aqi_harm");
      $("#aqi .quality").text("中度污染");
    }else if(avg_aqi < 301){
      $('body').attr("class", "aqi_harm");
      $("#aqi .quality").text("重度污染");
    }else{
      $('body').attr("class", "aqi_hell");
      $("#aqi .quality").text("有毒");
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
