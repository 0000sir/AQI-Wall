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
    $("#aqi .time").text("更新时间 "+avg_aqi.time_point.substring(11,19));

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
  $.get('/weather/?app=weather.today&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json&weaid='+city, function(data){
    weather = data.result;
    $('.weather').append( "<img src="+ weather.weather_icon +">" );
    $('.weather').text(weather.weather_curr);
    $('.wind').text( weather.wind + weather.winp );
    $('.temperature').text(weather.temperature_curr);
    $('.weather_scope').text(weather.weather);
    $('.temperature_scope').text(weather.temperature);

  });
  return weather;
}

function weather_report(city){
  $.get('/weather/?app=weather.future&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json&weaid='+city, function(data){
    $('#future').text('');
    for(var day=1; day<data.result.length;day++){
      weather = data.result[day];
      $('#future').append("<li><div class=\"date\">"+weather.week+
        "</div><div class=\"temperature\">"+weather.temperature+
        "</div><div class=\"weather\">"+weather.weather+
        "</div><div class=\"windp\">"+weather.winp+"</div></li>");
    }
  });
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
  time=y+'-'+m+'-'+d+'日 '+'星期'+r+' '+fa(h)+':'+fa(f);
  $('#date').text(time);
}
