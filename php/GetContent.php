<?php
$url = $_GET['url'];

if (!isset($url)) {
      die(); // Don't do anything if we don't have a URL to work with
}
$url = urldecode($url);
$url = 'http://' . str_replace('http://', '', $url); // Avoid accessing the file system

try {
	error_reporting(E_ALL ^ E_WARNING);
	//echo file_get_contents($url); // You should probably use cURL. The concept is the same though
	$ch = curl_init();
	// Disable SSL verification
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	// Will return the response, if false it print the response
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	// Set the url
	curl_setopt($ch, CURLOPT_URL,$url);
	// Execute
	$result=curl_exec($ch);
	// Closing
	curl_close($ch);
	echo $result;

} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}