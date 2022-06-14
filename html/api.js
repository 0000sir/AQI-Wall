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

    updated_at = data['data']['time']['s'].substring(11,19);

    city = data['data']['city']['name'];
    city_name_start = city.indexOf('\(');
    city_name = city.substring(city_name_start+1, city.length-1);

    source = data['data']['attributions'][0]['name'];
    source = source.substring(source.indexOf('\(')+1, source.length-1);
    //set_bg(aqi_color(avg_aqi));
    show_aqi(avg_aqi, updated_at, city_name, source);
  });
}

function read_weather(city){
  var weather;
  $.get('/weather/now?key=a2cefdbe177a4dfd961eb841b66d667c&location='+city, function(data){
    weather = data.now;
    $('.weather').text(weather.text);
    $('.wind').text( weather.windDir + weather.windScale+ '级' );
    $('.temperature').text(weather.temp+'℃');
    $('.humidity').text("相对湿度"+weather.humidity+"%");
  });
  return weather;
}

function read_forcast(city){
  var forcast;
  $.get('/weather/3d?key=a2cefdbe177a4dfd961eb841b66d667c&location='+city, function(data){
    forcast = data.daily;
    $('#future').text('');
    for(var day=0; day<forcast.length;day++){
      cast = forcast[day];
      $('#future').append("<div class=\"column\"><div class=\"date\">"+cast.fxDate+
        "</div><div class=\"temperature\">"+cast.tempMin+'~'+cast.tempMax+"℃"+
        "</div><div class=\"weather\">"+cast.textDay+'-'+cast.textNight+
        "</div><div class=\"windp\">"+cast.windDirDay+cast.windScaleDay+"</div></div>");
    }
  })
}

function show_aqi(aqi, updated_at, city){
  $("#aqi .value").text(aqi);
  if(aqi == '-'){
    $('body').attr("class", "aqi_normal");
    $("#aqi .quality").text("无数据");
  }else if(aqi<51){
    $("#aqi .quality").text("优");
  }else if(aqi < 101){
    $("#aqi .quality").text("良");
  }else if(aqi < 151){
    $("#aqi .quality").text("轻度污染");
  }else if(aqi < 201){
    $("#aqi .quality").text("中度污染");
  }else if(aqi < 301){
    $("#aqi .quality").text("重度污染");
  }else{
    $("#aqi .quality").text("有毒");
  }
  // set_bg(aqi_color(avg_aqi));

  $("#aqi .time").text(updated_at + " 更新");
  $("#aqi .location").text(city);
  $("#aqi .source").text(source);
}

function load_shici(){
  jinrishici.load(function(result) {
    // 自己的处理逻辑
    var sentence = document.querySelector("#shici_sentence");
    sentence.innerHTML = result.data.content;
    var author = document.querySelector("#shici_author");
    author.innerHTML = result.data.origin.dynasty + " · " + result.data.origin.author + "《"+ result.data.origin.title+"》";
    var full = document.querySelector("#shici #full_content");
    full.innerHTML = "<p class=\"center big-text\">《"+ result.data.origin.title+"》</p>" +
      "<p class=\"center\">"+ result.data.origin.dynasty + " · " + result.data.origin.author + "</p>" +
      "<p><br>"+result.data.origin.content.join("") + "</p>";
  });
}

function fa (j) {
  if(j<10){
    return '0'+j;
  }
  else{
    return j;
  }
}


function clock(){
  var x=new Date();
  var utc8DiffMinutes = x.getTimezoneOffset() + 480
  x.setMinutes(x.getMinutes() + utc8DiffMinutes)
  y=x.getFullYear();
  m=x.getMonth()+1;
  d=x.getDate();
  r=x.getDay();
  h=x.getHours();
  f=x.getMinutes();
  s=x.getSeconds();
  ar=['日','一','二','三','四','五','六'];
  w=ar[r];
  time=y+'-'+m+'-'+d+ '   周' + w + '   '+fa(h)+':'+fa(f);
  document.getElementById("date").innerHTML= time;
}

function aqi_color(aqi){
  var r = 0;
  var g = 255;
  var b = 0;

  if(aqi=="-"){
    return [204,204,150];
  }
  
  g = Math.pow(0.99,aqi)*255;
  if(aqi<=200){
    r = Math.pow(aqi,0.25)*50;
    b = 0;
  }else{
    r = Math.pow(0.99,(aqi-200))*200;
    b = Math.pow(0.995,(aqi-200))*200;
  }
  return [Math.round(r),Math.round(g),Math.round(b)];
}

function set_bg(arr_r_g_b){
  $("body").css("background-color","rgb("+arr_r_g_b.join(",")+")");
}

function color_test(){
  for(i=1;i<600;i++){
    $("body").append("<div style='width:100px;height:5px;background-color:rgb("+aqi_color(i).join(",")+");'></div>");
  }
}