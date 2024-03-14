
//On créer une requête pour récupérer la ville dans le fichier conf.json
let requestUrl = "/conf.json"
let request = new XMLHttpRequest();
request.open("GET", requestUrl);
request.responseType = "json";
request.send();

//1 min en millisecondes
let i = 60000;
//L'intervalle d'update en minutes
let n = 60;

//On lance fait une requête toute les heures
setInterval(request.onload = function () {
   const ville = request.response.city;
   fetchMeteo(ville);
   console.log(ville)
 }, n*i)

 //On créer une requête vers l'API weatherAPI et on intègre les données à la page
async function fetchMeteo(ville) {

    try {
      
      const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=96793651afd74512b1c75727241403&q=${ville}&days=1&aqi=no&alerts=yes`)

//Création d'un message d'erreur si la requête n'aboutit pas
      if (!res.ok) {
        throw new Error("Could not find this city");
      }

      const data = await res.json();
      const temp = data.current.temp_c;
      const conditions = data.current.condition.text;
      const update = data.current.last_updated;
      const fetchIcon = data.current.condition.icon;
      const fetchHumidity = data.current.humidity;
      
      let titre = document.getElementById("titre");
      titre.textContent = `Weather in ${ville}` ;

      let temperature = document.getElementById("temperature");
      temperature.textContent = temp.toFixed(0) + "°C";
    
      let lastUpdate = document.getElementById("lastUpdate");
      lastUpdate.textContent = `Updated ${update}`;

      let humidity = document.getElementById("humidity");
      humidity.textContent = `Humidity: ${fetchHumidity}%`
      
      let icon = document.getElementById("icon");
      icon.src = fetchIcon;
      icon.alt = conditions;

//On attrappe le message d'erreur et on l'affiche
    } catch (error) {
      console.error(error);
    }

 }


