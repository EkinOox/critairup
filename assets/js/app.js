const CityList = document.getElementById('CityList');
const searchBar = document.getElementById('searchBar');
let hpCity = [];
let dt = new Date();
let year = dt.getUTCFullYear();
let month = String(dt.getMonth() + 1).padStart(2, '0');
let day = String(dt.getDate() - 1).padStart(2, '0');
let yesterday = `${year}-${month}-${day}`;

function barChart(codeInsee) {
    const selectedCity = hpCity.find((City) => {
        return City.insee === codeInsee;
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

const loadCity = async () => {
    try {
        const res = await fetch("https://api.atmosud.org/iqa2021/commune/bulletin/journalier?format_indice=couleur,qualificatif,valeur&indice=all&format=json&srid=2154&date_diff_min=" + yesterday);
        hpCity = await res.json();

        // Maintenant que hpCity est rempli, vous pouvez effectuer le filtrage et l'affichage
        searchBar.addEventListener('keyup', (e) => {
            const searchString = e.target.value.toLowerCase();

            const filteredCity = hpCity.filter((City) => {
                
                return (
                    City.commune.toLowerCase().includes(searchString)
                );
            });
            displayCity(filteredCity);
        });

    } catch (err) {
        console.error(err);
    }
};

var displayCity = (City) => {
    var htmlString = City
        .map((cityItem) => {
            return `
                <li class="character" style="margin-bottom:200px;">
                <div class="col-lg-4 col-md-12 col-sm-12" style="text-align: center; margin: auto;">
                    <h2>${cityItem.commune}</h2>
                    <p style="color: #0000006e;"><strong>${cityItem.insee}</strong></br>
                    Date de diffusion : ${cityItem.bulletins[0]["valeurs"][2]["date_echeance"]}</br>
                    Les polluants les plus présent aujourd'hui : ${cityItem.bulletins[0]["valeurs"][2]["majoritaire"][0]}</p>                    

                    <button style="margin-bottom: 5%;
                    border: 2px solid #1f2029;
                    background-color: #1f2029;
                    font-size: 15px;
                    text-transform: uppercase;
                    color: #fff;
                    width: 50%;
                    border-radius: 5px;" onclick="show('popup1')"> J+1 </button>
                    <div class="popup" id="popup1">
                        <h2>${cityItem.commune}</h2>
                            <p>Date de diffusion : ${cityItem.bulletins[0]["valeurs"][1]["date_echeance"]}</p>
                            <p>Les polluants les plus présent ce jour : ${cityItem.bulletins[0]["valeurs"][1]["majoritaire"][0]}</p>
                            <div class="blob" style="background-color:${cityItem.bulletins[0]["valeurs"][1]["indice"]["couleur"]}"></div>
                        <div class="blob-txt" style="color:${cityItem.bulletins[0]["valeurs"][1]["indice"]["couleur"]};margin-top: -2em;">${cityItem.bulletins[0]["valeurs"][1]["indice"]["qualificatif"]}<a href="#" onclick="hide('popup1')"><br>Ok!</a></div>
                    </div>
                    <br>
                    <button style="margin-bottom: 5%;
                    border: 2px solid #1f2029;
                    background-color: #1f2029;
                    font-size: 15px;
                    text-transform: uppercase;
                    color: #fff;
                    width: 50%;
                    border-radius: 5px;" onclick="show('popup2')"> J+2 </button>
                    <div class="popup" id="popup2">
                        <h2>${cityItem.commune}</h2>
                        <p>Date de diffusion : ${cityItem.bulletins[0]["valeurs"][0]["date_echeance"]}</p>
                        <p>Les polluants les plus présent ce jour : ${cityItem.bulletins[0]["valeurs"][0]["majoritaire"][0]}</p>
                        <div class="blob" style="background-color:${cityItem.bulletins[0]["valeurs"][0]["indice"]["couleur"]}"></div>
                        <div class="blob-txt" style="color:${cityItem.bulletins[0]["valeurs"][0]["indice"]["couleur"]};margin-top: -2em;">${cityItem.bulletins[0]["valeurs"][0]["indice"]["qualificatif"]}<a href="#" onclick="hide('popup2')"><br>Ok!</a></div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12" style="display: flex; flex-wrap: wrap; margin: auto;">
                    <a id="cta" href="#" onclick="barChart('${cityItem.insee}')">Voir le graph des polluants</a>
                    <div id='myDiv'></div>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12" style="display: flex; flex-wrap: wrap; margin: auto;">
                    <div class="blob" style="background-color:${cityItem.bulletins[0]["valeurs"][2]["indice"]["couleur"]}"></div>
                    <div class="blob-txt" style="color:${cityItem.bulletins[0]["valeurs"][2]["indice"]["couleur"]}">${cityItem.bulletins[0]["valeurs"][2]["indice"]["qualificatif"]}</div>
                </div>
                
                </li>
            `;
        })
        .join('');
    CityList.innerHTML = htmlString;
};

loadCity();
//fin fonction rechercher