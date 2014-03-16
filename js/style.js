$("window").ready(function () {
	var temp = ($(this).innerHeight()-200)/2;
	$('#qrcode').css("margin-top", temp);
	//$('buyAmazonImg').css("width", $('#m_artistPicture').width());
});

$(".playlistHeader").click(function (){
	$('.playlistDropdown').toggle('blind',100);
});


$("#qrcode").mouseover(function  () {
<<<<<<< HEAD
	console.log('sdds');
	$("#qrcode").animate({left:"12%"},500);
=======
	$("#qrcode").animate({left:"0px"},500);
>>>>>>> 405f2310860c17399c2b727dbcd74de8b3fe42e9
});

$("#qrcode").mouseleave(function  () {
	$("#qrcode").animate({left:"-450px"},500);
});