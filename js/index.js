'use strict'
let weatherForcast =[];
let search = document.querySelector('#search')
async function weatherData(city){
    let waviy = document.querySelector('.w-75 .loader')
    let row =document.querySelector('.w-75 .row')
    waviy.classList.remove('d-none');
    row.classList.toggle('d-none');
    if(city){
        const data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0da0cc2100c8428695921344240101&q=${city}&days=3`);
        const result =await data.json();
        weatherForcast = result.forecast.forecastday;
    let cartona =''
    for(let i = 0; i < weatherForcast.length; i++) {
        cartona +=`
        <div class="col-lg-4 ">
        <div class="cardContainer w-100">
            <div class="card w-100">
                <p class="city text-capitalize text-muted lead fs-3">${city}</p>
                <p class="weather text-capitalize">${weatherForcast[i].day.condition.text}</p>
                <div class="d-flex w-100 justify-content-around align-item-center"> <p class="text-center fs-4  text-info lead">${getDayName(weatherForcast[i].date)[0]}</p> <p class="lead fs-4 text-info">${getDayName(weatherForcast[i].date)[1] +' '+ getDayName(weatherForcast[i].date)[2]}</p></div>
                <img src="https:${weatherForcast[i].day.condition.icon}" class="my-0 mx-auto rounded-circle" " alt="">
                <p class="temp">${weatherForcast[i].day.avgtemp_c+'°'}</p>
                <div class="minmaxContainer">
                    <div class="min">
                        <p class="minHeading">Min</p>
                        <p class="minTemp">${weatherForcast[i].day.mintemp_c + '°'}</p>
                    </div>
                    <div class="max">
                        <p class="maxHeading">Max</p>
                        <p class="maxTemp">${weatherForcast[i].day.maxtemp_c + '°'}</p>
                    </div>
                </div>
            </div>
        </div>                              
    </div>
        `
    }       
    waviy.classList.add('d-none');
    row.innerHTML = cartona;
    row.classList.toggle('d-none');
    }
}
search.addEventListener('input',async function(eventInfo){
    
    if(Array.from(this.value).length > 3){
        const data = await fetch(`https://api.weatherapi.com/v1/search.json?key=0da0cc2100c8428695921344240101&q=${this.value}`);
        const result = await data.json();
        let back = result[0].name;
        if(back){
            weatherData(back)
        }
    }
})
function getDayName(dateString) {
    const dateObject = new Date(dateString);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const dayOfWeek = dateObject.getDay();
    const dayName = daysOfWeek[dayOfWeek];
    const dayNumber = dateObject.getDate();
    const monthIndex = dateObject.getMonth();
    const monthName = months[monthIndex];
    let data =[dayName , dayNumber , monthName];
    return data;
}
async function getId(ip){
    let id =await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=59fd8a190e8244f5a16b4864c0ae9e0e&ip_address=${ip}`)
    let data = await id.json()
    weatherData(data.city)
    console.log(data.city);
}
const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-example'
})
async function getipAddress(){
fetch('https://api64.ipify.org?format=json')
.then(response => response.json())
.then(data => {
    const userIP = data.ip;
    console.log('User IP Address:', userIP);
getId(userIP)
})
.catch(error => console.error('Error fetching IP address:', error));

}
getipAddress()