$(window).ready(function(){
	setSizeOfColumns();
});

$(window).resize(function(){
	setSizeOfColumns();
});


function setSizeOfColumns() {
	if(parseInt($(window).width()) > 992 ){
		$(".column").css('height', $(".jumbotron").height());
	} else {
		$(".column").css('height',"300px");
	}
}