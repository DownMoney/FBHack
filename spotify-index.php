<html>

<head>

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

	<!-- Optional theme -->
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css">




</head>

<body onload="refreshlinks();">

	<form id="searchTrack" method="GET" action="">
		<label for="track">Track name:</label>
		<input id="track" name="track" onblur="refreshlinks();">
	</form>
	<div  >
		<iframe id="spotifaj" src="https://embed.spotify.com/?uri=spotify:track:4bz7uB4edifWKJXSDxwHcs" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
	</div>
	<div id="track-list">

	</div>







	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script>
		function refreshlinks() {

			track_name = "<?php echo $_GET[track]; ?>".replace(' ', '+').toLowerCase();

			t = ('spotify.php?track_name='+track_name);
			$.get(t,function(data){
				$("#track-list").html("");
				json = JSON.parse(data);
				console.log(json);
				$.each(json['tracks'],function(key,val) {
					console.log(val['artists'][0]['name']);
					$("#track-list").append('<a href="#" onclick="playSong(\''+val['href']+'\');">'+val['artists'][0]['name']+'</a></br>');
				});
			});
		};

		function playSong( uri ) {
			 $('#spotifaj').attr('src', "https://embed.spotify.com/?uri="+uri);
		};
	</script>

		<!-- Latest compiled and minified JavaScript -->
	<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
</body>


</html>