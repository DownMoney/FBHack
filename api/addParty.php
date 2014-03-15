<?php
mysql_connect("partytunes.cvrr5gwrtlp5.us-west-2.rds.amazonaws.com", "mainsa", "lamepass") or die(mysql_error());

mysql_select_db("partytunes") or die(mysql_error());


mysql_query("INSERT INTO Party(Name, FBID) VALUES ('".$_POST['Name']."', '".$_POST['FBID']."');") or die(mysql_error());  
$id = mysql_insert_id();
echo '{"PID":'.$id.'}';
?>