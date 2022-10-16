var search = document.querySelector("#search");
var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months=["January","February","March","April","May","June","July","August","September","October","November","December"]




async function search1(city){
    var request= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=e8f93c602ebe46bfbaa05929221610&q=${city}&days=3`)
   console.log(request);
    if( request.status==200){
     var city = await request.json();
   
    getToday(city.location,city.current);
    getTomorrow(city.forecast.forecastday);
} 


}
search1("cairo");


search.addEventListener("blur",function(){
    search1(search.value);
    
})
function getToday(location,current){
    var date = new Date(current.last_updated);
    // console.log(days[date.getDay()]);
    var nowDate=date.getDate();
    var nowMonth=date.getMonth();
    var nowDay=date.getDay();

    let cartoona = `  
    <div class="col-md-4 ">
            <div class="header  px-2 py-2" >
                <div class="day float-start">${days[nowDay]}</div>
                <div class="date float-end ">${nowDate+" "+ months[nowMonth]}</div>
                <div class="clear"></div>
            
          </div>
          <div class="content  py-4 ps-2" >
          <div class="city">${location.name}</div> 
          <div>
          <span class="degree1">  ${current.temp_c}<sup>o</sup>C</span>
          <span class="icon ms-5 " > <img src="https:${current.condition.icon}"  alt=""></span>
         </div>
          <p class="text">${current.condition.text}</p>
          <span class="">
              <img src="assets/asset 1.png"  class="me-1" alt="">${current.humidity}
          </span>


          <span class="mx-2">
              <img src="assets/asset 2.png"class="me-1"  alt="">${current.wind_kph}km/h
          </span>

          <span class="" >
              <img src="assets/asset 3.png" class="me-1"  alt="">${current.wind_dir}
          </span>

          
        </div>
      </div>`


    document.getElementById("weather").innerHTML= cartoona;
    }
    
// tomorrow weather


function getTomorrow(forecast){
    let cartoona =""
    for(let i=0;i<forecast.length;i++){
     cartoona= ` 
     
     <div class="col-md-4  text-center  ">
     <div class="header2 py-2 ">
         <div class="day ">${days[new Date(forecast[i].date).getDay()]}</div>
   </div>
   <div class="content2 py-5">
     <div class="icon">
         <img src="https:${forecast[i].day.condition.icon}" class="img-fluid rounded-top" alt="">
     </div>
     <div class="degree2 mt-4">${forecast[i].day.maxtemp_c}<sup>o</sup>C</div>
     <small >${forecast[i].day.mintemp_c}  <sup>o</sup></small>
     <div class="text mt-4 pb-2">${forecast[i].day.condition.text}</div>
   </div>


 </div>
    `
    document.getElementById("weather").innerHTML+= cartoona;
    }
    }












