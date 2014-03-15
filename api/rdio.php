<?php

$url = 'http://api.rdio.com/1/';
$myvars = 'query=' . $_GET['q'] . '&method=search&types=Track&__rdio_console_secret=281e40fa215126ee1ffd0cf9d727053';
echo $url;
$ch = curl_init( $url );
curl_setopt( $ch, CURLOPT_POST, 1);
curl_setopt( $ch, CURLOPT_POSTFIELDS, $myvars);
curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt( $ch, CURLOPT_HEADER, 0);
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);

$response = curl_exec( $ch );

echo $response;

?>