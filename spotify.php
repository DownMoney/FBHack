<?php
	$track_name = preg_replace("/ /","+",$_GET[track_name]);
	$json = file_get_contents('https://ws.spotify.com/search/1/track.json?q='.$track_name);
	echo $json;
?>