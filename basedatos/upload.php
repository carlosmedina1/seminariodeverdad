<?php
    move_uploaded_file($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name']);
?>