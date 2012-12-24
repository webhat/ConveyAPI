<?php

$api_key = "ad0f688630d3f52234f9996da9e77748";
$sub_req_url = "http://beta.conveyapi.com/analysis-engine/process";

$ch = curl_init();
$encoded = 'api_key='. $api_key .'&';
// include GET as well as POST variables; your needs may vary.
foreach($_GET as $name => $value) {
	  $encoded .= urlencode($name).'='.urlencode($value).'&';
}
foreach($_POST as $name => $value) {
	  $encoded .= urlencode($name).'='.urlencode($value).'&';
}

// chop off last ampersand
$encoded = substr($encoded, 0, strlen($encoded)-1);
//echo "updateConvey(";
curl_setopt($ch, CURLOPT_URL, $sub_req_url ."?" . $encoded); 
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_GET, 1);
curl_exec($ch);
curl_close($ch);

//echo "\b)";

?>
