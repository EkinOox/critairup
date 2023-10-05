<?php
error_reporting(E_ALL);
ini_set("display_errors", 0);

$weather = "";
$error = "";

if (time() >= $weatherArray['sys']['sunrise']) {
    echo "<style> .overlay4{background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url('assets/image/Weather.jpg') no-repeat;
        width: 100%;
        height: auto;
        background-size: cover;} </style>";
} elseif (time() <= $weatherArray['sys']['sunset']) {
    echo "<style> .overlay4{background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url('assets/image/night-weather.jpg') no-repeat;
        width: 100%;
        height: auto;
        background-size: cover;} </style>";
}

if (array_key_exists('submit', $_GET)) {
    $error = "Veuillez renseigner une ville.";
    //Verifier la valeur de l'input
    if (!$_GET['city']) {
        $error = "Veuillez renseigner une ville.";
    }
    if ($_GET['city']) {

        $urlContents1 = file_get_contents("http://api.openweathermap.org/data/2.5/weather?q=" . urlencode($_GET['city']) . "&appid=a675559741095104b323b6b19103f7e4&units=metric&lang=fr");
        $weatherArray1 = json_decode($urlContents1, true);
        if ($weatherArray1['cod'] == 200) {
            $lat = $weatherArray1['coord']['lat'];
            $lon = $weatherArray1['coord']['lon'];

            $urlContents = file_get_contents("http://api.openweathermap.org/data/2.5/forecast?lat=" . $lat . "&lon=" . $lon . "&appid=a675559741095104b323b6b19103f7e4&units=metric&lang=fr");
            $weatherArray = json_decode($urlContents, true);
            for ($i = 0; $i < count($weatherArray['list']); $i++) {
                if ($weatherArray['cod'] == 200) {
                    $tempInCelsius = intval($weatherArray['main']['temp'] - 273);
                    $windkmh = intval($weatherArray['list'][$i]['wind']['speed'] * 3, 6);
                    switch ($weatherArray['list'][$i]['weather']['0']['description']) {
                        case $weatherArray['list'][$i]['weather']['0']['description'] == "ciel dégagé":
                            $weatherIcon = "<img src='assets/image/icons8-soleil-64.png' alt=''>";
                            break;
                        case $weatherArray['list'][$i]['weather']['0']['description'] == "brume":
                            $weatherIcon = "<img src='assets/image/icons8-brouillard-de-jour-64.png' alt=''>";
                            break;
                        case $weatherArray['list'][$i]['weather']['0']['description'] == "nuageux":
                            $weatherIcon = "<img src='assets/image/icons8-nuages-64.png' alt=''>";
                            break;
                        case $weatherArray['list'][$i]['weather']['0']['description'] == "couvert":
                            $weatherIcon = "<img src='assets/image/icons8-nuages-64.png' alt=''>";
                            break;
                        case $weatherArray['list'][$i]['weather']['0']['description'] == "peu nuageux":
                            $weatherIcon = "<img src='assets/image/icons8-nuage-64.png' alt=''>";
                            break;
                        case $weatherArray['list'][$i]['weather']['0']['description'] == "légères chutes de neige":
                            $weatherIcon = "<img src='assets/image/icons8-neige-fondue-64.png' alt=''>";
                            break;
                        case $weatherArray['list'][$i]['weather']['0']['description'] == "légère pluie":
                            $weatherIcon = "<img src='assets/image/icons8-pluie-fine-64.png' alt=''>";
                            break;
                        case $weatherArray['list'][$i]['weather']['0']['description'] == "petites averses":
                            $weatherIcon = "<img src='assets/image/icons8-pluie-64.png' alt=''>";
                            break;
                        case $weatherArray['list'][$i]['weather']['0']['description'] == "partiellement nuageux":
                            $weatherIcon = "<img src='assets/image/icons8-nuages-64.png' alt=''>";
                            break;
                        case $weatherArray['list'][$i]['weather']['0']['description'] == "brouillard":
                            $weatherIcon = "<img src='assets/image/icons8-brouillard-de-jour-64.png' alt=''>";
                            break;
                    }
                    switch ($weatherArray['list'][$i]['main']['feels_like']) {
                        case $weatherArray['list'][$i]['main']['feels_like'] >=  "24":
                            $temperatureIcon = "<img src='assets/image/icons8-hot-48.png' alt=''>";
                            break;
                        case $weatherArray['list'][$i]['main']['feels_like'] >=  "14" &&  $weatherArray['list'][$i]['main']['feels_like'] <  "24":
                            $temperatureIcon = "<img src='assets/image/icons8-medium-48.png' alt=''>";
                            break;
                        case $weatherArray['list'][$i]['main']['feels_like'] <  "14":
                            $temperatureIcon = "<img src='assets/image/icons8-cold-48.png' alt=''>";
                            break;
                    }
                    $date = $weatherArray['list'][$i]['dt_txt'];
                    $resultDate = substr($date, 0, 10);
                    $weatherSite = "<h2><b>" . $weatherArray['city']['name'] . ", " . $weatherArray['city']['country'] . "</b></h2>";
                    $weather .= "<div class='boxWeather' style='background-color:#fff;border: 2px solid #fff;border-radius: 10px;'><div><h2><b>" . $resultDate . "</b></h2><br><img src='assets/image/icons8-epingle-de-carte-48.png' alt=''><br></div>" .
                        "<hr><div><div><h3>Température : (min-max) </h3></div><b>" . $weatherArray['list'][$i]['main']['temp_min'] . "&deg;C - " . $weatherArray['list'][$i]['main']['temp_max'] . "&deg;C <br>" . $temperatureIcon . "<br><b>Ressentie : </b>" . $weatherArray['list'][$i]['main']['feels_like'] . "&deg;C <br></b></div>" .
                        "<hr><div><div><h3>Condition météorologique :</h3></div>" . $weatherIcon . "<p>" . $weatherArray['list'][$i]['weather']['0']['description'] . "</p></b></div>" .
                        "<hr><div><div><h3>Vitesse du vent :</h3></div><b> <br> <img src='assets/image/icons8-temps-venteux-64.png' alt=''><br>" . intval($windkmh) . " km/h</b></div></div>";
                    $i += 8;
                } else {
                    $error = "Ville introuvable, veuillez réessayer.";
                }
            }
        }
    } else {

        $error = "Ville introuvable, veuillez réessayer.";
    }
}
?>

<html lang="fr">

<?php
require('header.html')
?>
<!-- Page-->

<body id="page-top" style="background-color: #476a9b  !important;">
    <!-- Contenu-->
    <section id="home" class="home">
        <div class="overlay4">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 ">
                        <div class="main_home_slider">
                            <div class="single_home_slider">
                                <div class="main_home wow fadeInUp">
                                    <center>
                                        <h1>La Méteo de votre ville? <br> rien de plus facile.</h1>
                                        <main>
                                            <div class="container">
                                                <h3 class="my-5 text-center" style="color: #fff;">Voir la météo de chez moi</h3>
                                                <div class="container">
                                                    <form class="row g-3 form-inline justify-content-center" method="get">
                                                        <div class="col-12 col-md-6">
                                                            <input type="text" class="form-control" name="city" id="city" placeholder="Nom de la ville...">
                                                        </div>
                                                        <div class="col-6 col-md-2">
                                                            <button type="submit" name="submit" class="btn btn-primary mb-3">Rechercher</button>
                                                        </div>

                                                        <div class="col-12" id="weather"><?php
                                                                                            if ($weather) {
                                                                                                echo '<div style="background-color:#fff; color: #000;border-radius: 10px;margin-top:10px;" role="alert">' . $weatherSite . '</div>';
                                                                                                echo '<div style="color: #000;border-radius: 10px;margin-top:10px;" role="alert">' . $weather . '</div>';
                                                                                            } else if ($error) {
                                                                                                echo '<div class="alert alert-danger" style="border-radius: 10px;" role="alert">' . $error . '</div>';
                                                                                            } ?>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </main>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <?php
    require('bottom_menu.html');
    ?>
</body>
<?php
require('footer.html');
?>

</html>