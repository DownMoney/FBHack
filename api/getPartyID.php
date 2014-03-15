<?php
mysql_connect("partytunes.cvrr5gwrtlp5.us-west-2.rds.amazonaws.com", "mainsa", "lamepass") or die(mysql_error());

mysql_select_db("partytunes") or die(mysql_error());


mysql_query("SELECT * FROM Party WHERE FBID=".$_GET['FBID']) or die(mysql_error());  
?>