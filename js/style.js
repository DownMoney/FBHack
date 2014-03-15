var playlistDroppedDown = true;

$(window).ready(function(){
	setSizeOfColumns();
});

$(window).resize(function(){
	setSizeOfColumns();
});




function setSizeOfColumns() {
	if(parseInt($(window).width()) > 992 ){
		$(".column").css('height', $(".jumbotron").height());
		$(".container").css('height',"70%");
		playlistDropdown();
	} else {
		$(".column").css('height',"300px");
		$(".container").css('height',"1000px");
		playlistGetUp();
	}
}

function playlistDropdown0() {
	if (!playlistDroppedDown) {
		playlistDropdown();

	} else {
		playlistGetUp();
	}
}

function playlistDropdown() {
	$(".playlistDropdown").css("visibility","visible");
	setTimeout(function(){$(".playlistDropdown").animate("height",$(".jumbotron").height());},100);
	playlistDroppedDown = true;
}

function playlistGetUp() {
	$(".playlistDropdown").animate("height","0px");

	setTimeout(function(){$(".playlistDropdown").css("visibility","hidden");},100);
	playlistDroppedDown = false;
}