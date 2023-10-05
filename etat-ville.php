<!DOCTYPE html>
<html lang="fr">
<?php
require('header.html');
?>

<body id="spe_height">
    <section id="home" class="home">
        <div class="col-12">
            <div class="container-fluid">
                <video autoload autoPlay crossOrigin="anonymous" loop muted preload="auto" src="assets/video/anim2.mp4" style="margin-top: -80px; width: 101%;margin-left: -5px;" />
            </div>
        </div>
    </section>
    <section>
        <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12 col-sm-12">
                        <div class="main_home_slider">
                            <div class="single_home_slider">
                                <div class="main_home wow fadeInUp col-lg-12 col-md-12 col-sm-12">
                                    <div class="ville-container">
                                        <h1 style="width: 100% !important">Vos villes situées dans le Var</h1>
                                        <div id="searchWrapper">
                                            <input type="text" name="searchBar" id="searchBar" placeholder="rechercher votre ville" /><i class="fa-solid fa-magnifying-glass" style="position: absolute;color: black;margin-top: 0.5em;margin-left: -2em;"></i>
                                        </div>
                                        <ul id="CityList">
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style>
                    ol,
                    ul {
                        padding-left: 0px !important;
                    }

                    .character {
                        margin-bottom: 3px;
                    }
                </style>
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