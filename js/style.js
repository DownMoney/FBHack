
//$('#volumeDropdown').toggle('blind',1);

$(window).ready(function(){
	setSizeOfColumns();
	alert
	var height = $('.btn-group').width()+$("#progressBar").width()+30;
	$("#artistPicture").css("height",height + "px"	);
	$("#artistPicture").css("width",height + "px");
});

$(window).resize(function(){
	setSizeOfColumns();
});


function setSizeOfColumns() {
	if(parseInt($(window).width()) > 992 ){
		
		var temp = $(".container").height() - 100;
		$(".column").css('height', temp + "px");
		$(".container").css('height',"70%");
		$(".playlistDropdown").css("max-height",( $(".column").height() - 80 )+ "px");
	} else {
		$(".column").css('height',"300px");
		$(".container").css('height',"1000px");
		$(".playlistDropdown").css("max-height",( $(".column").height() - 80 )+ "px");
	}
}

$(".playlistHeader").click(function (){
	$('.playlistDropdown').toggle('blind',100);
});

/*$("#volume").click(function(){
	$('#volumeDropdown').toggle('blind',100);
});*/