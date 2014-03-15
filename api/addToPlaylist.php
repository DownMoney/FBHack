<?php
mysql_connect("partytunes.cvrr5gwrtlp5.us-west-2.rds.amazonaws.com", "mainsa", "lamepass") or die(mysql_error());

mysql_select_db("partytunes") or die(mysql_error());


mysql_query("INSERT INTO Playlist(Name, YTID, PID) VALUES ('".$_POST['Name']."', '".$_POST['YTID']."', ".$_POST['PID'].");") or die(mysql_error());  
?>