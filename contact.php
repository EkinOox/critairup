<!DOCTYPE html>
<html lang="fr">

<?php
require('header.html');
?>

<body>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-12 text-center align-self-center py-5" style="margin-bottom: 40px;">
                    <div class="section pb-5 pt-5 pt-sm-2 text-center">
                        <div class="card-3d-wrap mx-auto">
                            <div class="card-3d-wrapper">
                                <div class="card-front">
                                    <div class="center-wrap">
                                        <div class="section text-center">
                                            <h5 class="mb-4 pb-3 mt-2">NOUS CONTACTER</h5>
                                            <form action="contact.php" method="post">
                                                <div class="form-group">
                                                    <input type="email" name="logemail" class="form-style" placeholder="VOTRE EMAIL..." id="logemail" autocomplete="off" required>
                                                </div>
                                                <div class="form-group mt-2">
                                                    <input type="text" name="logname" class="form-style" placeholder="VOTRE NOM..." id="logname" autocomplete="off" required>
                                                </div>
                                                <div class="form-group mt-2">
                                                    <input type="text" name="subjectform" class="form-style" placeholder="LE SUJET..." id="subjectform" autocomplete="off" required>
                                                </div>
                                                <div class="form-group mt-2">
                                                    <input type="textarea" name="comment" class="form-style" placeholder="VOTRE DEMANDE..." id="comment" autocomplete="off" style="height:180px" required>
                                                </div>
                                                <button type="submit" class="btnSubmit ">ENVOYER</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <?php
            if (empty($_POST) === false) {
                $email = $_POST['logemail']; // this is the email address of the person filling the contact form
                $name = $_POST['logname']; // name of the sender
                $whom = "kyllian.diochon.kd@gmail.com"; // email address where the contact form data will be sent
                $subject = $_POST['subjectform'];

                $comment = "De la part de : " . $email . " " . "\n\n" . "Le sujet est : " . $subject . "\n\n" . $_POST['comment'];

                mail($whom, $subject, $comment); // this is the email function

                echo "<center>Mail envoyé. Merci " . $name . ", nous allons vous re-contactez bientôt.</center>";
            }
            ?>
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