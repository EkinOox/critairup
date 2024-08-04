const button1 = document.querySelector("#buttongeolocalisation");
const test = document.querySelector("#test");
const dt1 = new Date();
const year1 = dt1.getUTCFullYear();
const month1 = String(dt1.getMonth() + 1).padStart(2, '0');
const day1 = String(dt1.getDate() - 1).padStart(2, '0');
const yesterday1 = `${year1}-${month1}-${day1}`;
let hpCity = [];

function barChart(codeInsee) {
    const selectedCity = hpCity.find((cityData) => {
        return cityData.insee === codeInsee;
    });
    console.log(selectedCity);
    if (selectedCity) {
        var data = [{
            values: [
                selectedCity.bulletins[0]["valeurs"][2]["no2"]["valeur"],
                selectedCity.bulletins[0]["valeurs"][2]["o3"]["valeur"],
                selectedCity.bulletins[0]["valeurs"][2]["pm10"]["valeur"],
                selectedCity.bulletins[0]["valeurs"][2]["so2"]["valeur"]
            ],
            labels: [
                "no2 " + selectedCity.bulletins[0]["valeurs"][2]["no2"]["qualificatif"],
                'o3 ' + selectedCity.bulletins[0]["valeurs"][2]["o3"]["qualificatif"],
                'pm10 ' + selectedCity.bulletins[0]["valeurs"][2]["pm10"]["qualificatif"],
                'so2 ' + selectedCity.bulletins[0]["valeurs"][2]["so2"]["qualificatif"]
            ],
            textinfo: "label",
            type: 'pie',
            hole: .4,
            marker: {
                colors: [
                    selectedCity.bulletins[0]["valeurs"][2]["no2"]["couleur"],
                    selectedCity.bulletins[0]["valeurs"][2]["o3"]["couleur"],
                    selectedCity.bulletins[0]["valeurs"][2]["pm10"]["couleur"],
                    selectedCity.bulletins[0]["valeurs"][2]["so2"]["couleur"]
                ]
            },
        }];

        var layout = {
            title: 'Indices des polluants présent <br> le ' + selectedCity.bulletins[0]["valeurs"][2]["date_echeance"],
            height: 400,
            width: 500,
            showlegend: false,
            annotations: [{
                font: {
                    size: 20
                },
                showarrow: false,
                text: '  ',
                x: 0.17,
                y: 0.5
            }],
        };

        document.getElementById("cta").style.display = "none";
        Plotly.newPlot('myDiv', data, layout);
    } else {
        console.error("Aucune ville trouvée avec le code INSEE spécifié");
    }
}
//début fonction Popup 
$ = function (id) {
    return document.getElementById(id);
}

var show = function (id) {
    $(id).style.display = 'block';
}
var hide = function (id) {
    $(id).style.display = 'none';
}
//Fin fonction Popup
// Fonction pour récupérer le JSON
async function getJsonData() {
    const response = await fetch("./assets/js/code_postal.json");
    return await response.json();
}

async function fetchPollutionData() {
    const jsonData = await getJsonData();
    const onSuccess = async (position) => {
        console.log("La géolocalisation a réussi !");
        test.innerHTML = "</br><p>Détection de votre emplacement... </br>(Veuillez patienter quelques instants, cela peut prendre plus d'une minute)";
        const { latitude, longitude } = position.coords;
        const res = await fetch(`https://api.atmosud.org/iqa2021/commune/bulletin/journalier?format_indice=couleur,qualificatif,valeur&indice=all&format=json&srid=2154&date_diff_min=${yesterday1}`);
        hpCity = await res.json();

        const locationRes = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=e228ae2eaf8f4751afb78f864bdf52ea`);
        const locationData = await locationRes.json();
        const { components: { postcode } } = locationData.results[0];

        for (const cityData of hpCity) {
            for (const detail of jsonData) {
                if (cityData.insee == detail.fields.insee_com) {
                    const cp_ville = detail.fields.postal_code;
                    if (cp_ville == postcode) {
                        test.innerHTML = `<br><br>
                            <li class="character">
                                <div class="col-lg-4 col-md-12 col-sm-12" style="margin: auto; text-align: center;">
                                    <h2>${cityData.commune}</h2>
                                    <p style="color: #0000006e;"><strong>${cityData.insee}</strong></br>
                                    Date de diffusion : ${cityData.bulletins[0]["valeurs"][2]["date_echeance"]}</br>
                                    Les polluants les plus présents aujourd'hui : ${cityData.bulletins[0]["valeurs"][2]["majoritaire"][0]}</p>                    
                                    <button style="margin-bottom: 5%;
                                    border: 2px solid #1f2029;
                                    background-color: #1f2029;
                                    font-size: 15px;
                                    text-transform: uppercase;
                                    color: #fff;
                                    width: 50%;
                                    grid-area: btn;
                                    border-radius: 5px;" onclick="show('popup1')"> J+1 </button>
                                    <div class="popup" id="popup1">
                                        <h2>${cityData.commune}</h2>
                                            <p>Date de diffusion : ${cityData.bulletins[0]["valeurs"][1]["date_echeance"]}</p>
                                            <p>Les polluants les plus présents ce jour : ${cityData.bulletins[0]["valeurs"][1]["majoritaire"][0]}</p>
                                            <div class="blob" style="background-color:${cityData.bulletins[0]["valeurs"][1]["indice"]["couleur"]}"></div>
                                        <div class="blob-txt" style="color:${cityData.bulletins[0]["valeurs"][1]["indice"]["couleur"]};margin-top: -2em;">${cityData.bulletins[0]["valeurs"][1]["indice"]["qualificatif"]}<a href="#" onclick="hide('popup1')"><br>Ok!</a></div>
                                    </div>
                                    <br>
                                    <button style="margin-bottom: 5%;
                                    border: 2px solid #1f2029;
                                    background-color: #1f2029;
                                    font-size: 15px;
                                    text-transform: uppercase;
                                    color: #fff;
                                    width: 50%;
                                    grid-area: btn2;
                                    border-radius: 5px;" onclick="show('popup2')"> J+2 </button>
                                    <div class="popup" id="popup2">
                                        <h2>${cityData.commune}</h2>
                                        <p>Date de diffusion : ${cityData.bulletins[0]["valeurs"][0]["date_echeance"]}</p>
                                        <p>Les polluants les plus présents ce jour : ${cityData.bulletins[0]["valeurs"][0]["majoritaire"][0]}</p>
                                        <div class="blob" style="background-color:${cityData.bulletins[0]["valeurs"][0]["indice"]["couleur"]}"></div>
                                        <div class="blob-txt" style="color:${cityData.bulletins[0]["valeurs"][0]["indice"]["couleur"]};margin-top: -2em;">${cityData.bulletins[0]["valeurs"][0]["indice"]["qualificatif"]}<a href="#" onclick="hide('popup2')"><br>Ok!</a></div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12" style="display: flex; flex-wrap: wrap; margin: auto;" onclick="barChart('${cityData.insee}')">
                                    <a id="cta" href="#">Voir le graph des polluants</a>
                                    <div id='myDiv'></div>
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12" style="display: flex; flex-wrap: wrap; margin: auto;">
                                    <div class="blob" style="background-color:${cityData.bulletins[0]["valeurs"][2]["indice"]["couleur"]}"></div>
                                    <div class="blob-txt" style="color:${cityData.bulletins[0]["valeurs"][2]["indice"]["couleur"]}">${cityData.bulletins[0]["valeurs"][2]["indice"]["qualificatif"]}</div>
                                </div>
                            </li>
                        `;
                        document.querySelector(".overlay").setAttribute("style", "height:150vh;");
                        console.log(cityData.insee);
                    } else {
                        console.log('0');
                    }
                }
            }
        }
    };

    const onError = (error) => {
        console.log(error);
        if (error.code == 1) {//if user denied to share location
            test.innerText = "L'utilisateur a refusé la demande de géolocalisation.";
        }
        else if (error.code == 2) {//if location is not found
            test.innerText = "Les informations de localisation ne sont pas disponibles.";
        }
        else if (error.code == 3) {//if any other error occurred
            test.innerText = "Quelque chose s'est mal passé.";
        }
        button1.setAttribute("disabled", "true");//if user denied the request for Geolocation, button will be disabled
    };

    button1.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            test.innerText = "Géolocalisation n'est pas supportée sur ce navigateur";
        }
    });
}

window.onload = fetchPollutionData;
