<!DOCTYPE html>
<html lang="fr">
<?php
require('header.html');
?>

<body>
    <section id="home" class="home">
        <div class="overlay col-lg-12 col-sm-12">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-sm-12">
                        <div class="main_home_slider">
                            <div class="single_home_slider">
                                <div class="main_home wow fadeInUp col-lg-12 col-md-12 col-sm-12">
                                    <center>
                                        <h1>Vos Crit'airs, <br> Notre préoccupation</h1>
                                        <div class="home_btn search">
                                            <a href="etat-ville.php"><button class="btn" id="btnAnimation" style="margin-left: 10px !important;height: 57px; width:200px;">Recherchez sur <br>une ville </button></a><br>
                                            <button class="btn" id="buttongeolocalisation" style="margin-left: 10px !important;height: 57px;width:200px;">Me <br> Géolocaliser</button>
                                            <div class="col-lg-12 col-md-12 col-sm-6" id="test"></div>
                                        </div>
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