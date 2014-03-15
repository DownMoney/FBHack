var Music = {};

function getAuthToken(){
	//replace with generated one!!!!
	return "CAACEdEose0cBAIh9I9OzvMcdiP0xeTHcfZAN2o7UT8q2JIv0uowegGxPwgk9k0JVTsxZCY3ZAy9nbvb0dFoPwZCBXgR1PtAnKO4NfQxCEJapMU4ZA5tZAkgrwa9Q2XWHXf3s43lC7J1G9wz0xEd21XlgKHhuT6KWjnf7IHxZB1ZBcX6S5ZBad1u0GSZBszZCRO41P0ZD";  
}

function getEvents(){
	$.get("https://graph.facebook.com/me/events/attending?access_token="+getAuthToken(), function(data) {
		console.log(data['data']);

		for(var i = 0; i < data['data'].length; i++)
		{
			getEvent(data['data'][i], function(data, info){
				$('#events').html($('#events').html() + "<img src='https://graph.facebook.com/"+info['owner']['id']+"/picture'><a href='#'>"+data['name']+"</a> ("+info['owner']['name']+") <button onclick='showEvent("+data['id']+")'>Show</button><button onclick='createPlaylist("+data['id']+")'>Generate</button><br> <div id='"+data['id']+"likes'></div> ");
			});	
		}
	});	
}

function getEvent(_event, fn){
	$.getJSON("https://graph.facebook.com/"+_event['id']+"?access_token="+getAuthToken(), function(eventData) { 
		fn(_event, eventData);
	});	
}

function getPeople(eid, fn){
	$.getJSON("https://graph.facebook.com/"+eid+"/invited?access_token="+getAuthToken(), function(people) {
		for(var i = 0; i < people['data'].length; i++)
		{
			Music[eid] = [];
			getMusic(eid, "https://graph.facebook.com/"+people['data'][i]['id']+"/music", i, function(j){
				if (people['data'].length-1==j)
					fn();
			});
		}
	});	
}

function getMusic(eid, link, j, fn){
	$.getJSON(link+"?access_token="+getAuthToken(), function(likes) {
		var temp = [];

		for(var i = 0; i < likes['data'].length; i++)
		{
			temp.push(likes['data'][i]['name']);
		}

		Music[eid] = Music[eid].concat(temp);

		if(likes['paging'] && likes['paging']['next'])
		{
			getMusic(eid, likes['paging']['next'], j,fn);
		}
		else
		{
			fn(j);
		}

	});	
}

function showEvent(eid){

}

function createPlaylist(eid){
	getPeople(eid, function(){rank(eid);});	
}

function rank(eid)
{
	MAX = 30;
	console.log("RANK!");
	var rank = unify(Music[eid]);
	var keys = Object.keys(rank);
	var newrank = [];

	for(var n = 0; n < keys.length; n++)
	{
		newrank.push([keys[n], rank[keys[n]]]);
	}

	newrank = newrank.sort(function(a,b) {
		if(a[1] < b[1])
		{
			return 1;
		} else if(a[1] > b[1])
		{
			return -1;
		}
		return 0;
	});
	
	var items = [];
	
	for(var i = 0; i < newrank.length && i<MAX; i++)
	{
		//get yt ids!!
		searchRdio(newrank[i][0], 2);
		//items.push("<b>"+newrank[i][0]+"</b> ("+newrank[i][1] + ")<br>");
	}
	
	//$('#'+eid+'likes').html(items.join(''));
}

function unify(music){
	var temp = [];

	for(var i = 0; i < music.length; i++)
	{
		if(music[i] in temp)
		{
			temp[music[i]]++;
		}
		else
		{
			temp[music[i]] = 1;
		}
	}

	return temp;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////// YOUTUBE YOUTUBE YOUTUBE ///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var player;
var ids = [];
var playID = 0;
function getYoutubeVideo(name){
	ids = [];
	playID = 0;
	url = 'https://www.googleapis.com/youtube/v3/search?videoSyndicated=true&videoEmbeddable=true&part=snippet&order=viewCount&q='+encodeURIComponent(name)+'&type=video&safeSearch=none&key=AIzaSyCsHxnjIW3dFbEh7eJQrLF--Qv1mqy4n58'

 	$.getJSON(url, function(data){
	    console.log(data);
	    //var pics = {};
	    $.each(data['items'], function(key, val){
	      ids.push(val['id']['videoId']);
	      //pics[val['id']['videoId']] = {id:val['id']['videoId'], img:val['snippet']['thumbnails']['high']['url'], width: 200, height:200, th:{id:val['id']['videoId'], src:val['snippet']['thumbnails']['high']['url'], width: 200, height:200,zoom_src:val['snippet']['thumbnails']['high']['url'],zoom_factor:1.5}};
    	});

    	//PhotoWall.load(pics);
	    embed = '<iframe id="ytplayer" width="0" height="0" src="//www.youtube.com/embed/'+data['items'][0]['id']['videoId']+'?autoplay=1&enablejsapi=1&version=3&playerapiid=ytplayer" frameborder="0" allowfullscreen></iframe>';
	    $('#player').html(embed);
	    //embed = '<object width="560" height="315"><param name="movie" value="//www.youtube.com/v/'+data['items'][2]['id']['videoId']+'?autoplay=1&enablejsapi=1&version=3&playerapiid=player1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="//www.youtube.com/v/'+data['items'][2]['id']['videoId']+'?autoplay=1&enablejsapi=1&version=3&playerapiid=player1" type="application/x-shockwave-flash" width="560" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object>';

        player = new YT.Player('ytplayer', {
          height: '0',
          width: '0',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
          }
        });
  });
}

function onPlayerReady(event){
	event.target.mute();
	event.target.playVideo();
}

function onPlayerStateChange(event){
	//Write below to DB!!
	console.log(event.target.getVideoData()['video_id']);
}

function onPlayerError(event){
  playID++;
  event.target.clearVideo();
  event.target.loadVideoById(ids[playID]);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// SPOTIFY SPOTIFY SPOTIFY ///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Songs = {};

function searchArtist(artist, n){
	console.log(artist);
	$.getJSON("https://ws.spotify.com/search/1/artist.json?q="+artist, function(data){
		console.log(data);
		href = data['artists'][0]['href'];
		getAlbum(href, n, artist);
	});
}

function getAlbum(href, n, a){
	$.getJSON("http://ws.spotify.com/lookup/1/.json?uri="+href+"&extras=album", function(data){
		for (var i =0; i<data['artist']['albums'].length ; i++) {
			track = data['artist']['albums'][i]['album']['href'];
			getTracks(track, n, a);
		};
	});
}

function getTracks(href, n, a){
	$.getJSON("http://ws.spotify.com/lookup/1/.json?uri="+href+"&extras=track", function(data){
		for (var i =0; i<data['artist']['albums'].length || i<n; i++) {
			track = data['album']['tracks'][i]['href'];
			name = data['album']['tracks'][i]['name'];
			Songs[a] = {name: name, href: track};
			console.log(Songs);
		};
	});
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// RDIO RDIO RDIO RDIO ////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Playlist = [];

function searchRdio(q, n){
	
   $.getJSON("http://localhost:3000/search/"+q, function(data){
   	pics = {};
     if(data['status'] == "ok")
     {
     	for (var i = 0; i<data['result']['results'].length && i<n; i++) {
     		key = data['result']['results'][i]['key'];
     		pic = data['result']['results'][i]['icon400'];
     		/*name = data['result']['results'][i]['name'];
     		artist = data['result']['results'][i]['albumArtist'];
     		album = data['result']['results'][i]['album'];
     		temp = {key: key, pic:pic, name:name, artist:artist, album:album};*/
     		Playlist.push(key);

     		pics[key] = {id:key, img:pic, width: 200, height:200, th:{id:key, src:pic, width: 200, height:200,zoom_src:pic,zoom_factor:1.5}};
     		console.log(pics);
     		PhotoWall.load(pics);
     	};
     }
     else
     	console.log(data);
  });
}

